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
                        [["L. juice", CHEMICAL_LIST.get("Zesto Tetrapak")]]
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
                        [["L. potion", CHEMICAL_LIST.get("Essence of Health")]]
                    ),
                    Math.floor(Math.random() * 100 / 10) * 10 + 300
                ),
                "beaker"
            )
        }/>

    return (
        <div className='Stockroom'>
            <div className="Stockroom-shelf" style={{"--shelfInd": 1} as React.CSSProperties}>
                <div className = "debug-button" onClick = {() => addEquipment([glassware1, glassware1, glassware2, glassware3][Math.floor(Math.random() * 4)])}>Generate New Thing</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
        </div>
        // <div className="Stockroom">
        //     {/* {equipmentGens2()} */}
        //     <div className="Stockroom-shelf" style={{"--shelfInd": 1} as React.CSSProperties}>
        //         <div onClick = {() => console.log("Lmao")}>Generate New Thing</div>
        //         <div className="Stockroom-shelf-top"></div>
        //     </div>
        //     <div className="Stockroom-shelf" style={{"--shelfInd": 2} as React.CSSProperties}>
        //         <div className="Stockroom-shelf-top"></div>
        //     </div>
        //     <div className="Stockroom-shelf" style={{"--shelfInd": 3} as React.CSSProperties}>
        //         <div className="Stockroom-shelf-top"></div>
        //     </div>
        //     <div className="Stockroom-shelf" style={{"--shelfInd": 4} as React.CSSProperties}>
        //         <div className="Stockroom-shelf-top"></div>
        //     </div>
        // </div>
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