import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-utilisateurformulaire',
  templateUrl: './utilisateurformulaire.component.html',
  styleUrls: ['./utilisateurformulaire.component.css']
})
export class UtilisateurformulaireComponent implements OnInit {
  step:any=1;
  userForm: FormGroup;
  submitted = false;
  validiterForm=false;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.MyjsFunction();
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
        nom: ['',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z]*')]],
        prenom: ['',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z0-9 ]*')]],
        login: ['', Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')],
        pwd: ['', Validators.required,Validators.min(4)],//pwd= password
        confirmpwd: ['', Validators.required],
        email: ['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        salaire: ['', [Validators.required, Validators.minLength(2),Validators.pattern('[0-9]*')]],//pas encore coté HTML
        CNI: ['', [Validators.required, Validators.minLength(13),Validators.maxLength(13),Validators.pattern('[0-9]*')]],//pas encore coté HTML
        nb_enfant: ['', [Validators.required,Validators.min(0),Validators.pattern('[0-9]*')]], //pas encore coté HTML
        nb_femme: ['', [Validators.required,Validators.min(0),Validators.pattern('[0-9]*')]], //pas encore coté HTML
        telephone: ['',[Validators.required,Validators.minLength(9),Validators.maxLength(9),Validators.pattern('[0-9]*')]], //pas encore coté HTML
        sm: ['', Validators.required],
        date_embauche: ['', Validators.required],//pas encore coté HTML
        date_fin: ['', Validators.required], //pas encore coté HTML
        sexe: ['', Validators.required], //pas encore coté HTML
        type_contrat: ['', Validators.required], //pas encore coté HTML
        // contrat: ['', Validators.required],
        departement: ['', Validators.required], //pas encore coté HTML
        adresse: ['', Validators.required],//pas encore coté HTML
      },
      {
        validator: this.MustMatch('pwd', 'confirmpwd')
      });
  }

  get f() { return this.userForm.controls; }

  onSubmitForm() {
    this.submitted = true;

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

}
