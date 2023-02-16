import {Chemical} from './Chemical';
import {Reaction} from './Reaction';
import REACTION_LIST from '../vcl-features/LoadReactions';
import { addStoichChemicalMap } from '../utlilities/utility';
import { addReactions } from '../calculators/calculators';

export class Mixture {

    private chemicals: Map<string, Chemical>;
    private volume: number; 

    // CONSTRUCTOR
    public constructor(chemicals: Map<string, Chemical>, volume: number) {
        this.chemicals = chemicals;
        this.volume = volume;
    }
    
    // METHODS
    public updateChemicals(new_chemical: Chemical, v: number) {
        if (this.chemicals.get(new_chemical.name) !== undefined) {
            // @ts-ignore 
            this.chemicals.get(new_chemical.name)?.moles += new_chemical.moles;  
        }
        else {
            this.chemicals.set(new_chemical.name, new_chemical);
        }
        this.volume += v;
    }

    public searchReactions() {
        let overall_reaction: Reaction;
        REACTION_LIST.forEach((reaction) => {
            let reaction_satisfied = true;
            reaction.getReactants().forEach((value: [Chemical, number], key: string) => {
                if (!this.chemicals.has(key)) { reaction_satisfied = false; }
            });
            if (reaction_satisfied && overall_reaction == null) {
                overall_reaction = reaction;
            }
            else if (reaction_satisfied && overall_reaction != null) {
                overall_reaction = addReactions(overall_reaction, reaction);
            }
        });     
        //@ts-ignore
        return overall_reaction; 
    }

    public reactChemicals() {
        let mixture_reaction: Reaction = this.searchReactions();
        // determine which reactant will be limiting reactant
        // construct equilibrium equation
        // solve equilibrium equation
    }


    // GETTER FUNCTIONS
    public getChemicals() { return this.chemicals; }
    public getVolume() { return this.volume; }
}
