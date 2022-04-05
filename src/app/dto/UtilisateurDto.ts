import {Departement} from "../model/Departement.model";

export class UtilisateurDto{
  id: number;
  nom: string;
  prenom: string;
  dateDeNaissance: Date;
  sexe: string;
  telephone: string;
  matricule: string;
  photo: string;
  cin: string;
  salaire: number;
  dateEmbauche: Date;
  situationMatri: string;
  nombreEnfant: number;
  nombreFemme: number;
  motDePasse: string;
  adresse: string;
  email: string;
  departement: Departement;
  etat: boolean;

}
