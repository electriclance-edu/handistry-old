import { Mixture } from './Mixture';
import { Equipment } from './Equipment';

export class Glassware extends Equipment{

    private maxCap: number;
    private mixture: Mixture;
    private transferMethod: string;


    // CONSTRUCTOR
    public constructor(name: string,
                       spritePath: string,
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string) {
        super(name, spritePath);
        this.maxCap = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
    }
    
    // METHODS
    

    // GETTER FUNCTIONS
    public getMaxCap() { return this.maxCap; }
    public getMixture() { return this.mixture; }
    public getTransferMethod() { return this.transferMethod; }
}
