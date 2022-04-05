import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeArchive} from "../model/TypeArchive.model";
import {Utilisateur} from "../model/Utilisateur.model";
import {environment} from "../../environments/environment";




@Injectable({
  providedIn: 'root'
})
export class TypeArchiveService {

  ressource="/typearchive";
  constructor(private http:HttpClient) {
  }

  public getAllTypeArchive():Observable<TypeArchive[]>{
    return this.http.get<any>(environment.host + this.ressource + "/all");
  }

  public ajouterTypeArchive(typeArchive: TypeArchive):Observable<TypeArchive>{
    return this.http.post<TypeArchive>(environment.host + this.ressource + "/create",typeArchive);
  }

  public modifierTypeArchive(id: number, utilisateur: Utilisateur):Observable<Utilisateur>{
    return this.http.put<Utilisateur>(`${environment.host+this.ressource}/${id}`,utilisateur);
  }

  public supprimerTypeArchive(id: number):Observable<any>{
    return this.http.delete(`${environment.host+this.ressource}/${id}`);
  }
}
