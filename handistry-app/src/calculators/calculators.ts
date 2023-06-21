/*------------
   IMPORTS
------------*/
import { CONSTANTS } from './custom_constants';
import { Chemical } from '../vcl-model/Chemical';
import { Reaction} from '../vcl-model/Reaction';
import { addStoichChemicalMap } from '../utlilities/utility';
var nr = require('newton-raphson-method');

/*

*/
export function calculateEnthalpyRxn(reactants: Map<string, [Chemical, number]>, products: Map<string, [Chemical, number]>) {
    let calculatedEnthalpy: number = 0;

    products.forEach((value: [Chemical, number], key: string) => {
        calculatedEnthalpy += value[0].enthalpyForm * value[1];
    });
    reactants.forEach((value: [Chemical, number], key: string) => {
        calculatedEnthalpy -= value[0].enthalpyForm * value[1];
    });

    return calculatedEnthalpy;
}

export function calculateEntropyRxn(reactants: Map<string, [Chemical, number]>, products: Map<string, [Chemical, number]>) {
    let calculatedEntropy: number = 0;

    products.forEach((value: [Chemical, number], key: string) => {
        calculatedEntropy += value[0].entropyForm * value[1];
    });
    reactants.forEach((value: [Chemical, number], key: string) => {
        calculatedEntropy -= value[0].entropyForm * value[1];
    });

    return calculatedEntropy;
}

export function calculateGibbsFreeEnergy(enthalpy: number, entropy: number, temp: number) {
    return (enthalpy * (10 ** 3) - temp * entropy) * (10 ** -3); //dG = dH - TdS
}

export function calculateEquilibriumK(stdGibbsEnergy: number) {
    return Math.exp(stdGibbsEnergy * (10**3) / -1 / CONSTANTS.R_energy /298.15);
}

export function addReactions(rxn1: Reaction, rxn2: Reaction) {
    let newReaction: Reaction = new Reaction(
        window.structuredClone(rxn1.getName()) + " + " + window.structuredClone(rxn2.getName()),
        addStoichChemicalMap(window.structuredClone(rxn1.getReactants()), window.structuredClone(rxn2.getReactants())),
        addStoichChemicalMap(window.structuredClone(rxn1.getProducts()), window.structuredClone(rxn2.getProducts())),
        298.15,
        (window.structuredClone(rxn1.getEa()) + window.structuredClone(rxn2.getEa()))/2 //not accurate, just averaging activation energies
    );
    // newReaction.setK(rxn1.getK() * rxn2.getK());
    // newReaction.setH(rxn1.getH() + rxn2.getH());
    // newReaction.setS(rxn1.getS() + rxn2.getS());
    return newReaction;
}

