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
  choisirDepartement:string = "";
  formAddTypeArchiveValid:boolean = false;
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
  showPatienter: boolean = false;

  constructor(private departementService:DepartementService,
              private utilisateurService:UtilisateurService,
              private typeArchiveService:TypeArchiveService) {

  }

  ngOnInit() {
    $('.tabs').tabs();
    this.MyjsFunction();
    this.loading();
    $(".tooltipped").tooltip();
    $('.modal').modal();
    this.loadAllDepartement();
    this.loadAllUtilisateur();
    this.loadListeTypeArchive();

  }



  creationDepartement(dataForm:Departement){
    let index1;
    let departement:Departement;

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

    let typeArchiveAdded:TypeArchive;

    if(dataForm.libelleTypeArchive.trim() == ""){
      this.champsNomTypeFichierRequit = "Ce champs est obligatoire";

    }else if(!dataForm.departement){
      this.choisirDepartement = "Veillez choisir un d??partement";

    }else{

      if(dataForm.libelleTypeArchive != "" && dataForm.departement){
        this.formAddTypeArchiveValid = true;

        this.typeArchiveService.ajouterTypeArchive(dataForm).subscribe(value => {
             typeArchiveAdded = value;
             this.listeTypeArchive.push(dataForm);
             this.alertSuccessTypeArchive();
        },error => {
          console.log(error)
        })
      }
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
        Swal.fire('type de fichier supprim??!', '', 'success')

      }
    })
  }

  allertBloquerUtilisateur(email:string){
    Swal.fire({
      title: 'Voulez vous vraiment d??bloqu?? cet utilisateur ?',
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
        this.utilisateurService.bloquer(email).subscribe(value => {
          this.loadAllUtilisateur();
          Swal.fire(value.prenom + ' ' + value.nom + ' a ??t?? d??bloqu??! avec success', '', 'success')
        },error => {
          console.log(error)
        })

      }
    })
  }

  allertDeBloquerUtilisateur(email:string){
    Swal.fire({
      title: 'Voulez vous vraiment bloquer cet utilisateur ?',
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
        this.utilisateurService.bloquer(email).subscribe(value => {
          this.loadAllUtilisateur();
          Swal.fire(value.prenom + ' ' + value.nom + ' a ??t?? bloqu?? avec success!', '', 'success')
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
      title: 'D??partement cr???? avec succes!',
      showConfirmButton: true,
      confirmButtonColor:'green'
      //timer: 1500
    })
  }

  alertSuccessTypeArchive() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Type Archive cr???? avec succes!',
      showConfirmButton: true,
      confirmButtonColor:'green'
      //timer: 1500
    })
  }




  loadAllDepartement(){
    this.showPatienter = true;
    this.departementService.getAllDepartement().subscribe(value => {
      this.listeDepartement = value;
      this.showPatienter = false;
    })
  }


  loadAllUtilisateur(){
    this.showPatienter = true;
    this.utilisateurService.getAllUsers().subscribe(value => {
         this.listeUtilisateur = value;
         this.showPatienter = false;
         this.listeUtilisateur.forEach(user => {
             if(user.photo == ""){

               user.photo = "../../../assets/icone_file/user.png";

             }else{
               user.photo = 'data:image/jpeg;base64,' + user.photo;


             }
       })
    },error => {
      console.log(error)
    })

  }

  loadListeTypeArchive(){
    this.showPatienter = true;
    this.typeArchiveService.getAllTypeArchive().subscribe(value => {
      this.showPatienter = false;
      this.listeTypeArchive = value;
    },error => {
      console.log(error)
    })
  }

}
