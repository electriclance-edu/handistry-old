/*------------
   IMPORTS
------------*/
import { toStoichChemicalMap } from '../utilities/utility';
import { Reaction } from '../vcl-model/Reaction';
import reactionJSON from '../vcl-features/reactions.json';

/*
TL;DR: This file generates the list of reactions available.
Given a JSON file ("reactionJSON"), generates a list representing the different chemicals
available for use in the virtual lab.

Returns REACTION_LIST: an array containing Reaction elements

Sample JSON Entry:
    {
        "name": "The Juice & Potion Miracle",
        "reactants"*: ["H2O(l)"],
        "reactantsStoich"*: [2],
        "products"*: ["ZeSTo(l)", "HeAlTh(l)"],
        "productsStoich"*: [1, 1],
        "K": 1,
        "Trxn": 273.15,
        "Erxn": 0.005        
    }

    * The order of stoich. coeffs. matter!
*/

let REACTION_LIST: Reaction[] = [];

for(let i=0; i<reactionJSON.length; i++) {
    let newReaction: Reaction = new Reaction(
        reactionJSON[i].name,
        toStoichChemicalMap(reactionJSON[i].reactants, reactionJSON[i].reactantsStoich),
        toStoichChemicalMap(reactionJSON[i].products, reactionJSON[i].productsStoich),
        reactionJSON[i].Trxn,
        reactionJSON[i].Erxn
    )
    REACTION_LIST.push(newReaction);
}

export default REACTION_LIST;