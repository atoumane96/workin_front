import {Departement} from "./Departement.model";

export interface TypeArchive{
    id: number;
    libelleTypeArchive: string;
    departement:Departement;
}
