import {Chemical} from './Chemical';

export class Mixture {

    private chemicals: Map<string, Chemical>;
    private volume: number; 

    // CONSTRUCTOR
    public constructor(chemicals: Map<string, Chemical>, volume: number) {
        this.chemicals = chemicals;
        this.volume = volume;
    }
    
    // METHODS
    
    // GETTER FUNCTIONS
    public getChemicals() { return this.chemicals; }
    public getVolume() { return this.volume; }
}
