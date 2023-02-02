import {Dictionary} from '../utlilities/utility';
import {Chemical} from './Chemical';

export class Reaction {

    private reactants: Map<string, Chemical>;
    private products: Map<string, Chemical>;
    private equation: Map<string, number>; 
    private equilibriumK: number;
    private enthalpyRxn: number;
    private entropyRxn: number;
    private temperature: number;
    private activationE: number;

    // CONSTRUCTOR
    public constructor(rxnReactants: Map<string, Chemical>, rxnProducts: Map<string, Chemical>, eq: Map<string, number>, K: number, H: number, S: number, T: number, Ea: number) {
        this.reactants = rxnReactants;
        this.products = rxnProducts;
        this.equation = eq;
        this.equilibriumK = K;
        this.enthalpyRxn = H;
        this.entropyRxn = S;
        this.temperature = T;
        this.activationE = Ea;
    }
    
    // METHODS
    

    // GETTER FUNCTIONS
    public getReactants() {
        return this.reactants;
    }
    public getProducts() {
        return this.products;
    }
    public getK() {
        return this.equilibriumK;
    }
    public getH() {
        return this.enthalpyRxn;
    }
    public getS() {
        return this.entropyRxn;
    }
    public getT() {
        return this.temperature
    }
    public getEa() {
        return this.activationE;
    }
}