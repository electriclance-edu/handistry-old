import React, { useState } from 'react';
import '../styles/style.css';

interface TooltipProps {
    data : any
}

function Tooltip(props : TooltipProps) {
    const iterator = props.data.mixture.chemicals.entries();
    const firstChemical = iterator.next().value[1];
    
    var multipleChemicals = false;
    try {
        const secondChemical = iterator.next().value[1];
    } catch {
        multipleChemicals = true;
    }

    return (
        <div className="Tooltip styleGlassBox">
            <h2>{multipleChemicals ? firstChemical.name : "L. mixture"}</h2>
            <p className="extraInfo">{(firstChemical.phase == "l" ? "🌢Liquid" : "🌢Aqueous Solution") +
                ", " +
                (firstChemical.formula)}</p>
            <p>{Math.round(props.data.mixture.volume) + "mL within " + props.data.equipmentName}</p>
        </div>
    );
}

export default Tooltip;