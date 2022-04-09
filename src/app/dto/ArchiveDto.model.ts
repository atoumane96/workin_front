
import {Nature} from "../model/Nature.model";
import {Utilisateur} from "../model/Utilisateur.model";

export class ArchiveDto{

   nomFichier: string;
   extension:string;
   utilisateur:Utilisateur;
   nature:Nature;



}
