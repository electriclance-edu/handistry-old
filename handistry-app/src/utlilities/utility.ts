import {Chemical} from '../vcl-model/Chemical';
 
export interface Dictionary<T> {
    [Key: string]: T;
}
export function AddChemical(d: Map<string, Chemical>, l: Chemical[]) {
    l.forEach( (chemical) => {
        d.set(chemical.name, chemical)
    });
    return d;
}
