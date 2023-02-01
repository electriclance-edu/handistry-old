import {Chemical} from '../vcl-model/Chemical';

let H2O: Chemical = {
    name: 'Water',
    formula: 'H2O',
    molarMass: 18.015,
    charge: 0,
}
let NaCl: Chemical = {
    name: 'Sodium chloride',
    formula: 'NaCl',
    molarMass: 58.44,
    charge: 0,
}

export let CHEMICAL_LIST: Chemical[] = [H2O, NaCl];
