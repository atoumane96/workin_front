import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/Utilisateur.model';


@Injectable({
  providedIn: 'root'
})
export class ContratService {

    ressource="/contrat";
    constructor(private http:HttpClient) {
    }

    public getAllContrat():Observable<Utilisateur[]>{
      return this.http.get<any>(`\${this.host}+this.ressource/all`);
    }

    public ajouterContrat(utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.post<Utilisateur>(environment.host+this.ressource,utilisateur);
    }

    public modifierContrat(id: number, utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${environment.host+this.ressource}/${id}`,utilisateur);
    }

    public supprimerContrat(id: number):Observable<any>{
      return this.http.delete(`${environment.host+this.ressource}/${id}`);
    }
}
