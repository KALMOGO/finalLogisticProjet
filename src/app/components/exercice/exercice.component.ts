import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Exercices } from 'src/app/interfaces/exercices';
import { ExercicesService } from 'src/app/services/exercice.service';
import { IExercices, IResults } from '../../folderModels/modelGestEntreprise/exercice';
@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {

  /**
   *  Declaration des variables
   */

  listeExercice : IResults[] = [];

  panelOpenState = false;

  @Output() sidenavClose = new EventEmitter();
  @Input() urlAdmin  = "127.0.0.1:8000/admin/";
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private exerciceService : ExercicesService
  ) { }

  ngOnInit(): void {
    this.getAllExercice();
  }

  openPage(url:string){

    this.router.navigate([url])

  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }



  openMaintenance(){

    this.router.navigate(['maintenance'])

  }

  openBilan(){

    this.router.navigate(['bilan'])

  }

  /**
   * Cette methode ci-dessous permet de recuperer les données
   */

  getAllExercice(){
    this.exerciceService.getListeExercices().subscribe(
      (dataGetted:any)=>{
        this.listeExercice = dataGetted.results;
      },
      (error)=>{
        console.log("Erreur detecté de type ",error);
      },
      ()=>{
        console.log("Données complétés");
      }
    )
  }

}
