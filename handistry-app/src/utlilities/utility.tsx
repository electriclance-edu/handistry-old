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

export function addStoichChemicalMap(map1: Map<string, [Chemical, number]>, map2: Map<string, [Chemical, number]>) {
    let newStoichChemicalMap : Map<string, [Chemical, number]> = map1;
    map2.forEach((value: [Chemical,number], key: string) => {
        if (newStoichChemicalMap.has(key)) {
            //@ts-ignore
            newStoichChemicalMap.get(key)[1] += map2.get(key)[1];
        }
        else {
            newStoichChemicalMap.set(key, value);
        }
    });
    return newStoichChemicalMap;
}
