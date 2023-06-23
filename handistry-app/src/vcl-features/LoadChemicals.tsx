/*------------
   IMPORTS
------------*/
import { Chemical } from '../vcl-model/Chemical';
import chemicalJSON from './chemicals.json';

/*
TL;DR: This file generates the list of chemicals available.
Given a JSON file ("chemicalJSON"), generates a map representing the different chemicals
available for use in the virtual lab.

Returns CHEMICAL_LIST: Map<string, Chemical>
key [string] = chemical's formula (see formula nomenclature standard in Chemical.tsx)
value [Chemical] = chemical instance

Sample JSON Entry:
    {
        "name": "L. Zesto Tetrapak",
        "formula": "ZeSTo(l)",
        "phase": "l",
        "molarMass": 20,
        "charge": -2,
        "enthalpyForm": -123.45,
        "entropyForm": 12.34,
        "color": {"r":255, "g":125, "b":50, "a":0.5}
    }

*/

let CHEMICAL_LIST: Map<string, Chemical> = new Map(); 

for(let i=0; i<chemicalJSON.length; i++) {
    let newChemical: Chemical = {
        name: chemicalJSON[i]['name'],
        formula: chemicalJSON[i]['formula'],
        phase: chemicalJSON[i]['phase'],
        molarMass: chemicalJSON[i]['molarMass'],
        charge: chemicalJSON[i]['charge'],
        enthalpyForm: chemicalJSON[i]['enthalpyForm'],
        entropyForm: chemicalJSON[i]['entropyForm'],
        moles: 0,
        color: chemicalJSON[i]['color']
    }
    CHEMICAL_LIST.set(newChemical.formula, newChemical); // CHEMICAL_LIST.set(newChemical.formula, newChemical);
}

export default CHEMICAL_LIST;
