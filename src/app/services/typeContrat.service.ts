import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {TypeContrat} from "../model/TypeContrat.model";


@Injectable({
  providedIn: 'root'
})
export class TypeContratService {

    ressource="/typecontrat";
    constructor(private http:HttpClient) {
    }

    public getAllTypeContrat():Observable<TypeContrat>{
      return this.http.get<TypeContrat>(environment.host + this.ressource + "/all");
    }

}
