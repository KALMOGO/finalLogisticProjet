import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AcceuilMissionList, IMission } from '../Imission';
import { IchauffeursVehicule, Iclients, Idepenses, Iproduits, Itrajets } from './iprogrammer';
import { ProgrammerService } from './programmer.service';

@Component({
  selector: 'app-programmer',
  templateUrl: './programmer.component.html',
  styleUrls: ['./programmer.component.css']
})

export class ProgrammerComponent implements OnInit {
  sub!:Subscription

  @Output()
  back_to_list_mission:EventEmitter<string> = new EventEmitter();

  // recuperation de la mission a voir le detail
  exercice_id!:number;
  constructor(
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private programmerService:ProgrammerService,
    private snackBar : MatSnackBar
    ) {

    }

    formMission = this.fb.group({

      infoMission:this.fb.group({
        date_mission:['', {validators:[Validators.required]}],
        motif:['', {validators:[Validators.required]}],
        chauffeur:['', {validators:[Validators.required]}],
        trajet_concerne:['', {validators:[Validators.required]}],
        choix_mode_evaluation:['',
            //{validators:[Validators.required]}
            // boolean si false: recette Sans Pesage
            // boolean si true: recette avec Pesage
        ]
      }),

      infoPoids:this.fb.group({
        premier_poids:[''],
        deuxieme_poids:[''],
      }),

      liste_depenses:this.fb.array([]),
      liste_produits:this.fb.array([]),
    })

    listeChauffeurs :IchauffeursVehicule [] = [];
    motifs_mission:any[]=['Approvissionnement', 'Livraision'];
    listeTrajets:Itrajets[]=[];
    listeClients:Iclients[]=[];
    listesProduits:Iproduits[] = [];
    listesDepenses:Idepenses[] = [];
    panelOpenState: boolean = false;

  ngOnInit(): void {
    this.exercice_id = this.exercice_parent();
    this.getListesChauffeurVehicules();
    this.getListeIntituleTrajets();
    this.getListeIntituleProduits();
    this.getListeIntituleDepenses();
    this.getListeClients();


  }

  exercice_parent():number{
    // methode permettant de retourner l'exercice parent d'une mission
    let queryParam:any;

       this.route.queryParamMap  //Recuperation des parametres state d'url : ActivatedRoute
      .subscribe((params) => {
         queryParam = {...params }; // operateur de diffussion

       });
       return queryParam.params.exercice
  }

  /**
   * Opening snacbar method
   */

  openSnackbar(message:string='operation reussie !!!',action:string){
    this.snackBar.open(message,action,{
      verticalPosition:'top',
      horizontalPosition:'end',
      duration:6000
    });
  }

/* generation automatique des champs de saisie*/

    //Pour depenses
  depenseSelectionnes = new FormControl(''); // controle de recuperation des depenses

  // nombre de depenses selectionner
  get nombreDepenses():any{
    const depenseSelection:any= this.depenseSelectionnes.value
    if(depenseSelection?.length!=0){
      return depenseSelection?.length
    }
    return 0
  }

  onSelectionDepenseTeminer(){
    this.AjouterDepenseField();
   // pour desactiver le champs intitule de la depense selectionne
   const fg = this.formMission.get('liste_depenses') as FormArray // recuperation du tabl formarray de depenses

   //   Probleme ?? resourdre
   fg.controls.forEach(control=>{ // parcours de chaque formGroup
         control.get('intitule')?.disable() // recuperation du champs nom et desactivation
         // ajout de quelques validateurs
         control.get('montant')?.setValidators(Validators.required)
   });

   }

  get depensesFieldAsFormArray():any{
    //methode d'obtention au champs dans le form comme un FormArray
    return this.formMission.get('liste_depenses') as FormArray
  }

  depenseControleur(intitule:string,id:number ,quantite:number):any{
    // creation du nouveau controleur ?? ajouter automatiquement dans le FormArray
    return this.fb.group({
      intitule:this.fb.control(intitule), // utiiser pour l'affichage
      depense:this.fb.control(intitule),
      intitule_depense : [id, {validators:[Validators.required]}], // utiiser pour le sauvegard
      montant: [quantite, {validators:[Validators.required]}],
    })}

  AjouterDepenseField():void{
    // ajout du champ au formulaire
    const depensesSelectionne:any= this.depenseSelectionnes.value
    if(depensesSelectionne?.length!=0){
      depensesSelectionne.forEach((element:any) => {
        const depense_to_be_add = this.listesDepenses.find(dep=>dep.id==element) // recuperation du nom

        this.depensesFieldAsFormArray.push(this.depenseControleur(depense_to_be_add?.intitule || ' ',element,0));
        this.depenseSelectionnes.reset()
        });

        this.depenseSelectionnes = new FormControl()
    }


  }

  supprimerDepenseField(i:number):void{
    // suppression du champs du fromulaire
    this.depensesFieldAsFormArray.removeAt(i)
  }

  //Pour Produit

  produitSelectionnes = new FormControl(''); //

  // ecouter apres chaque selection de produit
  onSelectionTeminer(){
   this.AjouterProduitField();

   // pour desactiver le champs nom du produit selectionne
   const fg = this.formMission.get('liste_produits') as FormArray // recuperation du tabl formarray de produit

   // Probleme ?? resoudre
    fg.controls.forEach(control=>{ // parcours de chaque formGroup
          control.get('nom')?.disable() // recuperation du champs nom et desactivation
          // ajout de quelque validateurs
          control.get('quantite')?.setValidators(Validators.required)
          control.get('cout_unitaire')?.setValidators(Validators.required)
          control.get('client')?.setValidators(Validators.required)
    })
  }

  get produitsFieldAsFormArray():any{
    //methode d'obtention au champs dans le form comme un FormArray
    return this.formMission.get('liste_produits') as FormArray
  }

  produitsControleur(nom:string, id:number,quantite:number, cout_unitaire:number):any{
    // creation du nouveau controleur ?? ajouter automatiquement dans le FormArray

    return this.fb.group({
      produit:this.fb.control(id),
      nom : this.fb.control(nom),
      qte_produit:[quantite, [Validators.required]],
      cout_unitaire:[cout_unitaire, [Validators.required]],
      client_concerne:['', [Validators.required]]
    })
  }

  get nombreProduit():any{
    const produitSelectionne:any= this.produitSelectionnes.value
    if(produitSelectionne?.length!=0){
      return produitSelectionne?.length
    }
    return 0
  }

  AjouterProduitField():void{
    // ajout du champ au formulaire
    const produitSelectionne:any= this.produitSelectionnes.value

    if(produitSelectionne?.length!=0){
      produitSelectionne.forEach((element:any) => { // chaque element est un id
        const prod_to_be_add = this.listesProduits.find(prod=>prod.id==element) // ajout du nom du produit
        this.produitsFieldAsFormArray.push(this.produitsControleur(prod_to_be_add?.nom || ' ',element,0, 0));
        this.produitSelectionnes.reset()
        });
    }
  }

supprimerProduitField(i:number):void{
  // suppression du champs du fromulaire
  this.produitsFieldAsFormArray.removeAt(i)
}

// section evaluation des recettes
choix_mode_evaluation:boolean = false // boolean d'ecoute du mode choisie

// ecoute du type de recette ?? enregistrer
change_mode_evaluation(){
  const choix:any = this.formMission.get('infoMission')?.get('choix_mode_evaluation')?.value
  this.choix_mode_evaluation = choix;

  // ajout de validateurs lors de l'enregistrement des pesees
  if(choix == true){
    this.formMission.get('infoPoids')?.get('premier_poids')?.setValidators(Validators.required)
    this.formMission.get('infoPoids')?.get('deuxieme_poids')?.setValidators(Validators.required)
  }
  else{
    this.formMission.get('infoPoids')?.get('premier_poids')?.clearValidators();
    this.formMission.get('infoPoids')?.get('deuxieme_poids')?.clearValidators();
    this.formMission.get('infoPoids')?.reset();
  }

  /*
    this.choix_mode_evaluation = this.formMission.get('infoMission')?.get('choix_mode_evaluation')?.value
      error: pas d'affection de undefine a un boolean
    */
  }

/* inter-action avec la bd*/

// SECTION GET : trajet, chauffeur, produit , depense, client
                // trajet = {id, ville_depart, ville_arrivee, intitule }
                // chauffeur = { idvehicule, nom, prenom }
                // produit = { id, nom, unite }
                // depense = { id, intitule }
                // client = { id, nom, prenom  }

getListeIntituleTrajets():void{
        this.programmerService.getListeIntituleTrajets()
        .subscribe(
          (data:Itrajets[])=>{
            this.listeTrajets = data;
          },
          error=>{
            console.log(error)
          },
          ()=>{
          }
        )
    }
getListeIntituleProduits():void{
        this.programmerService.getListeIntituleProduits()
        .subscribe(
          (data:Iproduits[])=>{
            this.listesProduits = data;
          },
          error=>{
            console.log(error)
          },
          ()=>{
             //implementation de l'anatomicite : transaction
          }
        )
    }

getListesChauffeurVehicules():void{
      this.programmerService.getListesChauffeurVehicules()
      .subscribe(
        (data:IchauffeursVehicule[])=>{
          this.listeChauffeurs= data;
        },
        error=>{
          console.log(error)
        },
        ()=>{
          //implementation de l'anatomicite : transaction
        }
      )
    }

    getListeIntituleDepenses():void{
        this.programmerService.getListeIntituleDepenses()
        .subscribe(
          (data:Idepenses[])=>{
            this.listesDepenses= data;
          },
          error=>{
            console.log(error)
          },
          ()=>{
             //implementation de l'anatomicite : transaction
          }
          )
    }

    getListeClients():void{
      this.programmerService.getListeClients()
        .subscribe(
          (data:Iclients[])=>{
            this.listeClients= data;
          },
          error=>{
            console.log(error)
          },
          ()=>{}
          )
    }

  // SECTION POST MISSION

    get isMissionFormulaireValide():boolean{
      return this.formMission.valid;
    }

    is_mission_save:boolean=false; // faire tourner le disq
    saveMission(){

      // construction de l'objet ?? envoyer
      const mission_instance:any = {
        exercice_conerne:Number(this.exercice_id),
        vehicule_concerne:Number(this.formMission.get('infoMission')?.get('chauffeur')?.value) ,
        trajet_concerne:Number(this.formMission.get('infoMission')?.get('trajet_concerne')?.value),
        date_mission:moment(String(this.formMission.get('infoMission')?.value.date_mission)).format('YYYY-MM-DD'),
        motif:this.formMission.get('infoMission')?.get('motif')?.value,
      }

        // pour le momen
        if(this.isMissionFormulaireValide){
          let id_mission_save!:number;
          this.is_mission_save = true; // faire tourner le disque

          this.programmerService.saveMission(mission_instance).subscribe(
            (value)=>{
              id_mission_save = value.id || 0
            },
            (error:any)=>{
              console.log(error);
              this.openSnackbar("programmation d'une mission","echec");
            },
            ()=>{
              if(id_mission_save!=0){
                this.saveInfosProduit(id_mission_save);
                this.saveInfosDepenses(id_mission_save);
              }
            },
          )
        }
        else{
          this.openSnackbar(" Donnees invalid","!!!!");
        }
    }

        // a terminer
    saveInfosProduit(id:number){

      const listesProduits:any[] = this.formMission.get('liste_produits')?.value || []
      listesProduits.forEach(produit=>{produit.mission = id; produit.exercice= this.exercice_parent()})
      this.programmerService.saveListeProduits(listesProduits).subscribe(
        (data)=>{
          console.log(data)
        },
        (error)=>{
          console.log(error)
        },
        ()=>{},
      )
    }

    saveInfosDepenses(id:number){
      const listesDepenses:any[] = this.formMission.get('liste_depenses')?.value || []
      listesDepenses.forEach(depense=>{depense.mission = id; depense.exercice= this.exercice_parent()})
      this.programmerService.saveListeDepenses(listesDepenses).subscribe(
        (data)=>{
          this.is_mission_save = false; // fermer le chargement
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
        this.resetForm();
        this.gotoAcceuiMission();

        },
      )

    }
   //
  changeDatePicker(){}

  resetForm(){
    this.formMission.reset();
    this.depensesFieldAsFormArray.clear();
    this.produitsFieldAsFormArray.clear();
  }

   //

  gotoAcceuiMission(){
      this.back_to_list_mission.emit('Acceuil')
  }
  ngOnDestroy(): void {
      //this.sub.unsubscribe();
  }
}
