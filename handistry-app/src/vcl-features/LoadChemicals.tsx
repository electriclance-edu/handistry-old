import {Chemical} from '../vcl-model/Chemical';
import chemicalJSON from './chemicals.json';

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
    }
    CHEMICAL_LIST.set(newChemical.formula, newChemical);
}

export default CHEMICAL_LIST;
