import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContratService} from "../../services/contrat.service";
import {Contrat} from "../../model/Contrat.model";

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {

  listeContrat:Contrat[] = [];
  nom:string="";
  prenom:string=""
  constructor(private route: ActivatedRoute,
              private contratService:ContratService) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
          this.nom = params.nom;
          this.prenom = params.prenom;
          this.contratService.getAllContratByEmailUtilisateur(params.email).subscribe(value => {
             this.listeContrat = value;
             console.log(value)
          },error => {
            console.log(error)
          })
        }
      );
  }

}
