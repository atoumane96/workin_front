
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";
import {Utilisateur} from "../../model/Utilisateur.model";
declare var $ :any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private utilisateur:Utilisateur;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.myJsFunctionality();
    this.utilisateur = this.authService.authenticatedUser;
    if(this.utilisateur.photo == ""){

      this.utilisateur.photo = "../../../assets/icone_file/user.png";

    }else{

      this.utilisateur.photo = 'data:image/jpeg;base64,' + this.utilisateur.photo;
    }

  }



     myJsFunctionality() {
      $(".sidenav").sidenav();
       $(".tooltipped").tooltip();
     }


  onlogout() {
    this.authService.logout();
    this.router.navigateByUrl("/index");
  }



}
