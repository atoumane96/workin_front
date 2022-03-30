import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authGuard';
import { DossierComponent } from './views/docs/dossier.component';
/*import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';*/
import { LoginComponent } from './views/login/login.component';
import { NdashioComponent } from './views/ndashio/ndashio.component';
import { RHComponent } from './views/rh/rh.component';
import {TesteComponent} from "./teste/teste.component";
import {Error404Component} from "./views/error404/error404.component";
import {TypeArchiveComponent} from "./views/typeArchive/typeArchive.component";
// import {FichierComponent} from "./views/fichier/fichier.component";
import {ArchiveformulaireComponent} from "./views/archiveformulaire/archiveformulaire.component";
import {NatureComponent} from "./views/nature/nature.component";
import {UtilisateurformulaireComponent} from "./views/utilisateurformulaire/utilisateurformulaire.component";


const routes: Routes = [
  {path:'index', component:LoginComponent},
  {path:'test', component:TesteComponent},
  {path:'notfound', component:Error404Component},

  {
    path:'archive',
    component:TypeArchiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'dossier',
    component:DossierComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'nature',
    component:NatureComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'archiver',
    component:ArchiveformulaireComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path:'fichier',
  //   component:FichierComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path:'dashboard',
    component:NdashioComponent,
    canActivate: [AuthGuard],
    //data: {role: ['ADMIN','USER']}
  },
  /*{
    path:'change_pwd',
    component:ChangePasswordComponent,
    canActivate: [AuthGuard]
  },*/
  {
    path:'rh',
    component:RHComponent,
    canActivate: [AuthGuard],
    data: {departement: 'RH'}
  },
 {  path:'ajouter_utilisateur',
    component:UtilisateurformulaireComponent,
    canActivate: [AuthGuard],
    data: {departement: 'RH'}
  },
  {path:'',redirectTo:'/index',pathMatch:'full'},
  {path:'**', redirectTo:'/notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
