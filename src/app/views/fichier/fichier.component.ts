import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArchiveService} from "../../services/archive.service";
import Swal from "sweetalert2";
declare var $ :any

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css']
})
export class FichierComponent implements OnInit {

  listeFichier:any = [];
  extensions:any = ['pdf','png','jpg'];
  nomTypeArchive:string;
  nomDossier:string;
  natureArchive:string;
  dossier:String;
  type:String;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private archiveService:ArchiveService) { }


  ngOnInit() {
   this.loadListeFichier();
    $(".tooltipped").tooltip();
  }



loadListeFichier(){
  this.route.queryParams
    .subscribe(params => {
        this.getAllArchiveByDossierTypeArchiveNature(params.dossier+'',
          params.typeArchive+'',
          params.nature+'');
        this.nomDossier = params.dossier+'';
        this.nomTypeArchive = params.typeArchive+''
        this.natureArchive =  params.nature+'';
      }
    );

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


  allertSupprimerFichier(id:number){
    Swal.fire({
      title: 'Voulez vous vraiment supprimer ce fichier ?',
      icon: 'warning',
      //showDenyButton: true,
      showCancelButton:true,
      confirmButtonText: `Confirmer`,
      confirmButtonColor:'green',
      cancelButtonText:  'Annuler',
      cancelButtonColor : 'red'
      //denyButtonText: `Don't save`,
    }).then((result) => {
      //this.spinnerService.show();
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.archiveService.supprimerArchive(id).subscribe(value => {
          this.loadListeFichier();
          Swal.fire('le fichier a été supprimé avec success', '', 'success')
        },error => {
          console.log(error)
        })

      }
    })
  }
}



