/*------------
   IMPORTS
------------*/
import React, { useRef, useState } from 'react';
import Interactive from '../components/Interactive';
import Glassware from '../components/Glassware';
import { Chemical } from '../vcl-model/Chemical';
import { Mixture } from '../vcl-model/Mixture';
import Tooltip from '../components/Tooltip';
import GlasswareContainer from '../components/GlasswareContainer';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import '../styles/style.css';


function checkIntersection(rect1 : any, rect2 : any) {
    //https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
    // return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    const midpoint1 = {
        x:(rect1.left + rect1.right) / 2,
        y:(rect1.top + rect1.bottom) / 2
    }
    const midpoint2 = {
        x:(rect2.left + rect2.right) / 2,
        y:(rect2.top + rect2.bottom) / 2
    }
    // distance of rects in pixels
    const dist = Math.sqrt(Math.pow(midpoint2.x - midpoint1.x, 2) + Math.pow(midpoint2.y - midpoint1.y,2));
    return dist < 100;
}

// The Tabletop screen which acts as main working area.
function Tabletop(equipmentList : any, setEquipmentList : any) { //issue of dragging is due to enclosing in tabletop
    var activeInteractor = {} as any;
    var passiveInteractor = {} as any;
    const [updateState, setUpdateState] = useState(0);

    const resetEquipmentList = () => {
        setEquipmentList([]);
    }

    const updateIntersection = (reference : any) => {
        try {
            passiveInteractor.dom.classList.remove("passiveIntersector");
            activeInteractor.dom.classList.remove("activeIntersector");
        } catch (Exception) {}

        const elem = reference.current;
        //@ts-ignore
        const elemRect = elem.getBoundingClientRect();
        activeInteractor = {} as any;
        passiveInteractor = {} as any;
        const domInteractives = document.getElementsByClassName("interactive");

        var debug_foundPassive = {} as any;

        for (let i = 0; i < domInteractives.length; i++) {
            const currentInteractive = domInteractives[i];
            
            // if they are the same component, ignore
            if (elem.getAttribute("data-index") == currentInteractive.getAttribute("data-index")) {
                continue;
            }
            
            const isIntersecting = checkIntersection(elemRect, (currentInteractive as unknown as HTMLElement).getBoundingClientRect());

            if (isIntersecting) {
                passiveInteractor.dom = currentInteractive;
                activeInteractor.dom = elem;
                passiveInteractor.component = currentInteractive.getAttribute("data-index");
                activeInteractor.component = elem.getAttribute("data-index");
                break;
            }
        }
        
        try {
            passiveInteractor.dom.classList.add("passiveIntersector");
            activeInteractor.dom.classList.add("activeIntersector");
            var activeMixture = equipmentList.equipmentList[activeInteractor.dom.getAttribute("data-index")].props.data.mixture as Mixture;
            var passiveMixture = equipmentList.equipmentList[passiveInteractor.dom.getAttribute("data-index")].props.data.mixture as Mixture;
            var passiveCap = equipmentList.equipmentList[passiveInteractor.dom.getAttribute("data-index")].props.data.getMaxCap();

            const totalChemicals = activeMixture.getChemicals().size;
            const debug_transferRate = 50;
            activeMixture.getChemicals().forEach((chemical : Chemical, name : string) => {
                // console.log("did we just win?", passiveMixture);
                var amtToTransfer = debug_transferRate / totalChemicals;
                //maximum amt to transfer is either whats enough to fill it (so u cant go above max), or whats leftover (so u cant go negative)
                const maxTransfer = Math.min(passiveCap - passiveMixture.getVolume(), activeMixture.getVolume())
                console.log(amtToTransfer, maxTransfer);
                amtToTransfer = Math.min(amtToTransfer, maxTransfer);

                passiveMixture.updateChemicals(chemical, amtToTransfer);
                activeMixture.updateChemicals(chemical, -1 * amtToTransfer);
                console.log(domInteractives[passiveInteractor.component]);
            });
            setUpdateState(updateState + 1);
            // let elementPassive = domInteractives[passiveInteractor.component];
            // console.log(elementPassive.children[0].component);
            // for (let c = 0; c < elementPassive.children.length; c++) {
            //     let child = elementPassive.children[c];
            //     console.log(child);
            //   }
            // activeInteractor.component.forceUpdate();
            // passiveInteractor.component.forceUpdate();
            // window.location.reload();
            // let thisTableTop = document.getElementsByClassName("Tabletop")[0];
            // console.log("thistabletop: " + thisTableTop);
        } catch (Exception) {}

    };

    var elementArray = Array.from(equipmentList.equipmentList, (eql, index) => { //not the cause of problem
        var equipment : any = eql;
        // console.log("New object on tabletop" + eql); // un-comment when debugging
        // console.log(equipment); // un-comment when debugging
        return (<Interactive updateIntersection={updateIntersection} index={index}>
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
    });

    return (
        <div className="Tabletop">
            <div  
                className = "debug-button" 
                onClick = {() => {resetEquipmentList()}}>
                Clear Table
            </div>

            <GlasswareContainer> {/*not the cause of problem*/}
                {elementArray}
            </GlasswareContainer>
            
            {/* <h1>Reaction Table Screen</h1>
            <p>we are children of screen :D</p>
            <p>Hello</p> */}
        </div>
    );
}

export default Tabletop;