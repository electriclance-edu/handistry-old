/*------------
   IMPORTS
------------*/
import React from 'react';
import Draggable from '../components/Draggable';
import '../styles/style.css';

// The Tabletop screen which acts as main working area.
function Tabletop() {
    return (
        <div>
            <h1>Reaction Table Screen</h1>
            <p>we are children of screen :D</p>
            <p>Hello</p>

            <div className="GlasswareContainer">
                <Draggable>
                    {/* <Glassware
                        data={
                            new GlasswareModel(
                                "erlenmeyerFlask",
                                "../resources/img/erlenmeyerFlask.png",
                                "../resources/img/erlenmeyerFlask-mask.png",
                                1000,
                                new Mixture(
                                    //@ts-ignore
                                    new Map(
                                        [["L. water", CHEMICAL_LIST.get("H2O(l)")]]
                                    ),
                                    500
                                ),
                                "beaker"
                            )
                        }
                    /> */}
                    <div className="dummy"></div>
                </Draggable>
            </div>
        </div>
    );
}

export default Tabletop;