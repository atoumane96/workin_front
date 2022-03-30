import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppDataState, DataStateEnum} from "../state/state";
import {catchError, map, startWith} from "rxjs/operators";
import {Utilisateur} from "../model/Utilisateur.model";
import {UtilisateurService} from '../services/utilisateur.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  utilisateurs$: Observable<AppDataState<Utilisateur[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private utilisateurService: UtilisateurService) {

  }

  ngOnInit() {

    console.log("start");
    this.getUtilisateurs();

  }
  getUtilisateurs(){
    this.utilisateurs$=this.utilisateurService.getAllUsers().pipe(
      map(data =>
        ({ dataState: DataStateEnum.LOADED, data: data }//as AppDataState<Utilisateur[]>
        )),
      startWith({dataState: DataStateEnum.LOADING} ),
      catchError(err=>of(
        {dataState: DataStateEnum.ERROR, errorMessage: err.message} ))
    );
  }
  // utilisateurs$: Observable<AppDataState<Utilisateur[]>>|null=null;
  // readonly DataStateEnum = DataStateEnum;
  // constructor(private utilisateurService: UtilisateurService) {
  //
  // }
  //
  // ngOnInit() {
  //   this.getUtilisateurs();
  // }
  // getUtilisateurs(){
  //   this.utilisateurs$=this.utilisateurService.getAllUsers().pipe(
  //     map(data =>
  //       ({ dataState: this.DataStateEnum.LOADED, data: data }//as AppDataState<Utilisateur[]>
  //       )),
  //     startWith({dataState: this.DataStateEnum.LOADING} ),
  //     catchError(err=>of(
  //       {dataState: this.DataStateEnum.ERROR, errorMessage: err.message} ))
  //   );
  // }

}
