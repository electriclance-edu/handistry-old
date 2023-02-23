import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import CHEMICAL_LIST from './vcl-features/LoadChemicals';
import REACTION_LIST from './vcl-features/LoadReactions';
import { addReactions } from './calculators/calculators';
import { Mixture } from './vcl-model/Mixture';
import { Chemical } from './vcl-model/Chemical';


//---------TESTING-----------
//initializing chemical_list from JSON file
console.log("Test A: initializing chemical_list from JSON file");
CHEMICAL_LIST.forEach((value, key) => {
  console.log(value);
});

//initializing reaction_list from JSON file
console.log("Test B: initializing reaction_list from JSON file");
for(let i = 0; i < REACTION_LIST.length; i++) {
  console.log(REACTION_LIST[i]);
  console.log(REACTION_LIST[i].getReactants());
  console.log(REACTION_LIST[i].getProducts());
}

//adding two reactions (ok)
console.log("Test C: adding two reactions");
let trial_add_reaction = addReactions(REACTION_LIST[0], REACTION_LIST[0]);
console.log(trial_add_reaction);
console.log(trial_add_reaction.getReactants());
console.log(trial_add_reaction.getProducts());

//updating mixture tests
let trial_mixture_chemicals = new Map<string, Chemical>;
//let trial_mixture = new Mixture(trial_mixture_chemicals, 0); -> this line causes errors (fix)
let test_chemical: Chemical = { //testing autoionization propagation of water in Mixture object
        "name": "L. water",
        "formula": "H2O",
        "phase": "l",
        "molarMass": 18.015,
        "charge": 0,
        "enthalpyForm": -285.83,
        "entropyForm": 69.91,
        "moles": 5.5509
};
//trial_mixture.updateChemicals(test_chemical, 100/1000); //volume in liters
console.log("Test D-1: mixture before update");


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
