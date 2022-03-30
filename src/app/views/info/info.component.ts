import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loading();
  }



  loading(){
    $('.section').hide();
   setTimeout(() => {
      $('.section').fadeIn();
      $('#loading').fadeOut();
    //fonction pour faire le compte des stats
       }, 1000);
      }


}
