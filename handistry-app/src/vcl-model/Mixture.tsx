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
    public updateChemicals(new_chemical: Chemical, v: number): void { // use by invoking Mixture.setChemicals()

        if (this.chemicals.get(new_chemical.name) === undefined) {
            this.chemicals.set(new_chemical.formula, new_chemical);            
        }
        else {
            //this code casues errors (fix) -> might be due to custom type property assignment
            //@ts-ignore
            let old_moles = this.chemicals.get(new_chemical.formula).moles;
            //@ts-ignore
            this.chemicals.get(new_chemical.formula).moles = old_moles + new_chemical.moles;  
        }
        this.volume += v;
    }

    public searchReactions() {
        let overall_reaction: Reaction | null = null;
        REACTION_LIST.forEach((reaction) => {
            let reaction_satisfied = true;
            reaction.getReactants().forEach((value: [Chemical, number], key: string) => {
                if (!this.chemicals.has(key)) { reaction_satisfied = false; }
            });
            if (reaction_satisfied) console.log(reaction);
            if (reaction_satisfied && overall_reaction == null) {
                overall_reaction = reaction;
                
            }
            else if (reaction_satisfied && overall_reaction !== null) {
                overall_reaction = addReactions(overall_reaction, reaction);
                console.log("got reaction");
            }
        });     
        //@ts-ignore
        return overall_reaction; 
    }

    public reactChemicals(mixture_reaction: Reaction) {
        console.log(mixture_reaction);

        const volume: number = this.getVolume();

        //numerator/products-side
        function k_equation(x: number) {
            let k_numerator = 1;
            let k_denominator = 1
            mixture_reaction.getProducts().forEach((value: [Chemical, number], key: string) => {
               if (value[0].phase == "aq" || value[0].phase == "g") {
                    k_numerator *= (value[0].moles/volume) + (value[1]*x)/volume;
               } else {k_numerator *= (value[1]*x)/volume;}
            });
            mixture_reaction.getReactants().forEach((value: [Chemical, number], key: string) => {
                if (value[0].phase == "aq" || value[0].phase == "g") {
                     k_denominator *= (value[0].moles/volume) - (value[1]*x)/volume;
                } else {k_denominator *= (value[1]*x)/volume;}
             });
            return k_numerator - mixture_reaction.getK()*k_denominator; //eq expression - k_value
        }

        function f(x: number) {return (x-1) * (x+2);}
        function fp (x: number) { return (x - 1) + (x + 2); }

        let moles_x = nr(k_equation, 0);
        console.log("moles_x: " + moles_x);

        mixture_reaction.getProducts().forEach((value: [Chemical, number], key: string) => {
            let added_product : Chemical = {
                "name": value[0].name,
                "formula": value[0].formula,
                "phase": value[0].phase,
                "molarMass": value[0].molarMass,
                "charge": value[0].charge,
                "enthalpyForm": value[0].enthalpyForm,
                "entropyForm": value[0].entropyForm,
                "moles": value[1] * moles_x
            }
            this.updateChemicals(added_product, 0);
        });
        mixture_reaction.getReactants().forEach((value: [Chemical, number], key: string) => {
            let added_reactant : Chemical = {
                "name": value[0].name,
                "formula": value[0].formula,
                "phase": value[0].phase,
                "molarMass": value[0].molarMass,
                "charge": value[0].charge,
                "enthalpyForm": value[0].enthalpyForm,
                "entropyForm": value[0].entropyForm,
                "moles": -value[1] * moles_x
            }
            this.updateChemicals(added_reactant, 0);
        });
    }


    // GETTER FUNCTIONS
    public getChemicals() { return this.chemicals; }
    public getVolume() { return this.volume; }
}
