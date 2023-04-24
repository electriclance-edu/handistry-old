/*------------
   IMPORTS
------------*/
import React from 'react';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import Draggable from '../components/Draggable';
import Glassware from '../components/Glassware';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import { Mixture } from '../vcl-model/Mixture';
import '../styles/style.css';
import GlasswareContainer from '../components/GlasswareContainer';

interface EquipmentList {
    equipments: any[];
}

// The Tabletop screen which acts as main working area.
function Tabletop(equipmentList : any) {

    //@ts-ignore
    var renderedGlassware = equipmentList.equipmentList.map((equipment) => {
        <div>"Trololololol"</div>
    });

    return (
        <div>
            <div onClick = {() => console.log(equipmentList)}>Check Tabletop EquipmentList</div>
            <div onClick = {() => console.log(renderedGlassware)}>Check RenderedGlassware</div>

            <GlasswareContainer>
                {/* <Draggable>
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
                    </Draggable> */}
                {
                    Array.from(equipmentList.equipmentList, eql => {
                        console.log("bruh" + eql);
                        return <Draggable>
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
                    })
                }
            </GlasswareContainer>
            
            <h1>Reaction Table Screen</h1>
            <p>we are children of screen :D</p>
            <p>Hello</p>
        </div>
    );
}

export default Tabletop;