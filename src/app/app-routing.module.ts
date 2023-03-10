import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { BilanComponent } from './components/bilan/bilan.component';

import { MenuMissionComponent } from './components/menu-mission/menu-mission.component';
import { ProgrammerComponent } from './components/missions/programmer/programmer.component';
import { MissionsComponent } from './components/missions/missions.component';
import { OrdreMissionComponent } from './components/missions/ordre-mission/ordre-mission.component';
import { IsLoggedGuard } from './is-logged.guard';
import { ChauffeurComponent } from './components/chauffeur/chauffeur.component';
import { VehiculesComponent } from './components/vehicules/vehicules.component';
import { DetailMaintenanceComponent } from './components/detail-maintenance/detail-maintenance.component';
import { DetailChauffeurComponent } from './components/detail-chauffeur/detail-chauffeur.component';
import { ListeClientsComponent } from './components/structure/liste-clients/liste-clients.component';
import { ListePiecesComponent } from './components/structure/liste-pieces/liste-pieces.component';
import { CategorieVehiculeComponent } from './components/structure/categorie-vehicule/categorie-vehicule.component';
import { ListeProduitsComponent } from './components/structure/liste-produits/liste-produits.component';
import { ListeVehiculeLouesComponent } from './components/structure/liste-vehicule-loues/liste-vehicule-loues.component';
import { ListeTrajetsComponent } from './components/structure/liste-trajets/liste-trajets.component';
import { ListeDocumentVehiculeComponent } from './components/structure/liste-document-vehicule/liste-document-vehicule.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path:'accueil',component:AuthentificationComponent},

    //exercices
  {
    path:'exercice',component:ListeExerciceComponent,
    canActivate:[IsLoggedGuard]
  },

  {
    path:'statistique',
    component:StatistiqueComponent,
    canActivate:[IsLoggedGuard]
  },
  // Les bilans
  {
    path:'bilan',
    component:BilanComponent,
    canActivate:[IsLoggedGuard]
  },

  {path:'add',component:ProgrammerComponent},
  {path:'liste-mission',component:MissionsComponent},


  // Les missions

  {
    path:'mission',
    component:MissionsComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:'ordre',
    component:OrdreMissionComponent,
    canActivate:[IsLoggedGuard]
  },
  //  Les vehicules
  {
    path:'vehicules',
    component:VehiculesComponent,
    canActivate:[IsLoggedGuard]
  },

  // Les maintenances

  {
    path:'maintenance',
    component:MaintenanceComponent,
    canActivate:[IsLoggedGuard]
  },

  // Les bilans
  {
    path:'bilan',
    component:BilanComponent,
    canActivate:[IsLoggedGuard]
  },
    // Les chauffeurs
    {
      path:'chauffeur',
      component:ChauffeurComponent,
      canActivate:[IsLoggedGuard]
    },
    {
      path:'chauffeur/detail',
      component:DetailChauffeurComponent,
      canActivate:[IsLoggedGuard]
    },
    {
      path:'maintenance/detail',
      component:DetailMaintenanceComponent,
      canActivate:[IsLoggedGuard]
    }
    ,
    {
      path:'Clients',
      component:ListeClientsComponent,
      canActivate:[IsLoggedGuard]
    }
    ,
    {
      path:'Pieces',
      component:ListePiecesComponent,
      canActivate:[IsLoggedGuard]
    }
    ,
    {
      path:'Categorie vehicule',
      component:CategorieVehiculeComponent,
      canActivate:[IsLoggedGuard]
    }
    ,
    {
      path:'Produits',
      component:ListeProduitsComponent,
      canActivate:[IsLoggedGuard]
    } ,
    {
      path:'Vehicule Loues',
      component:ListeVehiculeLouesComponent,
      canActivate:[IsLoggedGuard]
    }
    ,
    {
      path:'Trajets',
      component:ListeTrajetsComponent,
      canActivate:[IsLoggedGuard]
    },
    {
      path:'Documents vehicule',
      component:ListeDocumentVehiculeComponent,
      canActivate:[IsLoggedGuard]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
