import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ExerciceComponent } from './components/exercice/exercice.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MaintenanceDialogueComponent } from './components/maintenance-dialogue/maintenance-dialogue.component';
import { HttpClientModule } from '@angular/common/http';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ListeExerciceComponent } from './components/liste-exercice/liste-exercice.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MenuMissionComponent } from './components/menu-mission/menu-mission.component';

import { DatePipe } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';

import { HeaderComponent } from './components/header/header.component';

import { SearchFilterPipe } from './search-filter.pipe';
import { ChauffeurComponent } from './components/chauffeur/chauffeur.component';

import { VehiculesComponent } from './components/vehicules/vehicules.component';
import { ListeVehiculesComponent } from './components/liste-vehicules/liste-vehicules.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailChauffeurComponent } from './components/detail-chauffeur/detail-chauffeur.component';
import { DetailMaintenanceComponent } from './components/detail-maintenance/detail-maintenance.component';
import { ListeMissionComponent } from './components/missions/liste-mission/liste-mission.component';
import { BilanMissionsComponent } from './components/missions/bilan-missions/bilan-missions.component';
import { DetailMissionComponent } from './components/missions/detail-mission/detail-mission.component';
import { ModalActionMissionComponent } from './components/missions/modal-action-mission/modal-action-mission.component';
import { NotificationsComponent } from './components/missions/notifications/notifications.component';
import { OrdreMissionComponent } from './components/missions/ordre-mission/ordre-mission.component';
import { ProgrammerComponent } from './components/missions/programmer/programmer.component';
import { MissionsComponent } from './components/missions/missions.component';
import { StructureComponent } from './components/structure/structure.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListeClientsComponent } from './components/structure/liste-clients/liste-clients.component';
import { ListeProduitsComponent } from './components/structure/liste-produits/liste-produits.component';
import { ListePiecesComponent } from './components/structure/liste-pieces/liste-pieces.component';
import { ListeTrajetsComponent } from './components/structure/liste-trajets/liste-trajets.component';
import { ListeVehiculeLouesComponent } from './components/structure/liste-vehicule-loues/liste-vehicule-loues.component';
import { ListeDocumentVehiculeComponent } from './components/structure/liste-document-vehicule/liste-document-vehicule.component';
import { CategorieVehiculeComponent } from './components/structure/categorie-vehicule/categorie-vehicule.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    ExerciceComponent,
    MaintenanceComponent,
    BilanComponent,
    MaintenanceDialogueComponent,
    StatistiqueComponent,
    ListeExerciceComponent,
    MenuMissionComponent,
    HeaderComponent,
    SearchFilterPipe,
    ChauffeurComponent,
    VehiculesComponent,
    ListeVehiculesComponent,
    CategoriesComponent,
    DetailChauffeurComponent,
    DetailMaintenanceComponent,
    ListeMissionComponent,
    BilanMissionsComponent,
    DetailMissionComponent,
    ModalActionMissionComponent,
    NotificationsComponent,
    OrdreMissionComponent,
    ProgrammerComponent,
    MissionsComponent,
    StructureComponent,
    ListeClientsComponent,
    ListeProduitsComponent,
    ListePiecesComponent,
    ListeTrajetsComponent,
    ListeVehiculeLouesComponent,
    ListeDocumentVehiculeComponent,
    CategorieVehiculeComponent,



  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NgxPrintModule,
    NgxChartsModule,

    MatSnackBarModule
  ],
  providers: [
   // {provide: LOCALE_ID, useValue: "fr-FR"},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
