/*------------
   IMPORTS
------------*/
import React from 'react';
import '../styles/style.css';

/*
The Menu screen acts as the landing screen for the user.
It features the app title and logo.
*/
function Menu() {

    const CurrentExpName: string = "Titration of Acetic Acid";

    return (
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
    );
}

export default Menu;