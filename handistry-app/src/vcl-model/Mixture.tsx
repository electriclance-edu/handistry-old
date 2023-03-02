import {Chemical} from './Chemical';
import {Reaction} from './Reaction';
import REACTION_LIST from '../vcl-features/LoadReactions';
import { addReactions } from '../calculators/calculators';
import * as tf from '@tensorflow/tfjs';
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
    public updateChemicals(new_chemical: Chemical, v: number): void { 
        if (this.chemicals.get(new_chemical.formula) === undefined) {
            console.log("new chemical added to mixture");
            this.chemicals.set(window.structuredClone(new_chemical.formula), window.structuredClone(new_chemical));            
        }
        else {
            //@ts-ignore
            let old_moles = window.structuredClone(this.chemicals.get(new_chemical.formula).moles);
            console.log("old moles: " + old_moles);
            //@ts-ignore
            this.chemicals.get(new_chemical.formula).moles = old_moles + window.structuredClone(new_chemical.moles);  
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
                console.log("got new reaction");
                console.log(reaction);
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

        
        function k_equation(x: number) {
            let k_numerator_str = "";
            let k_denominator_str = "";
            let k_numerator = 1;
            let k_denominator = 1;
            mixture_reaction.getProducts().forEach((value: [Chemical, number], key: string) => {
               if (value[0].phase === "aq" || value[0].phase === "g") {
                    k_numerator *= ((value[0].moles/volume) + (value[1]*x)/volume)**value[1];
                    k_numerator_str += "[" + value[0].formula.toString() + " + " + value[1].toString() + "x" + "]" + "^" + value[1].toString();
               } else {k_numerator *= 1;}
            });
            mixture_reaction.getReactants().forEach((value: [Chemical, number], key: string) => {
                if (value[0].phase === "aq" || value[0].phase === "g") {
                     k_denominator *= ((value[0].moles/volume) - (value[1]*x)/volume)**value[1];
                     k_numerator_str += "[" + value[0].formula.toString() + " + " + value[1].toString() + "x" + "]" + "^" + value[1].toString();
                } else {k_denominator *= 1;}
             });
            // console.log("k_numerator : " + k_numerator); //-> uncoment for debugging
            // console.log("k_denominator : " + k_denominator); //-> uncoment for debugging
            // console.log("k_equation: " + mixture_reaction.getK().toString() + "=" + k_numerator_str + " / " + k_denominator_str); //-> uncoment for debugging
            return k_numerator - mixture_reaction.getK()*k_denominator; //eq expression - k_value
        }

        // function f(x: number) {return x**2 - 1E-14;} //-> uncomment for debugging NR method
        // function fp(x:number) {return 2*x;} //-> uncomment for debugging NR method

        let moles_x = nr(k_equation, 1E-10, { //1E-10 is an arbitrary choice for first mole amt. to be searched
            "maxIterations": 100,
            "verbose": true,
        });
        if (moles_x === false) {moles_x = 0;}
        // console.log("moles_x: " + moles_x); //-> uncomment for debugging

        mixture_reaction.getProducts().forEach((value: [Chemical, number], key: string) => {
            let added_product : Chemical = {
                "name": window.structuredClone(value[0].name),
                "formula": window.structuredClone(value[0].formula),
                "phase": window.structuredClone(value[0].phase),
                "molarMass": window.structuredClone(value[0].molarMass),
                "charge": window.structuredClone(value[0].charge),
                "enthalpyForm": window.structuredClone(value[0].enthalpyForm),
                "entropyForm": window.structuredClone(value[0].entropyForm),
                "moles": window.structuredClone(value[1]) * moles_x
            }
            this.updateChemicals(added_product, 0);
        });
        mixture_reaction.getReactants().forEach((value: [Chemical, number], key: string) => {
            let added_reactant : Chemical = {
                "name": window.structuredClone(value[0].name),
                "formula": window.structuredClone(value[0].formula),
                "phase": window.structuredClone(value[0].phase),
                "molarMass": window.structuredClone(value[0].molarMass),
                "charge": window.structuredClone(value[0].charge),
                "enthalpyForm": window.structuredClone(value[0].enthalpyForm),
                "entropyForm": window.structuredClone(value[0].entropyForm),
                "moles": window.structuredClone(-value[1]) * moles_x
            }
            this.updateChemicals(added_reactant, 0);
        });
    }


    // GETTER FUNCTIONS
    public getChemicals() { return this.chemicals; }
    public getVolume() { return this.volume; }
}
