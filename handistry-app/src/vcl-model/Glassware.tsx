/*------------
   IMPORTS
------------*/
import { Mixture } from './Mixture';
import { Equipment } from './Equipment';

/*
TL;DR: The basic class representing all Glassware
Will contain Mixtures (which itself consist of Chemicals)
*/
export class Glassware extends Equipment{
    //----- FIELDS -----//
    private maxCapacity: number;        // [number] The maximum capacity of the glassware in milliliters (mL)
    private mixture: Mixture;           // [Mixture] The mixture that the glassware holds
    private transferMethod: string;     // [string] A classification denoting how the mixture is transferred

    //----- CONSTRUCTOR -----//
    public constructor(name: string,
                       spritePath: string,
                       maskPath: string, // currently not being used
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string) {
        super(name, spritePath);
        this.maxCapacity = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
    }
    
    //----- METHODS -----//
    public transfer() { // add or call transfer methods here
        if (this.transferMethod == 'beaker') {}
    }

    //----- GETTERS -----//
    public getMaxCap() { return this.maxCapacity; }
    public getMixture() { return this.mixture; }
    public getTransferMethod() { return this.transferMethod; }
}
