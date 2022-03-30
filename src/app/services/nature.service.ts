import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Nature} from "../model/Nature.model";

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  ressource="/nature";
  constructor(private http:HttpClient) {
  }


  public ajouterNature(nature:Nature):Observable<any>{
    return this.http.post<Nature>(environment.host + this.ressource + "/create",nature);
  }


  public getAllNature():Observable<Nature>{
    return this.http.get<Nature>(environment.host + this.ressource +  "/all");
  }

  public getAllNatureByTypeArchiveAndDossier(dossier:string,typeArchive:string):Observable<Nature>{
    return this.http.get<Nature>(environment.host + this.ressource +  "/" + typeArchive + "/" + dossier);
  }



}
