export class Equipment {

    private spritePath: string;
    private name: string;
    private xpos: number
    private ypos: number;

    // CONSTRUCTOR
    public constructor(name: string, spritePath: string, x: number, y: number) {
        this.spritePath = spritePath;
        this.name = name;
        this.xpos = x;
        this.ypos = y;
    }
    
    // METHODS
    

    // GETTER FUNCTIONS
    public getSpritePath() { return this.spritePath; }
    public getName() { return this.name; }
    public getX() { return this.xpos; }
    public getY() { return this.ypos; }
    
}
