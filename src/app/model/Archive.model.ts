import { TypeArchive } from "./TypeArchive.model";
import { Utilisateur } from "./Utilisateur.model";
import {Dossier} from "./Dossier.model";
import {Nature} from "./Nature.model";

export interface Archive{

    id: Number;
    dateArchivage: Date;
    numeroArchivage: string;
    nomFichier: string;
    etatFichier: boolean;
    urlFichier: string;
    utilisateur: Utilisateur;
    // dossier: Dossier;
    nature:Nature;



}
