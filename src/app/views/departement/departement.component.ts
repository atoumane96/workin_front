import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.jsFunction();
    this.loading();
  }


  jsFunction() {
    $('.carousel').carousel();
  }

  loading() {
    $('.section').hide();
    setTimeout(() => {
      $('.section').fadeIn();
      $('#loading').fadeOut();
      //fonction pour faire le compte des stats
    }, 1000);
  }

}
