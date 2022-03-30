import {Dossier} from "./Dossier.model";


export interface Nature {
  id: number;
  libelleNature: string;
  dossier:Dossier;
}
