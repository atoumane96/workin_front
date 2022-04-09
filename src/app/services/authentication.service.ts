
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";
import {Utilisateur} from "../model/Utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host="";
  public authenticated=false;
  public authenticatedUser:Utilisateur =null;
  private users;

  constructor(private http: HttpClient) {
  }

  login(data):Observable<any> {

    return this.http.post(environment.host+'/auth/authenticate', data);

  }

  // logout1() {
  //   localStorage.removeItem('access_token');
  // }
  //
  // public get loggedIn(): boolean{
  //   return localStorage.getItem('access_token') !==  null;
  // }

  // register(login:string, password:string) {
  //
  //   return this.http.post<{access_token: string}>(environment.host+'/auth/authenticate', {login, password}).pipe
  //     (tap(res => {
  //       this.login(login, password)
  //       }
  //     ))
  // }

  /*****************************************************/

  // login1(username:string, password:string){
  //   let user;
  //   this.users.forEach(u=>{
  //     if(u.username===username && u.password===password){
  //       user=u;
  //     }
  //   })
  //   if(user){
  //     this.authenticated=true;
  //     this.authenticatedUser=user;
  //     localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));
  //
  //   }
  //   else{
  //     this.authenticated=false;
  //   }
  // }

  loadUser(){
    let user=localStorage.getItem('authenticatedUser');
    if(user){
      this.authenticatedUser=JSON.parse(user);
      this.authenticated=true;
    }
  }

  // isAdmin(){
  //   if(this.authenticatedUser){
  //     return this.authenticatedUser.roles.indexOf("ADMIN")>-1;
  //   }
  //   else return false;
  // }

  isAuthenticated(){
    this.loadUser();
    if(this.authenticatedUser){
      this.authenticated = true;
    }
     return this.authenticated;
  }

  logout(){
    this.authenticated=false;
    this.authenticatedUser=null;
    localStorage.removeItem('authenticatedUser');
  }

  getDepartement() {
    this.loadUser();
    return this.authenticatedUser.departement.nomDepartement;
  }



}
