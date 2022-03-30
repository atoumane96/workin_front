import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'


declare var $:any;
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})
export class RHComponent implements OnInit {
  t=[1,2,3,4,5,6,7,8,9,10];
  tabDepartement=[];
  tabFichier=[];
  valeur:string;
  isUpdate=false;
  currentIndex:any;
  statutButton="Valider"

  constructor() {

  }

  ngOnInit() {
    $('.tabs').tabs();
    this.MyjsFunction();
    this.loading();
    $(".tooltipped").tooltip();
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

  creationDepartement(dataForm){
    let index1;
    if (this.isUpdate==false) {
      this.statutButton="Valider"
      this.tabDepartement.push(dataForm);
      this.topend();
    }else{
      index1=this.currentIndex;
      this.onUpdateDepartement(dataForm,index1);
    }
    this.isUpdate=false;
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

  creationTypeFichier(dataForm){
    console.log(dataForm.typeFichier);
    this.tabFichier.push(dataForm);
    $('#modalTypeFichier').hide();
    this.topend();
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

  DeleteDepartement(index){
    Swal.fire({
      title: 'Voulez Vous vraiment supprimer ce departement',
      icon: 'warning',
      //showDenyButton: true,
      showCancelButton:true,
      confirmButtonText: `Confirmer`,
      //denyButtonText: `Don't save`,
    }).then((result) => {
      //this.spinnerService.show();
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.tabDepartement.splice(index,1);
        Swal.fire('Departement supprimé!', '', 'success')

      }
    })
  }


}
