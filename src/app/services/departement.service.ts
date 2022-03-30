import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departement } from '../model/Departement.model';
import { AppDataState, DataStateEnum } from '../state/state';
import { catchError, map, startWith } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

    ressource="/departement";
    departementLocal$: Observable<AppDataState<Departement[]>> | null = null;
    constructor(private http:HttpClient) {
      this.getDepartementsLocal();
    }
    
    public getAllDepartement():Observable<Departement[]>{
      let url=environment.host+this.ressource;
      return this.http.get<Departement[]>(url);   
    }
    getDepartementsLocal(){
      this.departementLocal$ = this.getAllDepartement().pipe(
        map(
          data =>
            ({ dataState: DataStateEnum.LOADED, data: data } as AppDataState<Departement[]>)
        ),
        startWith({ dataState: DataStateEnum.LOADING } as AppDataState<Departement[]>),
        catchError(err =>
          of({
            dataState: DataStateEnum.ERROR, errorMessage: err.message
          } as AppDataState<Departement[]>)));
    }

    public ajouterDepartement(departement: Departement):Observable<Departement>{
      return this.http.post<Departement>(environment.host+this.ressource,departement);
    }

    public modifierDepartement(id: number, departement: Departement):Observable<Departement>{
      return this.http.put<Departement>(`${environment.host+this.ressource}/${id}`,departement);    
    }

    public supprimerDepartement(id: number):Observable<any>{
      return this.http.delete(`${environment.host+this.ressource}/${id}`);
    }
}
