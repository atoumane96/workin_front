import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { NdashioComponent } from './views/ndashio/ndashio.component';
import { DossierComponent } from './views/docs/dossier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartementComponent } from './views/departement/departement.component';
import { RHComponent } from './views/rh/rh.component';
import { TypeArchiveComponent } from './views/typeArchive/typeArchive.component';
import { DetailFichierComponent } from './views/detail-fichier/detail-fichier.component';
import { InfoComponent } from './views/info/info.component';
import {JwtModule} from '@auth0/angular-jwt';
import { TesteComponent } from './teste/teste.component';
import {AuthGuard} from "./services/authGuard";
import {HttpClientModule} from "@angular/common/http";
import { Error404Component } from './views/error404/error404.component';
// import { FichierComponent } from './views/fichier/fichier.component';
import { ArchiveformulaireComponent } from './views/archiveformulaire/archiveformulaire.component';
import { NatureComponent } from './views/nature/nature.component';
import {FichierComponent} from "./views/fichier/fichier.component";
import {UtilisateurformulaireComponent} from "./views/utilisateurformulaire/utilisateurformulaire.component";
import { UtilisateurDetailsComponent } from './views/utilisateur-details/utilisateur-details.component';
import { ContratsComponent } from './views/contrats/contrats.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NdashioComponent,
    DossierComponent,
    DepartementComponent,
    RHComponent,
    TypeArchiveComponent,
    DetailFichierComponent,
    InfoComponent,
    TesteComponent,
    Error404Component,
    FichierComponent,
    ArchiveformulaireComponent,
    NatureComponent,
    UtilisateurformulaireComponent,
    UtilisateurDetailsComponent,
    ContratsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
