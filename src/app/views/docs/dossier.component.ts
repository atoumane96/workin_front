import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DossierService} from "../../services/dossier.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Departement} from "../../model/Departement.model";


declare var $: any;

@Component({
  selector: 'app-archivage',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent implements OnInit {
  nom: string;
  listeDossier: any = [];
  typeArc: String;
  departement:Departement;
  fichier: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dossierService: DossierService,
              private auth:AuthenticationService) {
  }

  ngOnInit() {
    this.MyjsFunction();
    this.route.queryParams
      .subscribe(params => {
          this.typeArc = params.type;
          this.nom = params.type;
          this.getAllDossier(this.typeArc.toString())
        }
      );
     this.departement = this.auth.authenticatedUser.departement;
  }

  MyjsFunction() {
    $('.modal').modal({
      dismissible: false,
      inDuration: 500,
      outDuration: 500
    });
    $('select').formSelect();
    $('datepicker').datepicker();
  }

  // Archiver(dataForm){
  //  console.log(dataForm);
  //  this.tabArchive.push(dataForm);
  //  console.log(this.tabArchive);
  // }
  //
  // DeleteArchive(index){
  //   alert("Voulez vous vraiment supprimer Le fichier!")
  //  this.tabArchive.splice(index,1);
  // }

  getAllDossier(type: string) {
    this.dossierService.getAllDossierByType(type).subscribe(result => {
      this.listeDossier = result;
      console.log(this.listeDossier)
    }, error => {
      console.log(error)
    })
  }


}
