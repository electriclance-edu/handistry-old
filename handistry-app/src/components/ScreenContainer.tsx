import React, { useState } from 'react';
import '../styles/style.css';
import Screen from './Screen';
import Glassware from './Glassware';

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
                <Glassware/>
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
