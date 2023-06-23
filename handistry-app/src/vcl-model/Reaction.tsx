/*------------
   IMPORTS
------------*/
import { calculateEnthalpyRxn,
         calculateEntropyRxn,
         calculateEquilibriumK,
         calculateGibbsFreeEnergy } from '../utilities/calculators';
import { Chemical } from './Chemical';

/*
TL;DR: The base class for all Reactions
This class represents a chemical reaction (i.e., transformation from reagents to products)
It also contains key information about the reaction.
*/
export class Reaction {

    //----- FIELDS -----//
    private name: string;                               // [string] Reaction's name
    private reactants: Map<string, [Chemical, number]>; // Map<reactant's name, [reactant Chemical, stoich. coeff.]
    private products: Map<string, [Chemical, number]>;  // Map<product's name, [product Chemical, stoich. coeff.]
    private equilibriumK: number;                       // [number] Dimensionless equilibrium constant
    private gibbsFreeRxn: number;                       // [number] Standard gibbs free energy of reaction in kJ/mol
    private enthalpyRxn: number;                        // [number] Standard enthalpy of reaction in kJ/mol
    private entropyRxn: number;                         // [number] Standard entropy of reaction in J/mol-K
    private temperature: number;                        // [number] Standard temperature (default is 298.15 K)
    private activationE: number;                        // [number] Activation energy in joules (J)

    //----- CONSTRUCTOR -----//
    public constructor(n: string,
                       rxnReactants: Map<string, [Chemical, number]>,
                       rxnProducts: Map<string, [Chemical, number]>,
                       T: number,
                       Ea: number) {
        this.name = n;
        this.reactants = rxnReactants;
        this.products = rxnProducts;
        this.enthalpyRxn = calculateEnthalpyRxn(rxnReactants, rxnProducts);
        this.entropyRxn = calculateEntropyRxn(rxnReactants, rxnProducts);
        this.temperature = T;
        this.gibbsFreeRxn = calculateGibbsFreeEnergy(this.enthalpyRxn, this.entropyRxn, this.temperature);
        this.equilibriumK = calculateEquilibriumK(this.gibbsFreeRxn);
        this.activationE = Ea;
    }
        
    //----- GETTERS -----//
    public getName() { return this.name; }
    public getReactants() { return this.reactants; }
    public getProducts() { return this.products;}
    public getK() { return this.equilibriumK;}
    public getH() { return this.enthalpyRxn;}
    public getS() { return this.entropyRxn; }
    public getT() { return this.temperature }
    public getEa() { return this.activationE; }

    //------ SETTERS ------//
    public setK(newK: number) { this.equilibriumK = newK; }
    public setH(newH: number) { this.enthalpyRxn = newH; }
    public setS(newS: number) { this.entropyRxn = newS; }
}
