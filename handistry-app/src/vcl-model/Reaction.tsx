import { calculateEnthalpyRxn, calculateEntropyRxn, calculateEquilibriumK, calculateGibbsFreeEnergy } from '../calculators/calculators';
import {Chemical} from './Chemical';

export class Reaction {

    private name: string;
    private reactants: Map<string, [Chemical, number]>;
    private products: Map<string, [Chemical, number]>;
    private equilibriumK: number;
    private gibbsFreeRxn: number; //standard gibbs free energy
    private enthalpyRxn: number; //standard enthalpy
    private entropyRxn: number; //standard entropy
    private temperature: number;
    private activationE: number;

    // CONSTRUCTOR
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
    
    // METHODS
    

    // GETTER FUNCTIONS
    public getName() { return this.name; }
    public getReactants() { return this.reactants; }
    public getProducts() { return this.products;}
    public getK() { return this.equilibriumK;}
    public getH() { return this.enthalpyRxn;}
    public getS() { return this.entropyRxn; }
    public getT() { return this.temperature }
    public getEa() { return this.activationE; }

    // SETTER FUNCTIONS
    public setK(newK: number) { this.equilibriumK = newK; }
    public setH(newH: number) { this.enthalpyRxn = newH; }
    public setS(newS: number) { this.entropyRxn = newS; }
}
