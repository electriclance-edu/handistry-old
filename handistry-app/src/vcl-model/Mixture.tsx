import {Chemical} from './Chemical';
import {Reaction} from './Reaction';
import REACTION_LIST from '../vcl-features/LoadReactions';
import { addStoichChemicalMap } from '../utlilities/utility';
import { addReactions } from '../calculators/calculators';
var nr = require('newton-raphson-method');

export class Mixture {

    private chemicals: Map<string, Chemical>;
    private volume: number; 

    // CONSTRUCTOR
    public constructor(chemicals: Map<string, Chemical>, volume: number) {
        this.chemicals = chemicals;
        this.volume = volume;
    }
    
    // METHODS
    public updateChemicals(new_chemical: Chemical, v: number): void { // returnz 

        if (this.chemicals.get(new_chemical.name) === undefined) {
            this.chemicals.set(new_chemical.name, new_chemical);            
        }
        else {
            //this code casues errors (fix) -> might be due to custom type property assignment
            //@ts-ignore
            this.chemicals.get(new_chemical.name)?.moles += new_chemical.moles;  
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
        const volume: number = this.getVolume();

        //numerator/products-side
        function k_equation(x: number) {
            let k_numerator = 1;
            let k_denominator = 1
            mixture_reaction.getProducts().forEach((value: [Chemical, number]) => {
               if (value[0].phase in ['aq', 'g']) {
                    k_numerator *= (value[0].moles/volume) + (value[1]*x)/volume;
               }
            });
            mixture_reaction.getProducts().forEach((value: [Chemical, number]) => {
                if (value[0].phase in ['aq', 'g']) {
                     k_denominator *= (value[0].moles/volume) - (value[1]*x)/volume;
                }
             });
            return k_numerator/k_denominator - mixture_reaction.getK(); //eq expression - k_value
        }

        let moles_x = nr(k_equation, 0);
        this.chemicals.forEach((value: Chemical, key: string) => {
            if (key in mixture_reaction.getProducts()) {
                //@ts-ignore
                this.chemicals.get(key).moles += mixture_reaction.getProducts().get(key)[1] * moles_x;
            }
            if (key in mixture_reaction.getReactants()) {
                //@ts-ignore
                this.chemicals.get(key).moles -= mixture_reaction.getRectants().get(key)[1] * moles_x;
            }
        });
    }


    // GETTER FUNCTIONS
    public getChemicals() { return this.chemicals; }
    public getVolume() { return this.volume; }
}
