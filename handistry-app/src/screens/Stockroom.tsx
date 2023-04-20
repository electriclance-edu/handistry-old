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
import { add } from '@tensorflow/tfjs';

function Stockroom({ setEquipmentList } : any) {

    const addEquipment = (newGlassware : any) => {
        console.log("bruh");

        setEquipmentList((currentList : any) => {
            console.log(currentList);
            return [...currentList, newGlassware];
        });
    }

    const glassware1 = <Glassware
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


    return (
            <div className="Stockroom">
                <div className="Stockroom-shelf">
                    {/* list reagents here */}
                        //@ts-ignore
                    <div className="equipmentGenerator" onClick = {() => {addEquipment(glassware1)}}>
                        GENERATE AN ELEMENT
                    </div>
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
    );
}

export default Stockroom;