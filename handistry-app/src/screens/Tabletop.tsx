/*------------
   IMPORTS
------------*/
import { useRef } from 'react';
import Interactive from '../components/Interactive';
import Glassware from '../components/Glassware';
import Tooltip from '../components/Tooltip';
import GlasswareContainer from '../components/GlasswareContainer';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import '../styles/style.css';

// The Tabletop screen which acts as main working area.
function Tabletop(equipmentList : any) { //issue of dragging is due to enclosing in tabletop

    return (
        <div className="Tabletop">
            <div  className = "debug-button" onClick = {() => console.log(equipmentList)}>Check Tabletop EquipmentList</div>

            <GlasswareContainer> {/*not the cause of problem*/}
                {Array.from(equipmentList.equipmentList, eql => { //not the cause of problem
                    var equipment : any = eql;
                    // console.log(equipment.getBoundingClientRect().width);
                    // console.log("New object on tabletop" + eql); // un-comment when debugging
                    // console.log(equipment); // un-comment when debugging
                    return (<Interactive>
                        <Glassware
                            data={
                                new GlasswareModel(
                                    equipment.props.data.name,
                                    equipment.props.data.spritePath,
                                    equipment.props.data.maskPath,
                                    equipment.props.data.maxCapacity,
                                    equipment.props.data.mixture,
                                    equipment.props.data.transferMethod
                                )
                            }
                        />
                        <Tooltip
                            data={
                                {
                                    equipmentName:equipment.props.data.name,
                                    capacity:equipment.props.data.maxCapacity,
                                    mixture:equipment.props.data.mixture
                                }
                            }/>
                    </Interactive>);
                })}
            </GlasswareContainer>
            
            <h1>Reaction Table Screen</h1>
            <p>we are children of screen :D</p>
            <p>Hello</p>
        </div>
    );
}

export default Tabletop;