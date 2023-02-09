import { CONSTANTS } from './custom_constants';
import { Chemical } from '../vcl-model/Chemical';

export function calculateEnthalpyRxn(reactants: Map<string, [Chemical, number]>, products: Map<string, [Chemical, number]>) {
    let calculatedEnthalpy: number = 0;

    products.forEach((value: [Chemical, number], key: string) => {
        calculatedEnthalpy += value[0].enthalpyForm;
    });
    reactants.forEach((value: [Chemical, number], key: string) => {
        calculatedEnthalpy -= value[0].enthalpyForm;
    });

    return calculatedEnthalpy;
}

export function calculateEntropyRxn(reactants: Map<string, [Chemical, number]>, products: Map<string, [Chemical, number]>) {
    let calculatedEntropy: number = 0;

    products.forEach((value: [Chemical, number], key: string) => {
        calculatedEntropy += value[0].entropyForm;
    });
    reactants.forEach((value: [Chemical, number], key: string) => {
        calculatedEntropy -= value[0].entropyForm;
    });

    return calculatedEntropy;
}

export function calculateGibbsFreeEnergy(enthalpy: number, entropy: number, temp: number) {
    return (enthalpy * (10 ** 3) - temp * entropy) * (10 ** -3); //dG = dH - TdS
}

export function calculateEquilibriumK(stdGibbsEnergy: number) {
    return Math.exp(stdGibbsEnergy * (10**3) / -1 / CONSTANTS.R_energy /298.15);
}