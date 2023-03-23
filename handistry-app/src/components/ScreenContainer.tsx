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

    return (
        <div className="ScreenContainer" style={ScreenContainerStyle}>
            <Screen index={0}>
                <h1>Menu Screen</h1>
                <p>we are children of screen :D</p>
            </Screen>
            <Screen index={1}>
                <h1>Reaction Table Screen</h1>
                <p>we are children of screen :D</p>
            </Screen>
            <Screen index={2}>
                <h1>Stockroom Screen</h1>
                <p>we are children of screen :D</p>
            </Screen>
            <div className="reactionTable">
                <div className="reactionTable-top"></div>
                <div className="reactionTable-top-border"></div>
                <div className="reactionTable-bottom"></div>
            </div>
            <div className="GlasswareContainer">
                <Draggable>
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
                </Draggable>
            </div>
            <div className="ToPreviousScreen flex-centered" onMouseOver={(e) => {setScreen(clamp(screen - 1, 0, 2))}}>To Previous Screen</div>
            <div className="ToNextScreen flex-centered" onMouseOver={(e) => {setScreen(clamp(screen + 1, 0, 2))}}>To Next Screen</div>
        </div>
    );
}

function clamp(value : number, min : number, max : number) {
    return Math.max(Math.min(value, max), min);
}

export default ScreenContainer;
