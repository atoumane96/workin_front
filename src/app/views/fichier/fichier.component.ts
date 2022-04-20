import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArchiveService} from "../../services/archive.service";
import Swal from "sweetalert2";
import {Archive} from "../../model/Archive.model";
import {Departement} from "../../model/Departement.model";
import {AuthenticationService} from "../../services/authentication.service";
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
  departement:Departement;
  dossier:String;
  type:String;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private archiveService:ArchiveService,
              private auth:AuthenticationService) { }


  ngOnInit() {
    this.departement = this.auth.authenticatedUser.departement;
   this.loadListeFichier();
    $(".tooltipped").tooltip();
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').modal();


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


  alertInfoArchive(id:number) {
    const fichierInfo = this.listeFichier[id];
    Swal.fire({
      position: 'center',
      title: '<span class="blue-grey-text">Informations du fichier</span>   <a class="right" href="#"><i class="fa fa-pencil-square"></i></a><br/><br/>'+
             '<b style="font-size: 18px;">Numero : </b>'+'<span style="font-size: 18px;color: black">'+fichierInfo.numeroArchivage+'</span><br/>'+
             '<b style="font-size: 18px;">Titre  : </b>'+'<span style="font-size: 18px;color: black">'+fichierInfo.nomFichier+'</label><br/>'+
             '<b style="font-size: 18px;">Nature : </b>'+'<span style="font-size: 18px;color: black">'+fichierInfo.nature.libelleNature+'</label><br/>'+
             '<b style="font-size: 18px;">Date : </b>'+'<span style="font-size: 18px;color: black">'+new Date(fichierInfo.dateArchivage).toLocaleDateString('fr')
                                                                                                    +' a '+new Date(fichierInfo.dateArchivage).toLocaleTimeString('fr')+'</label><br/>'+
             '<b style="font-size: 18px;">Extension :  </b>'+'<span style="font-size: 18px;color: black">'+fichierInfo.extension+'</label><br/>',

      text:'',
      showConfirmButton: true,
      confirmButtonText: "D'accord",
      confirmButtonColor:'#0896C9'
      //timer: 1500
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


  allertSupprimerFichier(id:number,index){
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
        this.listeFichier.splice(index,1);
        this.archiveService.supprimerArchive(id).subscribe(value => {
          Swal.fire('le fichier a été supprimé avec success', '', 'success')
        },error => {
          console.log(error)
        })

      }
    })
  }
}



