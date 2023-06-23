/*------------
   IMPORTS
------------*/
import { CONSTANTS } from './custom_constants';
import { Chemical } from '../vcl-model/Chemical';
import { Reaction} from '../vcl-model/Reaction';
import { addStoichChemicalMap } from './utility';

/*
This function uses the formula:
H_rxn = sum(coeff * H_f{product}) - sum(coeff * H_f{reactant})
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

/*
This function uses the formula:
S_rxn = sum(coeff * S_f{product}) - sum(coeff * S_f{reactant})
*/
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

/*
This function uses the formula:
dG = dH - tdS
*/
export function calculateGibbsFreeEnergy(enthalpy: number, entropy: number, temp: number) {
    return (enthalpy * (10 ** 3) - temp * entropy) * (10 ** -3); //dG = dH - TdS
}

/*
This function is uses the formula:
dG = -RTlnK ==> K = exp(dG/-RT)
*/
export function calculateEquilibriumK(stdGibbsEnergy: number) {
    return Math.exp(stdGibbsEnergy * (10**3) / -1 / CONSTANTS.R_energy /298.15);
}

/*
TL;DR: A function simulating Hess' Law
Given two reactions, returns a new Reaction instance that combines
the reactants and products of both.

QUIRKS:
- Cancellation between reactants and products hasn't been implemented yet.
- Reaction's temperature is defaulted to 298.15 (arbitrary choice)
- Activation energies are simply averaged (which isn't realistic, per se)
*/
export function addReactions(rxn1: Reaction, rxn2: Reaction) {
    let newReaction: Reaction = new Reaction(
        window.structuredClone(rxn1.getName()) + " + " + window.structuredClone(rxn2.getName()),
        addStoichChemicalMap(window.structuredClone(rxn1.getReactants()), window.structuredClone(rxn2.getReactants())),
        addStoichChemicalMap(window.structuredClone(rxn1.getProducts()), window.structuredClone(rxn2.getProducts())),
        298.15,
        (window.structuredClone(rxn1.getEa()) + window.structuredClone(rxn2.getEa()))/2
    );
    return newReaction;
}

