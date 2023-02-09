import { toStoichChemicalMap } from '../utlilities/utility';
import { Reaction } from '../vcl-model/Reaction';
import {Chemical} from '../vcl-model/Chemical';
import CHEMICAL_LIST from './LoadChemicals';
import reactionJSON from '../vcl-features/reactions.json';

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