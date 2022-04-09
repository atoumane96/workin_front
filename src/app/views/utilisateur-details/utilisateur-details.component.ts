import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Utilisateur} from "../../model/Utilisateur.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-utilisateur-details',
  templateUrl: './utilisateur-details.component.html',
  styleUrls: ['./utilisateur-details.component.css']
})
export class UtilisateurDetailsComponent implements OnInit {

  private emailUtilisateur:string = "";
  utilisateur:Utilisateur;
  userForm: FormGroup;

  constructor( private route: ActivatedRoute,
               private utilisateurService:UtilisateurService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.emailUtilisateur = params.email;
          this.utilisateurService.getAllUserByEmail(this.emailUtilisateur).subscribe(value => {

            this.utilisateur = value;

            if(this.utilisateur.photo == ""){
               this.utilisateur.photo = "../../../assets/icone_file/user.png";

            }else {
               this.utilisateur.photo = 'data:image/jpeg;base64,' + this.utilisateur.photo;
            }

          },error => {
            console.log(error);
          })
        }
      );

  }

}
