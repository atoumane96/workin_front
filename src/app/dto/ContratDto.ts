import {TypeContrat} from "../model/TypeContrat.model";
import {Utilisateur} from "../model/Utilisateur.model";

export class ContratDto{
  id: number;
  dateDebut: Date;
  dateFin: Date;
  numeroContrat: string;
  typeContrat: TypeContrat;
  utilisateur: Utilisateur;
}
