/*------------
   IMPORTS
------------*/
import { Chemical } from '../vcl-model/Chemical';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';

/* Adds new chemicals to a pre-existing Chemical map */
export function AddChemical(originalChemicals: Map<string, Chemical>, newChemicals: Chemical[]) {
    newChemicals.forEach( (chemical) => {
        originalChemicals.set(chemical.name, chemical)
    });
    return originalChemicals;
}

/* 
Given a list of chemical formulae and their respective stoichiometric coefficients,
Returns a stoichiometric Chemical map where:
    key = chemical formula
    value = pair<Chemical instance, stoichiometric coefficient>
*/
export function toStoichChemicalMap(formulaData: string[], stoichData: number[]) {
    let chemicalList: Map<string, [Chemical, number]> = new Map();
    for (let i = 0; i < formulaData.length; i++) {
        let chemical = CHEMICAL_LIST.get(formulaData[i]);
        if (chemical !== undefined) {
            chemicalList.set(formulaData[i], [chemical, stoichData[i]]);
        }
    }
    return chemicalList;
}

/* 
Given 2 pre-existing stoichiometric Chemical maps
Returns a combination of the two (used when adding reactions)
*/
export function addStoichChemicalMap(map1: Map<string, [Chemical, number]>, map2: Map<string, [Chemical, number]>) {
    let newStoichChemicalMap : Map<string, [Chemical, number]> = window.structuredClone(map1);
    map1.forEach((value: [Chemical, number], key: string) => {
        newStoichChemicalMap.set(key, value);
    });
    map2.forEach((value: [Chemical,number], key: string) => {
        if (newStoichChemicalMap.has(key)) {
            //@ts-ignore
            newStoichChemicalMap.get(key)[1] += map2.get(key)[1];
        }
        else newStoichChemicalMap.set(key, value);
    });
    return newStoichChemicalMap;
}
