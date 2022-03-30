import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Dossier} from "../model/Dossier.model";
import {Archive} from "../model/Archive.model";
import {Nature} from "../model/Nature.model";


@Injectable({
  providedIn: 'root'
})
export class DossierService {

    ressource="/dossier";
    constructor(private http:HttpClient) {
    }


  public ajouterDossier(dossier:Dossier):Observable<any>{
    return this.http.post<Dossier>(environment.host + this.ressource + "/create",dossier);
  }


  public getAllDossierByType(typeDossier:string):Observable<Dossier>{

    return this.http.get<Dossier>(`${environment.host + this.ressource +  "/search/typeArchive/" + typeDossier}`);
  }


}
