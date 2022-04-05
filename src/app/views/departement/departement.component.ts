import {Component, OnInit} from '@angular/core';
import {Departement} from "../../model/Departement.model";
import {DepartementService} from "../../services/departement.service";

declare var $: any;

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  listeDepartement:Departement[] = [];


  constructor(private departementService:DepartementService) {
  }

  ngOnInit() {
    this.jsFunction();
    this.loading();
    this.loadListeDepartement();
  }


  jsFunction() {
    $('.carousel').carousel();
  }

  loading() {
    $('.section').hide();
    setTimeout(() => {
      $('.section').fadeIn();
      $('#loading').fadeOut();
      //fonction pour faire le compte des stats
    }, 500);
  }

  loadListeDepartement(){

    this.departementService.getAllDepartement().subscribe(value => {
        this.listeDepartement = value;
    },error => {
      console.log("erreur lors duchargement de la liste des departement");
    })
  }

}
