/*------------
   IMPORTS
------------*/
import React from 'react';
import Screen from '../components/Screen';
import Glassware from '../components/Glassware';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import {Mixture} from '../vcl-model/Mixture';
import '../styles/style.css';

/* shelfInd refers to the index of the shelf it is on. 
   the top shelf is shelf 1, the next shelf is shelf 2, 
   and the bottom shelf is shelf 3. */

function equipmentGens2() {
    return (
        <div className="eqptRow" style={{"--shelfInd": 2} as React.CSSProperties}>
            {/* list reagents here */}
            <div className="eqptRow-gen" onClick = {() => console.log("bruh")}>
                <Glassware
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
                />
            </div>
        </div>
    );
}

function Stockroom() {
    return (
            <div className="Stockroom">
                {equipmentGens2()}
                <div className="Stockroom-shelf" style={{"--shelfInd": 1} as React.CSSProperties}>
                    <div className="Stockroom-shelf-top"></div>
                </div>
                <div className="Stockroom-shelf" style={{"--shelfInd": 2} as React.CSSProperties}>
                    <div className="Stockroom-shelf-top"></div>
                </div>
                <div className="Stockroom-shelf" style={{"--shelfInd": 3} as React.CSSProperties}>
                    <div className="Stockroom-shelf-top"></div>
                </div>
                <div className="Stockroom-shelf" style={{"--shelfInd": 4} as React.CSSProperties}>
                    <div className="Stockroom-shelf-top"></div>
                </div>
            </div>
    );
}

export default Stockroom;