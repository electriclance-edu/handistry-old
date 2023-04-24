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
            {/* {equipmentGens2()} */}
            <div className="Stockroom-shelf" style={{"--shelfInd": 1} as React.CSSProperties}>
                <div onClick = {() => addEquipment(glassware1)}>Generate New Thing</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 2} as React.CSSProperties}>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 3} as React.CSSProperties}>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 4} as React.CSSProperties}>
                <div className="Stockroom-shelf-top"></div>
            </div>
        </div>
    );
    // return (
    //         <div className="Stockroom">
    //             <div className="Stockroom-shelf">
    //                 {/* list reagents here */}
    //                     //@ts-ignore
    //                 <div className="equipmentGenerator" onClick = {() => {addEquipment(glassware1)}}>
    //                     GENERATE AN ELEMENT
    //                 </div>
/* shelfInd refers to the index of the shelf it is on. 
   the top shelf is shelf 1, the next shelf is shelf 2, 
   and the bottom shelf is shelf 3. */

// function equipmentGens2() {
//     return (
//         <div className="eqptRow" style={{"--shelfInd": 2} as React.CSSProperties}>
//             {/* list reagents here */}
//             <div className="eqptRow-gen" onClick = {() => console.log("bruh")}>
//                 <Glassware
//                     data={
//                         new GlasswareModel(
//                             "erlenmeyerFlask",
//                             "../resources/img/erlenmeyerFlask.png",
//                             "../resources/img/erlenmeyerFlask-mask.png",
//                             1000,
//                             new Mixture(
//                                 //@ts-ignore
//                                 new Map(
//                                     [["L. water", CHEMICAL_LIST.get("H2O(l)")]]
//                                 ),
//                                 500
//                             ),
//                             "beaker"
//                         )
//                     }
//                 />
//             </div>
//         </div>
//     );
// }

// function Stockroom() {
}

export default Stockroom;