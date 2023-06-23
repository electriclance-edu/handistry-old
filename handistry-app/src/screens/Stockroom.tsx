/*------------
   IMPORTS
------------*/
import React from 'react';
import Glassware from '../components/Glassware';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import {Mixture} from '../vcl-model/Mixture';
import '../styles/style.css';

/*
TL;DR: The item generation page.
The Stockroom screen is where the user can gather equipment (e.g., glassware, chemicals)
to be used for the experiment they are doing.
*/
function Stockroom({ setEquipmentList } : any) {

    //----- VARIABLES & STATES -----//
    /* Passes up the updated list of generate glassware to the parent component. */
    const addEquipment = (newGlassware : any) => {
        console.log("bruh");

        setEquipmentList((currentList : any) => {
            console.log(currentList);
            return [...currentList, newGlassware];
        });
    }

    //----- AVAILABLE GLASSWARE -----//
    // To-do: Turn this into it's own JSON file for easier generation
    const glassware0 = <Glassware
        data={
            new GlasswareModel(
                "erlenmeyerFlask",
                "../resources/img/erlenmeyerFlask.png",
                "../resources/img/erlenmeyerFlask-mask.png",
                1000,
                new Mixture(
                    //@ts-ignore
                    new Map(),
                    0
                ),
                "beaker"
            )
        }/>
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
                    Math.floor((500 + (Math.random() * 500) - 250) / 10) * 10
                ),
                "beaker"
            )
        }/>
    const glassware2 = <Glassware
        data={
            new GlasswareModel(
                "erlenmeyerFlask",
                "../resources/img/erlenmeyerFlask.png",
                "../resources/img/erlenmeyerFlask-mask.png",
                750,
                new Mixture(
                    //@ts-ignore
                    new Map(
                        [["L. juice", CHEMICAL_LIST.get("ZeSTo(l)")]]
                    ),
                    Math.floor(Math.random() * 500 / 10) * 10 + 250
                ),
                "beaker"
            )
        }/>
    const glassware3 = <Glassware
        data={
            new GlasswareModel(
                "erlenmeyerFlask",
                "../resources/img/erlenmeyerFlask.png",
                "../resources/img/erlenmeyerFlask-mask.png",
                750,
                new Mixture(
                    //@ts-ignore
                    new Map(
                        [["L. potion", CHEMICAL_LIST.get("HeAlTh(l)")]]
                    ),
                    Math.floor(Math.random() * 100 / 10) * 10 + 300
                ),
                "beaker"
            )
        }/>

    //---- RETURN -----//
    return (
        <div className='Stockroom'>
            <div className="Stockroom-shelf" style={{"--shelfInd": 1} as React.CSSProperties}>
                {/* <div className = "generator-button" onClick = {() => addEquipment([glassware1, glassware1, glassware2, glassware3][Math.floor(Math.random() * 4)])}>Generate Surprise</div> */}
                <div className = "generator-button" onClick = {() => addEquipment(glassware0)}>Empty Flask</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 2} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => addEquipment(glassware1)}>Flask of Water (H2O)</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 3} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => addEquipment(glassware2)}>Flask of Juice (ZeStO)</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 4} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => addEquipment(glassware3)}>Flask of Potion (HeAlTH)</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
        </div>
    );
}

export default Stockroom;

{ // ARCHIVED CODE (can be hidden / dropped down):
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