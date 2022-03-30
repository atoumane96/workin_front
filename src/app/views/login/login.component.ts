// @ts-ignore
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utilisateur} from "../../model/Utilisateur.model";
import {UtilisateurService} from "../../services/utilisateur.service";
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage:string;
  constructor(private authService: AuthenticationService ,
              private router: Router,
              private utilisateurService:UtilisateurService) {}

  ngOnInit() {
    this.initForm();
    this.AfficherFormulaire();
    this.isAlreadyConnected();
    //this.loading();
   // console.log('connecté: '+this.authService.authenticated);

  }
  initForm(){
    this.formGroup = new FormGroup({
      login:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }

   AfficherFormulaire(){
    $('#formBg').hide();
     $('#formBg').slideDown({
       duration:2000
     });
   }
  //  loading(){
  //   $('.section').hide();
  //  setTimeout(() => {
  //     $('.section').fadeIn();
  //     $('#loading').fadeOut();
  //   //fonction pour faire le compte des stats
  //      }, 2000);
  // }

  seConnecter(user){
   // this.authService.login(user.username,user.password);
    /**Si LES VALEURS SAISIES SONT CORRECTES */
    //if(this.authService.isAuthenticated){
      //this.router.navigateByUrl('/change_pwd');
      //this.router.navigateByUrl('/Dashboard');
    //}
    /*** RESTE SI LES VALEURS SAISIES ZONT INCORRECTES  ** */
  }

  isAlreadyConnected(){
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl('/dashboard');
    }
  }

  loginProcess() {
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
          let jwtHelper = new JwtHelperService();
         // alert(jwtHelper.decodeToken(result.accessToken))
           this.authService.authenticated = true;

           let email = jwtHelper.decodeToken(result.accessToken).sub;

           this.utilisateurService.getAllUserByEmail(email).subscribe(rs=>{
             this.authService.authenticatedUser  = rs;
             console.log(this.authService.authenticatedUser);
             localStorage.setItem("authenticatedUser",JSON.stringify(this.authService.authenticatedUser));
             this.router.navigateByUrl('/dashboard');

           });

      },err => {
        let status = err.error.httpCode;
        if(status == 400 || status == 404){
          this.errorMessage = "Login ou mot de passe incorrect";
          setTimeout(()=>{
             this.errorMessage = "";
          },4000)


        }else if(status == 500){
          this.errorMessage = "Votre compte a été bloqué !";
        }

      })
    }
  }


}
