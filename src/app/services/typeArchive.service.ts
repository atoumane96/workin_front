import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/Utilisateur.model';
import {TypeArchive} from "../model/TypeArchive.model";
import {AuthenticationService} from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class TypeArchiveService {

    ressource="/typearchive";
    constructor(private http:HttpClient,
                private auth:AuthenticationService) {
    }

    public getAllTypeArchive():Observable<TypeArchive[]>{
      return this.http.get<TypeArchive[]>(environment.host + this.ressource + "/all");
    }

  public getAllTypeArchiveByDepartement(nomDepartement:string):Observable<TypeArchive[]>{
    return this.http.get<TypeArchive[]>(environment.host + this.ressource + "/departement/"+nomDepartement);
  }
  //
  // public getAllTypeArchiveByDepartementForAdmin(nomDepartement:string):Observable<TypeArchive[]>{
  //   return this.http.get<TypeArchive[]>(environment.host + this.ressource + "/departement/"+nomDepartement);
  // }

    public ajouterTypeArchive(utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.post<Utilisateur>(environment.host+this.ressource,utilisateur);
    }

    public modifierTypeArchive(id: number, utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${environment.host+this.ressource}/${id}`,utilisateur);
    }

    public supprimerTypeArchive(id: number):Observable<any>{
      return this.http.delete(`${environment.host+this.ressource}/${id}`);
    }
}
