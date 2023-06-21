/*------------
   IMPORTS
------------*/
import React, { useState } from 'react';
import Interactive from './Interactive';
import Screen from './Screen';
import MainMenu from '../screens/Menu';
import Tabletop from '../screens/Tabletop';
import Stockroom from '../screens/Stockroom';
import GestureDemo from '../screens/GestureDemo';
import GlasswareContainer from './GlasswareContainer';
import '../styles/style.css';
// TEMPORARY IMPORTS
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import Glassware from '../components/Glassware';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import { Mixture } from '../vcl-model/Mixture';


interface ScreenContainerProps {
    screen : number
}

/*
ScreenContainer [300 vw] is a parent container for 3 Screen objects [100vw each]: Menu, Tabletop, and Stockroom.
It has two side buttons that has hoverEvent to navigate through these 3 Screen objects
*/
function ScreenContainer(props : ScreenContainerProps) {
    const [equipmentList, setEquipmentList] = useState([]);
    const ScreenContainerStyle = {"--screen": props.screen} as React.CSSProperties;

    return (
        <div className="ScreenContainer" style={ScreenContainerStyle}>
            {/* <Screen index={0}>
                <GestureDemo/>
            </Screen> */}
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

/*------------
 MISCELLANEOUS
------------*/

export default ScreenContainer;
