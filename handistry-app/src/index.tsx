import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CHEMICAL_LIST from './vcl-features/LoadChemicals';
import REACTION_LIST from './vcl-features/LoadReactions';
import { addReactions } from './utilities/calculators';
import { Mixture } from './vcl-model/Mixture';
import { Chemical } from './vcl-model/Chemical';
import { Reaction } from './vcl-model/Reaction';


//---------TESTING-----------
// initializing chemical_list from JSON file - OK
// console.log("Test A: initializing chemical_list from JSON file");
// CHEMICAL_LIST.forEach((value, key) => {
//   console.log(key);
//   console.log(value);
// });

//initializing reaction_list from JSON file - OK
// console.log("Test B: initializing reaction_list from JSON file");
// for(let i = 0; i < REACTION_LIST.length; i++) {
//   console.log(REACTION_LIST[i]);
//   console.log(REACTION_LIST[i].getReactants());
//   console.log(REACTION_LIST[i].getProducts());
// }

// //adding two reactions - OK
// console.log("Test C: adding two reactions");
// let rxn1 = REACTION_LIST[0];
// console.log(rxn1);
// let rxn2 = REACTION_LIST[1];
// console.log(rxn2);
// let comb_rxn = addReactions(rxn1, rxn2);
// console.log(comb_rxn);

// //updating mixture tests
// let trial_mixture_chemicals = new Map<string, Chemical>;
// let trial_mixture = new Mixture(trial_mixture_chemicals, 0);
// console.log(trial_mixture.getChemicals());
// let test_chemical: Chemical = { //testing autoionization propagation of water in Mixture object
//         "name": "L. water",
//         "formula": "H2O(l)",
//         "phase": "l",
//         "molarMass": 18.015,
//         "charge": 0,
//         "enthalpyForm": -285.83,
//         "entropyForm": 69.91,
//         "moles": 5.5509,
//         "color": "rgba(0,0,0,0.5)"
// };
// trial_mixture.updateChemicals(test_chemical, 100/1000); //volume in liters
// console.log("Test D-1: mixture before reaction");
// console.log(trial_mixture.getChemicals());

// console.log("Test D-1: mixture after reaction");
// //@ts-ignore
// let k: Reaction = trial_mixture.searchReactions();
// console.log("found this reaction:");
// console.log(k);
// trial_mixture.reactChemicals(k);
// console.log(trial_mixture.getChemicals());

//-------END OF TESTING------

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);  
// reportWebVitals(console.log);
