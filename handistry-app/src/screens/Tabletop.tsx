/*------------
   IMPORTS
------------*/
import React from 'react';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import Draggable from '../components/Draggable';
import Glassware from '../components/Glassware';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import { Mixture } from '../vcl-model/Mixture';
import '../styles/style.css';

// The Tabletop screen which acts as main working area.
function Tabletop() {
    return (
        <div>
            <h1>Reaction Table Screen</h1>
            <p>we are children of screen :D</p>
            <p>Hello</p>

            
        </div>
    );
}

export default Tabletop;