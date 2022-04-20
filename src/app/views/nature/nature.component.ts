
import { Component, OnInit } from '@angular/core';
import {NatureService} from "../../services/nature.service";

import {ActivatedRoute} from "@angular/router";
import {Departement} from "../../model/Departement.model";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-nature',
  templateUrl: './nature.component.html',
  styleUrls: ['./nature.component.css']
})

export class NatureComponent implements OnInit {

  listeNature:any=[];
  nomDossier:string;
  nomTypeArchive:string;
  departement:Departement;

  constructor(private natureService:NatureService,
              private route: ActivatedRoute,
              private auth:AuthenticationService) { }

  ngOnInit() {
    this.departement = this.auth.authenticatedUser.departement;
    this.route.queryParams
      .subscribe(params => {
          this.nomDossier = params.dossier+"";
          this.nomTypeArchive = params.typeArchive+"";
          this.loadListeNature(params.dossier.toString(), params.typeArchive+"")
        }
      );

  }

  loadListeNature(dossier:string,typeArchive:string){
      this.natureService.getAllNatureByTypeArchiveAndDossier(dossier,typeArchive).subscribe(rsl=>{
          this.listeNature = rsl;
      })
  }



}
