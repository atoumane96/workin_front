import { Component,OnInit} from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WORKIN V1';

  constructor(){
  }

  ngOnInit(){
    $('.modal').modal({
      dismissible:true,
      inDuration:500,
      outDuration:500
  });
  }


}
