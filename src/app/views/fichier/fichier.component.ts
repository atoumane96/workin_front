import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArchiveService} from "../../services/archive.service";
declare var $ :any

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css']
})
export class FichierComponent implements OnInit {

  listeFichier:any = [];
  nomTypeArchive:string;
  nomDossier:string;
  natureArchive:string;
  dossier:String;
  type:String;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private archiveService:ArchiveService) { }


  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.getAllArchiveByDossierTypeArchiveNature(params.dossier.toString(),
                                                       params.typeArchive.toString(),
                                                       params.nature.toString());
          this.nomDossier = params.dossier.toString();
          this.nomTypeArchive = params.typeArchive.toString()
          this.natureArchive =  params.nature.toString();
        }
      );
    $(".tooltipped").tooltip();
  }


  getAllArchiveByDossierTypeArchiveNature(dossier:string,typeArchive:string,nature:string){
    this.archiveService.getAllFichiersByDossierNatureAndTypeArchive(dossier,nature,typeArchive).subscribe(result=>{
      this.listeFichier = result;
      console.log(this.listeFichier)
    },error => {
      console.log(error)
    })

  }

  //
  // filerData(val) {
  //   if (val) {
  //     val = val.toLowerCase();
  //   } else {
  //     return this.filteredProducts = [...this.products];
  //   }
  //
  //   const columns = Object.keys(this.products[0]);
  //   if (!columns.length) {
  //     return;
  //   }
  //
  //   const rows = this.products.filter(function(d) {
  //     for (let i = 0; i <= columns.length; i++) {
  //       const column = columns[i];
  //       // console.log(d[column]);
  //       if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
  //         return true;
  //       }
  //     }
  //   });
  //   this.filteredProducts = rows;
  // }


}



