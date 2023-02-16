import { Mixture } from './Mixture';
import { Equipment } from './Equipment';

export class Glassware extends Equipment{

    private maxCapacity: number;
    private mixture: Mixture;
    private transferMethod: string;


    // CONSTRUCTOR
    public constructor(name: string,
                       spritePath: string,
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string) {
        super(name, spritePath, 0, 0); //0, 0 => x, y position of glassware in UI (?)
        this.maxCapacity = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
    }
    
    // METHODS
    public transfer() { //add/call transfer methods here
        if (this.transferMethod == 'beaker') {}
    }

    // GETTER FUNCTIONS
    public getMaxCap() { return this.maxCapacity; }
    public getMixture() { return this.mixture; }
    public getTransferMethod() { return this.transferMethod; }
}
