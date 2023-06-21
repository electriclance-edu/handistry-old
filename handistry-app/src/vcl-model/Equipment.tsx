/*
TL;DR: The basic class representing all Equipment
Parent class for Glassware
*/
export class Equipment {
    //----- FIELDS -----//
    private spritePath: string;     // [string] File path to equipment's sprite
    private name: string;           // [string] Name associated with equipment instance

    //----- CONSTRUCTOR -----//
    public constructor(name: string, spritePath: string) {
        this.spritePath = spritePath;
        this.name = name;
    }

    //----- GETTERS -----//
    public getSpritePath() { return this.spritePath; }
    public getName() { return this.name; }
}
