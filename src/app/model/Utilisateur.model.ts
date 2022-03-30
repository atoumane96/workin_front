import { Departement } from "./Departement.model";

export interface Utilisateur{
    id: Number;
    nom: String;
    prenom: String;
    dateDeNaissance: Date;
    sexe: String;
    telephone: String;
    matricule: String;
    photo: String;
    cin: String;
    salaire: Number;
    dateEmbauche: Date;
    situationMatri: String;
    nombreEnfant: Number;
    nombreFemme: Number;
    motDePasse: String;
    adresse: String;
    email: String;
    departement: Departement;
    etat: Boolean;

}