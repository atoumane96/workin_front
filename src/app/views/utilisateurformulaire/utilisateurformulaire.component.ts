import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DepartementService} from "../../services/departement.service";
import {Departement} from "../../model/Departement.model";
import {UtilisateurService} from "../../services/utilisateur.service";
import {TypeContratService} from "../../services/typeContrat.service";
import {UtilisateurDto} from "../../dto/UtilisateurDto";
import {ContratDto} from "../../dto/ContratDto";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Utilisateur} from "../../model/Utilisateur.model";

declare var $:any;
@Component({
  selector: 'app-utilisateurformulaire',
  templateUrl: './utilisateurformulaire.component.html',
  styleUrls: ['./utilisateurformulaire.component.css']
})

export class UtilisateurformulaireComponent implements OnInit {
  step:any=1;
  private emailUtilisateurCree:string;
  private listeUtilisateur:Utilisateur[] = [];
  private imagePath: any;
  private imgURL: string | ArrayBuffer = "../../../assets/icone_file/user.png";
  private messagePhoto: string;
  private message: string;
  activeNombreFemme:boolean = false;
  listeDepartement:Departement[] = [];
  listeTypeContrat:any = [];
  userForm: FormGroup;
  submitted = false;
  photo:any = "";
  activeDatefin:boolean = null;
  showPatienter:boolean = false;



  constructor(private formBuilder: FormBuilder,
              private departementService:DepartementService,
              private utilisateurService:UtilisateurService,
              private typeContratService:TypeContratService,
              private route:Router) {

  }

  ngOnInit() {
    this.MyjsFunction();
    this.initForm();
    this.loadAllDepartement();
    this.loadAllTypeContrat();
    this.loadListeUtilisateur();
    $("#formulaire :input").prop("disabled", true);
  }


  initForm() {
    this.userForm = this.formBuilder.group({
        nom: ['',[Validators.required]],
        prenom: ['',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z0-9 ]*')]],
        login: ['', Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')],
        // pwd: ['', Validators.required,Validators.min(4)],//pwd= password
        // confirmpwd: ['', Validators.required],
        email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        salaire: ['',[Validators.required, Validators.minLength(2),Validators.pattern('[0-9]*')]],//pas encore coté HTML
        cin: ['',[Validators.required, Validators.minLength(13),Validators.maxLength(13),Validators.pattern('[0-9]*')]],//pas encore coté HTML
        nombreEnfant: ['',[Validators.required,Validators.min(0),Validators.pattern('[0-9]*')]], //pas encore coté HTML
        nombreFemme: ['',[Validators.required,Validators.min(0),Validators.pattern('[0-9]*')]], //pas encore coté HTML
        telephone: ['',[Validators.required,Validators.minLength(9),Validators.maxLength(9),Validators.pattern('[0-9]*')]], //pas encore coté HTML
        dateEmbauche: ['',[Validators.required]],
        dateDeNaissance: ['',[Validators.required]],
        date_fin: ['',[Validators.required]],
        type_contrat: ['',[Validators.required]],
        departement: ['',[Validators.required]],
        adresse: ['',[Validators.required]],
        matricule:['',[Validators.required]],
        sexe:['',[Validators.required]],
        photo:['',[Validators.required]],
        situationMatri:['',[Validators.required]],
        typeDeContrat:['',[Validators.required]],
        dateDebutContrat:['',[Validators.required]],
        dateFinContrat:['',[Validators.required]],
      },
    );
  }

  get f() { return this.userForm.controls; }

  onSubmitForm() {
    this.submitted = true;
    let formulaireData = new FormData();
    let data = this.userForm.value;
    let utilisateur = new UtilisateurDto();
    let contrat = new ContratDto();

    utilisateur.nom = data.nom;
    utilisateur.prenom = data.prenom;
    utilisateur.email = data.email;
    utilisateur.adresse = data.adresse;
    utilisateur.telephone = data.telephone;
    utilisateur.matricule = data.matricule;
    utilisateur.departement = data.departement;
    utilisateur.cin = data.cin;
    utilisateur.dateDeNaissance = data.dateDeNaissance;
    utilisateur.motDePasse = "";
    utilisateur.nombreEnfant = data.nombreEnfant;
    utilisateur.nombreFemme = data.nombreFemme;
    utilisateur.sexe = data.sexe;
    utilisateur.salaire = data.salaire;
    utilisateur.cin = data.cin;
    utilisateur.situationMatri = data.situationMatri;
    utilisateur.dateEmbauche = data.dateDebutContrat;

    contrat.dateDebut = data.dateDebutContrat;
    contrat.typeContrat = data.typeDeContrat;
    contrat.dateFin = data.dateFinContrat;
    contrat.numeroContrat = "";
    contrat.utilisateur = null;
    this.emailUtilisateurCree = data.email;

    if ( this.verifierUtilisateur(utilisateur,this.photo) ){

      if ( !this.verifierMatricule(utilisateur.matricule ) ){

        if ( !this.verifierCin(utilisateur.cin ) ){
            formulaireData.append('utilisateur', JSON.stringify(utilisateur));
            formulaireData.append('contrat', JSON.stringify(contrat));
            formulaireData.append('photo', this.photo);

            $("#formulaire :input").prop("disabled", true);

            this.showPatienter = true;
            this.utilisateurService.ajouterUtilisateur(formulaireData).subscribe(rsl => {
              this.showPatienter = false;
              this.alertSuccessUtilisateurCree();
              this.initForm();
              this.route.navigate(["/rh"]);
            },error =>{
              this.showPatienter = false;
              console.log(error)
            } )
            $("#formulaire :input").prop("disabled", false);

        }
      }
    }

  }


  onNext(){
    this.step= this.step + 1;
  }

  onPrevious(){
    this.step= this.step - 1;
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  MyjsFunction(){
    $('.modal').modal({
      dismissible:false,
      inDuration:1000,
      outDuration:1000
    });
    $('select').formSelect();
    $('.tabs').tabs();
  }

  loadAllDepartement(){
    this.departementService.getAllDepartement().subscribe(value => {
      this.listeDepartement = value;
    })
  }

  loadAllTypeContrat(){
    this.typeContratService.getAllTypeContrat().subscribe(value => {
      this.listeTypeContrat = value;
    })
  }

  loadListeUtilisateur(){
    this.utilisateurService.getAllUsers().subscribe(value => {
      this.listeUtilisateur = value;
    })
  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.photo = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.messagePhoto = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

    }
  }

  alertSuccessUtilisateurCree() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Utilisateur créé avecsuccess!'
            + '<br><br>'
            +'<label>Email : ' + this.emailUtilisateurCree + '</label>'
            +'<label>Mot de passe : passer </label>',
      showConfirmButton: true,
      confirmButtonColor:'green'
      //timer: 1500
    })
  }

   alertError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: this.message,
      showConfirmButton: true,
      confirmButtonColor:'red'
      //timer: 1500
    })
  }

  private verifierUtilisateur(user:UtilisateurDto,photo:any):boolean{

    let correct:boolean = true;
    if(user.nom == "" || user.prenom == ""){
       this.message = "Vérifier le nom ou prénom";
       correct = false;
       this.alertError();
    }

    if(user.sexe == ""){
      this.message = "Vous avez oublier de choisir le sexe";
      correct = false;
      this.alertError();
    }

    if(!user.nombreEnfant){
      this.message = "Vous avez oublier de mentionner le nombre d'enfant";
      correct = false;
      this.alertError();
    }

    if(user.telephone == ""){
      this.message = "Vous avez oublier de mentionner le numéro de téléphone";
      correct = false;
      this.alertError();
    }

    if(user.situationMatri == ""){
      this.message = "Vous avez oublier de choisir la situation matrimoniale";
      correct = false;
      this.alertError();
    }

    if(user.adresse == ""){
      this.message = "Vous avez oublier de choisir l'adresse";
      correct = false;
      this.alertError();
    }

    if(!user.departement){
      this.message = "Vous avez oublier de choisir un département";
      correct = false;
      this.alertError();
    }

    if(user.matricule == ""){
      this.message = "Vous avez oublier de choisir de mentionner la matricule";
      correct = false;
      this.alertError();
    }

    if(!user.dateDeNaissance){
      this.message = "Vous avez oublier de mentionner la date de naissance";
      correct = false;
      this.alertError();
    }

    if(!user.salaire){
      this.message = "Vous avez oublier de choisir de mentionner le salaire";
      correct = false;
      this.alertError();
    }

    if(user.cin == ""){
      this.message = "Vous avez oublier de choisir de mentionner le numéro de carte d'identité";
      correct = false;
      this.alertError();
    }

    if(!user.dateEmbauche){
      this.message = "Vous avez oublier de choisir de mentionner la date d'embauche";
      correct = false;
      this.alertError();
    }

    if(photo==""){
      this.message = "Vous avez oublier de choisir une photo de profil";
      correct = false;
      this.alertError();
    }
    return correct;
}

  private verifierMatricule(matricule:string):boolean{
    let existe:boolean = false;

    for(let i = 0; i < this.listeUtilisateur.length; i++){
      if (matricule == this.listeUtilisateur[i].matricule){
          existe = true;
      }
    }
    if(existe){
      this.message = "Cette matricule existe déja !!";
      this.alertError();
    }

    return existe;
  }

  private verifierCin(cin:string):boolean{
    let existe:boolean = false;

    for(let i=0; i < this.listeUtilisateur.length; i++){
      if (cin == this.listeUtilisateur[i].cin){
          existe = true;
      }
    }
    if(existe){
      this.message = "Cette numéro de carte d'identité existe déja !!";
      this.alertError();
    }

    return existe;
  }


}

