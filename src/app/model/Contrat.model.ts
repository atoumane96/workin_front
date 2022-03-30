import { TypeContrat } from "./TypeContrat.model";
import { Utilisateur } from "./Utilisateur.model";

export interface Contrat{
    id: number;
    dateDebut: Date;
    dateFin: Date;
    numeroContrat: string;
    typeContrat: TypeContrat;
    utilisateur: Utilisateur;
}
