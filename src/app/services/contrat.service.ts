import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Contrat} from "../model/Contrat.model";


@Injectable({
  providedIn: 'root'
})
export class ContratService {

    ressource="/contrat";
    constructor(private http:HttpClient) {
    }


  public getAllContratByEmailUtilisateur(email:string):Observable<Contrat[]>{
    return this.http.get<Contrat[]>(environment.host + this.ressource + "/contrat/" + email);
  }


}
