import React, { useState } from 'react';
import '../styles/style.css';
import Screen from './Screen';
import Glassware from './Glassware';
import Draggable from './Draggable';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import {Mixture} from '../vcl-model/Mixture';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';

function ScreenContainer() {
    const [screen, setScreen] = useState(0);

    const ScreenContainerStyle = {"--screen": screen} as React.CSSProperties;
    const CurrentExpName: string = "Titration of Acetic Acid";

    return (
        <div className="ScreenContainer" style={ScreenContainerStyle}>
            <Screen index={0}>
                <div className="MenuScreen">
                    <div className="MenuScreen-info">
                        <div className="MenuScreen-logo"></div>
                        <div className="MenuScreen-box">
                            <h1 className="MenuScreen-box-title">Handistry</h1>
                            <h2 className="MenuScreen-box-subtitle">chemistry at your fingertips</h2>
                        </div>
                    </div>
                    <div className="MenuScreen-currentExp">
                        <div className="MenuScreen-currentExp-label">Current Experiment:</div>
                        <div className="MenuScreen-currentExp-name">{CurrentExpName}</div>
                    </div>
                </div>
            </Screen>
            <Screen index={1}>
                <h1>Reaction Table Screen</h1>
                <p>we are children of screen :D</p>
            </Screen>
            <Screen index={2}>
                <div className="StockroomScreen">
                    <div className="Stockroom">
                        <div className="Stockroom-shelf">
                            <div className="Stockroom-shelf-top"></div>
                        </div>
                        <div className="Stockroom-shelf">
                            <div className="Stockroom-shelf-top"></div>
                        </div>
                        <div className="Stockroom-shelf">
                            <div className="Stockroom-shelf-top"></div>
                        </div>
                        <div className="Stockroom-shelf">
                            <div className="Stockroom-shelf-top"></div>
                        </div>
                    </div>
                </div>
            </Screen>
            <div className="reactionTable">
                <div className="reactionTable-top"></div>
                <div className="reactionTable-top-border"></div>
                <div className="reactionTable-bottom"></div>
            </div>
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
            <div className="ToPreviousScreen flex-centered" onMouseOver={(e) => {setScreen(clamp(screen - 1, 0, 2))}}></div>
            <div className="ToNextScreen flex-centered" onMouseOver={(e) => {setScreen(clamp(screen + 1, 0, 2))}}></div>
        </div>
    );
}

function clamp(value : number, min : number, max : number) {
    return Math.max(Math.min(value, max), min);
}

export default ScreenContainer;
