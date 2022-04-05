import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import {Departement} from "../../model/Departement.model";
import {DepartementService} from "../../services/departement.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Utilisateur} from "../../model/Utilisateur.model";
import {TypeArchive} from "../../model/TypeArchive.model";
import {TypeArchiveService} from "../../services/fichier.service";


declare var $:any;
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})
export class RHComponent implements OnInit {
  bloquerUtilisateur:boolean;
  champsNomDepartementRequit:string = "";
  champsNomTypeFichierRequit:string = "";
  listeDepartement:Departement[] = [];
  listeUtilisateur:Utilisateur[] = [];
  listeTypeArchive:TypeArchive[] = [];
  tabDepartement=[];
  tabFichier=[];
  valeur:string;
  isUpdate=false;
  currentIndex:any;
  statutButton="Valider"

  constructor(private departementService:DepartementService,
              private utilisateurService:UtilisateurService,
              private typeArchiveService:TypeArchiveService) {

  }

  ngOnInit() {
    $('.tabs').tabs();
    this.MyjsFunction();
    this.loading();
    $(".tooltipped").tooltip();
    this.loadAllDepartement();
    this.loadAllUtilisateur();
    this.loadListeTypeArchive();

  }


  topend()
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'ajouté avec succes!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  creationDepartement(dataForm:Departement){
    let index1;
    let departement:Departement;
    console.log(dataForm)
    if(dataForm.nomDepartement != ""){
      if (  this.isUpdate == false) {
        this.statutButton="Valider"
        this.departementService.ajouterDepartement(dataForm).subscribe(value => {
          departement = value;
          this.listeDepartement.push(departement)
          this.alertSuccessDepartement();
        },error => {
          console.log("erreur lors de l'ajout du departement"+ error)
        })

      }else{
        index1=this.currentIndex;
        this.onUpdateDepartement(dataForm,index1);
      }
      this.isUpdate=false;
    } else {
      this.champsNomDepartementRequit = " ce champs est requit";
    }


  }


  onUpdateDepartement(dataForm,index){
    console.log(index)
    this.tabDepartement.push(dataForm);
    this.tabDepartement.splice(index,1);
    this.isUpdate=false;
    this.statutButton="VALIDER";
  }

  modificationDepartement(index){
    //  console.log(this.tabDepartement[index].departement);
    this.statutButton="MODIFIER"
    this.isUpdate=true;
    this.currentIndex=index;
    this.valeur=this.tabDepartement[index].departement;
    console.log(this.currentIndex)
  }

  creationTypeFichier(dataForm:TypeArchive){
    console.log(dataForm);
    let typeArchiveAdded:TypeArchive;
    if(dataForm.libelleTypeArchive != ""){

       this.typeArchiveService.ajouterTypeArchive(dataForm).subscribe(value => {
            typeArchiveAdded = value;
            this.listeTypeArchive.push(dataForm);
            this.alertSuccessTypeArchive();
       },error => {
         console.log(error)
       })

    }else {
      this.champsNomTypeFichierRequit = "Ce champs est obligatoire";
    }

  }


  loading(){
    $('.section').hide();
    setTimeout(() => {
      $('.section').fadeIn();
      $('#loading').fadeOut();
      //fonction pour faire le compte des stats
    }, 1000);
  }


  MyjsFunction(){
    $('.modal').modal({
      dismissible:false,
      inDuration:1000,
      outDuration:1000
    });
    $('select').formSelect();
    $('.fixed-action-btn').floatingActionButton();
  }




  DeleteTypeFichier(index){
    Swal.fire({
      title: 'Voulez Vous vraiment supprimer ce type fichier!',
      icon: 'warning',
      //showDenyButton: true,
      showCancelButton:true,
      confirmButtonText: `Confirmer`,
      //denyButtonText: `Don't save`,
    }).then((result) => {
      //this.spinnerService.show();
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.tabFichier.splice(index,1);
        Swal.fire('type de fichier supprimé!', '', 'success')

      }
    })
  }

  allertBloquerUtilisateur(email:string){
    Swal.fire({
      title: 'Voulez Vous vraiment débloqué cet utilisateur ?',
      icon: 'warning',
      //showDenyButton: true,
      showCancelButton:true,
      confirmButtonText: `Confirmer`,
      confirmButtonColor:'green'
      //denyButtonText: `Don't save`,
    }).then((result) => {
      //this.spinnerService.show();
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.utilisateurService.bloquer(email).subscribe(value => {
          this.loadAllUtilisateur();
          Swal.fire(value.prenom + ' ' + value.nom + ' a été débloqué! avec success', '', 'success')
        },error => {
          console.log(error)
        })

      }
    })
  }

  allertDeBloquerUtilisateur(email:string){
    Swal.fire({
      title: 'Voulez Vous vraiment bloquer cet utilisateur ?',
      icon: 'warning',
      //showDenyButton: true,
      showCancelButton:true,
      confirmButtonText: `Confirmer`,
      confirmButtonColor:'green'
      //denyButtonText: `Don't save`,
    }).then((result) => {
      //this.spinnerService.show();
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.utilisateurService.bloquer(email).subscribe(value => {
          this.loadAllUtilisateur();
          Swal.fire(value.prenom + ' ' + value.nom + ' a été bloqué ! avec success', '', 'success')
        },error => {
          console.log(error)
        })

      }
    })
  }

  alertSuccessDepartement() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Département créé avec succes!',
      showConfirmButton: true,
      confirmButtonColor:'green'
      //timer: 1500
    })
  }

  alertSuccessTypeArchive() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Type Archive créé avec succes!',
      showConfirmButton: true,
      confirmButtonColor:'green'
      //timer: 1500
    })
  }




  loadAllDepartement(){
    this.departementService.getAllDepartement().subscribe(value => {
      this.listeDepartement = value;
    })
  }

  loadAllUtilisateur(){
    this.utilisateurService.getAllUsers().subscribe(value => {
       this.listeUtilisateur = value;
    },error => {
      console.log(error)
    })
  }

  loadListeTypeArchive(){
    this.typeArchiveService.getAllTypeArchive().subscribe(value => {
      this.listeTypeArchive = value;
    },error => {
      console.log(error)
    })
  }

}
