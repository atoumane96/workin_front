
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";
declare var $ :any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private nom;
  private prenom;
  private email;
  private departement;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.myJsFunctionality();
    this.nom = this.authService.authenticatedUser.nom;
    this.prenom = this.authService.authenticatedUser.prenom;
    this.email = this.authService.authenticatedUser.email;
    this.departement = this.authService.authenticatedUser.departement.nomDepartement;
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
