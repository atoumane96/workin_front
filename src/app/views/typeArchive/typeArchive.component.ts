import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'
import {ArchiveService} from "../../services/archive.service";
import {TypeArchive} from "../../model/TypeArchive.model";
import {TypeArchiveService} from "../../services/typeArchive.service";
declare var $:any;

@Component({
  selector: 'app-type',
  templateUrl: './typeArchive.component.html',
  styleUrls: ['./typeArchive.component.css']
})
export class TypeArchiveComponent implements OnInit {
  tabArchive = [];
  archiveForm:FormGroup;
  listTypeArchive:TypeArchive[] = [];
  departement:string;
  constructor(private router:Router,
              private formbuilder:FormBuilder,
              private typeArchiveService:TypeArchiveService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.loading();
    this.MyjsFunction();
    this.AfficherFormulaire();
    //this.loadListeTypeArchive();

    this.route.queryParams
      .subscribe(params => {
          this.departement = params.departement+"";
         this.loadListeTypeArchive(params.departement+"");
        }
      );

  }

  initForm() {
    this.archiveForm = this.formbuilder.group({
      titre: ['',[Validators.required,Validators.minLength(2)]],
      dateArchive: ['',[Validators.required]],
      fichierArchive: ['', [Validators.required]],
      fichierPath: ['',[Validators.required]],
      Descripting: ['', [Validators.minLength(2),Validators.maxLength(100)]],//pas encore coté HTML
    })
    }

  topend()
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Le fichier est ajouté avec succes!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  confirmBox(){
    Swal.fire({
      title: 'Etes vous sure de vouloir supprimer?',
      text: '\'information sera completement supprimer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimez le!',
      cancelButtonText: 'Non, gardez le'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimer!',
          'Suppression reussie!.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Le fichier est savé :)',
          'error'
        )
      }
    })
  }

  MyjsFunction(){
    var i:number
    $('.modal').modal({
      dismissible:false,
      inDuration:1000,
      outDuration:1000
  });
  $('select').formSelect();
  $('.tabs').tabs();
  $('.fixed-action-btn').floatingActionButton();
}

loading(){
  $('.section').hide();
 setTimeout(() => {
    $('.section').fadeIn();
    $('#loading').fadeOut();
  //fonction pour faire le compte des stats
     }, 500);
    }

AfficherFormulaire(){
  this.CacherArchive();
  $('#CardArchiveDate').hide();
  $('#DateArchive').on('click',function () {
  $('#cardArchive').hide();
  $('#CardArchiveDate').slideDown({
    duration:1000
  });
  })
 }

 CacherArchive(){
  $('#Tab').on('click',function () {
    $('#CardArchiveDate').hide();
    })
 }

 Archiver(dataForm){
  console.log(dataForm);
  this.tabArchive.push(dataForm);
  this.topend();
 }

 DeleteArchive(index){
  Swal.fire({
    title: 'Voulez Vous vraiment supprimer ce fichier',
    icon: 'warning',
    //showDenyButton: true,
    showCancelButton:true,
    confirmButtonText: `Confirmer`,
    //denyButtonText: `Don't save`,
  }).then((result) => {
    //this.spinnerService.show();
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     // this.tabArchive.splice(index,1);
      Swal.fire('Utilisateur supprimé!', '', 'success')

    }
  })
 }


  loadListeTypeArchive(nomDepartement:string){
      this.typeArchiveService.getAllTypeArchiveByDepartement(nomDepartement).subscribe(rsl=>{
      this.listTypeArchive = rsl;
      // console.log(this.listTypeArchive);
    },error => {
      console.log(error)
    })
  }


}
