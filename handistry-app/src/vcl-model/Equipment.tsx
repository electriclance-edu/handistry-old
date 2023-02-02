export class Equipment {

    private spritePath: string;
    private name: string;


    // CONSTRUCTOR
    public constructor(name: string, spritePath: string) {
        this.spritePath = spritePath;
        this.name = name;
    }
    
    // METHODS
    

    // GETTER FUNCTIONS
    public getSpritePath() { return this.spritePath; }
    public getName() { return this.name; }
}
