import {Mixture} from './Mixture';

export class Glassware {

    private maxCap: number;
    private mixture: Mixture;


    // CONSTRUCTOR
    public constructor(maxCap: number, mixture: Mixture) {
        this.maxCap = maxCap;
        this.mixture = mixture;
    }
    
    // METHODS
    

    // GETTER FUNCTIONS
    public getMaxCap() { return this.maxCap; }
    public getMixture() { return this.mixture; }
}
