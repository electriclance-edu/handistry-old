import React, { useState } from 'react';
import '../styles/style.css';

interface TooltipProps {
    data : any
}

function Tooltip(props : TooltipProps) {
    const firstChemical = props.data.mixture.chemicals.entries().next().value[1];
    return (
        <div className="Tooltip styleGlassBox">
            <h2>{firstChemical.name}</h2>
            <p className="extraInfo">{(firstChemical.phase == "l" ? "🌢Liquid" : "🌢Aqueous Solution") +
                ", " +
                (firstChemical.formula)}</p>
            <p>{props.data.mixture.volume + "mL within " + props.data.equipmentName}</p>
        </div>
    );
}

export default Tooltip;