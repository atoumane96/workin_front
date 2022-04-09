import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/Utilisateur.model';
import {Archive} from "../model/Archive.model";
import {FormGroup} from "@angular/forms";
import {TypeArchive} from "../model/TypeArchive.model";



@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  public dataForm:  FormGroup;
  ressource="/archive";
  // ressource2="/typearchive"

    constructor(private http:HttpClient) {
    }
  //
  // public getAllTypeArchive():Observable<TypeArchive[]>{
  //   return this.http.get<any>(environment.host + this.ressource2 + "/all");
  // }

    public ajouterArchive(formData: FormData):Observable<any>{
      return this.http.post<FormData>(environment.host + this.ressource + "/create",formData);
    }

    public modifierArchive(id: number, utilisateur: Utilisateur):Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${environment.host+this.ressource}/${id}`,utilisateur);
    }

    public supprimerArchive(id: number):Observable<any>{
      return this.http.delete(environment.host + this.ressource + "/delete/"+id);
    }

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  public getAllFichiersByDossierNatureAndTypeArchive(dossier:string,nature:string,typeArchive:string ):Observable<Archive>{

    return this.http.get<Archive>(`${environment.host + this.ressource + "/" + typeArchive + "/" + dossier + "/" + nature}`);

  }

}
