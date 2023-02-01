import {AddChemical} from '../utlilities/utility';
import {Reaction} from '../vcl-model/Reaction';
import {Chemical} from '../vcl-model/Chemical';
import {CHEMICAL_LIST} from './FeaturedChemicals';

const rxn1 = new Reaction(
    AddChemical(new Map<string, Chemical>(), CHEMICAL_LIST),
    AddChemical(new Map<string, Chemical>(), CHEMICAL_LIST),
    1,
    1,
    1,
    1,
    1
)

export let REACTION_LIST: Reaction[] = [rxn1];