/*------------
   IMPORTS
------------*/
import { Chemical } from './Chemical';
import { Reaction } from './Reaction';
import { addReactions } from '../utilities/calculators';
import REACTION_LIST from '../vcl-features/LoadReactions';
var nr = require('newton-raphson-method');

/*
Converts RGB to HSL
Reference: https://www.30secondsofcode.org/js/s/rgb-to-hsl/
To-do: Transfer this to a calculator file
*/
const RGBToHSL = (r : number, g : number, b : number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return {
      h:60 * h < 0 ? 60 * h + 360 : 60 * h,
      s:100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      l:(100 * (2 * l - s)) / 2,
    };
};

/*
Converts HSL to RGB
Reference: https://www.30secondsofcode.org/js/s/hsl-to-rgb/
To-do: Transfer this to a calculator file
*/
const HSLToRGB = (h : number, s : number, l : number) => {
    s /= 100;
    l /= 100;
    const k = (n : number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
        r: 255 * f(0), 
        g: 255 * f(8), 
        b: 255 * f(4)
    };
};

/*
TL;DR: The base class for all Mixtures
This class represents a combination of chemicals
This shouldn't be misinterpreted as literal mixtures (i.e., excluding solutions)
For the purposes of this codebase, Mixtures is the umbrella term for any combination of chemicals
*/
export class Mixture {
    //----- FIELDS -----//
    private chemicals: Map<string, Chemical>;   // [Map] key = formula of chemical, value = Chemical instance
    private volume: number;                     // [number] Volume of the mixture in milliliters (mL)

    //----- CONSTRUCTOR -----//
    public constructor(chemicals: Map<string, Chemical>, volume: number) {
        this.chemicals = chemicals;
        this.volume = volume;
    }
    
    //----- METHODS -----//

    /* Adds a new chemical to the mixture's chemical field; Also updates volume */
    public updateChemicals(new_chemical: Chemical, v: number): void { 
        // If the chemical already exists in the mixture, then only add moles
        if (this.chemicals.get(new_chemical.formula) !== undefined) {
            let old_moles = window.structuredClone(this.chemicals.get(new_chemical.formula)?.moles);
            console.log("old moles: " + old_moles); // Debugging purposes
            let old_reference = this.chemicals.get(new_chemical.formula)?.moles;
            //@ts-ignore
            this.chemicals.get(new_chemical.formula).moles += window.structuredClone(new_chemical.moles); 
            console.log("New moles: " + this.chemicals.get(new_chemical.formula)?.moles);
        }

        // Otherwise, generate a new key-value pair in the Mixture's chemical map
        else {
            console.log("new chemical added to mixture"); // Debugging purposes
            this.chemicals.set(window.structuredClone(new_chemical.formula), window.structuredClone(new_chemical));           
        }
        this.volume += v;
    }

    /* Mixture's color update logic --> for lance to do */
    public calculateColor() {
        //// this code just gets the average of all colors without caring about ratios
        if (this.chemicals.size==0) return `rgba(0,0,0,0)`;
        let firstColor = this.chemicals.entries().next().value[1].color;
        let ave = {
            r:firstColor.r,
            g:firstColor.g,
            b:firstColor.b,
            a:firstColor.a,
        }

        var chemicalsIterator = this.chemicals.entries(); 

        for (var i = 1; i < this.chemicals.size; i++) {
            var color = chemicalsIterator.next().value[1].color;
            ave.r = ((ave.r / i) + color.r) / (i + 1);
            ave.g = ((ave.g / i) + color.g) / (i + 1);
            ave.b = ((ave.b / i) + color.b) / (i + 1)
            ave.a = ((ave.a / i) + color.a) / (i + 1);
        }

        if (firstColor.r != ave.r) {
            var tempHSL = RGBToHSL(ave.r, ave.g, ave.b);
            tempHSL.h += 5;
            tempHSL.s = 250;
            var tempRGB = HSLToRGB(tempHSL.h, tempHSL.s, tempHSL.l);
            ave.r = tempRGB.r;
            ave.g = tempRGB.g;
            ave.b = tempRGB.b;
            ave.a = 0.55;
        }

        return `rgba(${ave.r},${ave.g},${ave.b},${ave.a})`;

        //// this code is the old code that works wherein it just gets the first color
        // let color = this.chemicals.entries().next().value[1].color;
        // return `rgba(${color.r},${color.g},${color.b},${color.a})`;

        //// this code tries to get the average of colors depending on how many moles tehre are
        //// all this code doesnt work because moles internally arent being updated, once they are, uncomment this
        // var totalMoles = 0;
        // var chemicalsIterator = this.chemicals.entries(); 
        // for (var i = 1; i < this.chemicals.size; i++) {
        //     var moles = chemicalsIterator.next().value[1].moles;
        //     totalMoles += moles;
        // }
        // console.log(totalMoles);

        // let firstColor = this.chemicals.entries().next().value[1].color;
        // let ave = {
        //     r:0,
        //     g:0,
        //     b:0,
        //     a:0,
        // }
        // chemicalsIterator = this.chemicals.entries(); 

        // for (var i = 1; i < this.chemicals.size; i++) {
        //     var nextChemical = chemicalsIterator.next().value[1];
        //     console.log(nextChemical.moles);
        //     ave.r += nextChemical.color.r * (nextChemical.moles / totalMoles);
        //     ave.g += nextChemical.color.g * (nextChemical.moles / totalMoles);
        //     ave.b += nextChemical.color.b * (nextChemical.moles / totalMoles);
        //     ave.a += nextChemical.color.a * (nextChemical.moles / totalMoles);
        // }

        // return `rgba(${ave.r},${ave.g},${ave.b},${ave.a})`;
    }

    /* Given the current mixture chemical composition, searches for possible reaction/s to occur */
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
        return overall_reaction; 
    }

    // Propagates the mixture's chemical composition through a given reaction
    // Uses the Newton-Raphson method for numerical approximation of the k_equation (ICE)
    public reactChemicals(mixture_reaction: Reaction) {
        console.log(mixture_reaction);

        const volume: number = this.getVolume();

        // Equilibrium equation representing ICE table 
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
                     k_denominator_str += "[" + value[0].formula.toString() + " + " + value[1].toString() + "x" + "]" + "^" + value[1].toString();
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
                "moles": window.structuredClone(value[1]) * moles_x,
                "color": window.structuredClone(value[0].color)
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
                "moles": window.structuredClone(-value[1]) * moles_x,
                "color": window.structuredClone(value[0].color)
            }
            this.updateChemicals(added_reactant, 0);
        });
    }


    //----- GETTERS -----//
    public getChemicals() { return this.chemicals; }
    public getVolume() { return this.volume; }
}
