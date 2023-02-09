import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CHEMICAL_LIST from './vcl-features/LoadChemicals';
import REACTION_LIST from './vcl-features/LoadReactions';


//---------TESTING-----------
CHEMICAL_LIST.forEach((value, key) => {
  console.log(value);
});

for(let i = 0; i < REACTION_LIST.length; i++) {
  console.log(REACTION_LIST[i]);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
