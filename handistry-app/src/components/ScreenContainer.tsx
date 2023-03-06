import React from 'react';
import '../styles/style.css';
import Screen from './Screen';
import Glassware from './Glassware';

function ScreenContainer() {
    return (
        <div className="ScreenContainer">
            <Screen index={0}>
                <h1>Menu Screen</h1>
                <p>we are children of screen :D</p>
            </Screen>
            <Screen index={1}>
                <h1>Reaction Table Screen</h1>
                <p>we are children of screen :D</p>
                <Glassware/>
            </Screen>
            <Screen index={2}>
                <h1>Stockroom Screen</h1>
                <p>we are children of screen :D</p>
            </Screen>
            <div className="ToPreviousScreen flex-centered">To Previous Screen</div>
            <div className="ToNextScreen flex-centered">To Next Screen</div>
        </div>
    );
}

export default ScreenContainer;
