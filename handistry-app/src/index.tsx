import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import CHEMICAL_LIST from './vcl-features/LoadChemicals';
import REACTION_LIST from './vcl-features/LoadReactions';
import { addReactions } from './calculators/calculators';


//---------TESTING-----------
CHEMICAL_LIST.forEach((value, key) => {
  console.log(value);
});

for(let i = 0; i < REACTION_LIST.length; i++) {
  console.log(REACTION_LIST[i]);
  console.log(REACTION_LIST[i].getReactants());
  console.log(REACTION_LIST[i].getProducts());
}

let trial_add_reaction = addReactions(REACTION_LIST[0], REACTION_LIST[0]);
console.log(trial_add_reaction);
console.log(trial_add_reaction.getReactants());
console.log(trial_add_reaction.getProducts());

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
