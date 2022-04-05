import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/Utilisateur.model';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

    ressource="/utilisateur";
    constructor(private http:HttpClient) {
    }

    public getAllUsers():Observable<Utilisateur[]>{
      // let host= environment.host;
      // let data=this.http.get<any>(`\${this.host}+this.ressource/all`);
      // console.log(data)
      return this.http.get<Utilisateur[]>(environment.host + this.ressource + "/all");
    }

  public bloquer(email:string):Observable<Utilisateur>{
    // let host= environment.host;
    // let data=this.http.get<any>(`\${this.host}+this.ressource/all`);
    // console.log(data)
    return this.http.get<Utilisateur>(environment.host + this.ressource + "/bloquer/" + email);
  }

  public debloquer(email:string):Observable<Utilisateur>{
    // let host= environment.host;
    // let data=this.http.get<any>(`\${this.host}+this.ressource/all`);
    // console.log(data)
    return this.http.get<Utilisateur>(environment.host + this.ressource + "/debloquer/" + email);
  }


  public getAllUserByEmail(email:string):Observable<Utilisateur>{
    let host= environment.host;
    let data=this.http.get<any>(`\${this.host}+this.ressource/all`);
    return this.http.get<Utilisateur>(`${environment.host + this.ressource +  "/search/email/" + email}`);
  }



    public ajouterUtilisateur(dataForm: FormData):Observable<FormData>{
      return this.http.post<FormData>(environment.host + this.ressource + "/create",dataForm);
    }

    public ModifierUtilisateur(id: number, utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${environment.host+this.ressource}/${id}`,utilisateur);
    }

    public supprimerUtilisateur(id: number):Observable<any>{
      return this.http.delete(`${environment.host+this.ressource}/${id}`);
    }
}
