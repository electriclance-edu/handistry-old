import { stringify } from 'querystring';
import { Chemical } from '../vcl-model/Chemical';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
 
export interface Dictionary<T> {
    [Key: string]: T;
}
export function AddChemical(d: Map<string, Chemical>, l: Chemical[]) {
    l.forEach( (chemical) => {
        d.set(chemical.name, chemical)
    });
    return d;
}

export function toStoichChemicalMap(formulaData: string[], stoichData: number[]) {
    let chemicalList: Map<string, [Chemical, number]> = new Map();

    for (let i = 0; i < formulaData.length; i++) {
        let chemical = CHEMICAL_LIST.get(formulaData[i]);
        if (chemical != undefined) {
            chemicalList.set(formulaData[i], [chemical, stoichData[i]]);
        }
    }
    
    return chemicalList;
}
