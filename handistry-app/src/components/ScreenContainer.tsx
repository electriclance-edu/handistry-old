/*------------
   IMPORTS
------------*/
import React, { useState } from 'react';
import Screen from './Screen';
import MainMenu from '../screens/Menu';
import Tabletop from '../screens/Tabletop';
import Stockroom from '../screens/Stockroom';
import GestureDemo from '../screens/GestureDemo';
import '../styles/style.css';

interface ScreenContainerProps {
    screen : number
}

/*
TL;DR: The sliding component containing all the screens
ScreenContainer [300 vw] is a parent container for 3 Screen objects [100vw each]: Menu, Tabletop, and Stockroom.
It has two side "buttons" that has hoverEvent to navigate through these 3 Screen objects
*/
function ScreenContainer(props : ScreenContainerProps) {

    //----- VARIABLES & STATES -----//
    const [equipmentList, setEquipmentList] = useState([]);
    const ScreenContainerStyle = {"--screen": props.screen} as React.CSSProperties;
    
    //----- RETURN -----//
    return (
        <div className="ScreenContainer" style={ScreenContainerStyle}>
            <Screen index={-1}>
                <GestureDemo/>
            </Screen>
            <Screen index={0}>
                <div className = "debug-button" onClick = {() => {console.log(equipmentList)}}>Check Equipment List</div>
                <MainMenu/>
            </Screen>
            <Screen index={1}>
                <Tabletop equipmentList={equipmentList} setEquipmentList={setEquipmentList}/>
            </Screen>
            <Screen index={2}>
                <Stockroom setEquipmentList = {setEquipmentList}/>
            </Screen>
            <div className="reactionTable">
                <div className="reactionTable-top"></div>
                <div className="reactionTable-top-border"></div>
                <div className="reactionTable-bottom"></div>
            </div>
        </div>
    );
}

export default ScreenContainer;
