import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/Utilisateur.model';


@Injectable({
  providedIn: 'root'
})
export class ContratService {

    ressource="/typecontrat";
    constructor(private http:HttpClient) {
    }
    
    public getAllTypeContrat():Observable<Utilisateur[]>{
      return this.http.get<any>(`\${this.host}+this.ressource/All`);    
    }

    public ajouterTypeContrat(utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.post<Utilisateur>(environment.host+this.ressource,utilisateur);    
    }

    public modifierTypeContrat(id: number, utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${environment.host+this.ressource}/${id}`,utilisateur);    
    }

    public supprimerTypeContrat(id: number):Observable<any>{
      return this.http.delete(`${environment.host+this.ressource}/${id}`);
    }
}
