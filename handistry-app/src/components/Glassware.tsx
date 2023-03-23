// extends equipment
// has an internal fill state that determines how high/low the vesselContent should be
// has an svg mask for the vesselContent so it conforms to the shape of the vessel
import React from 'react';
import '../styles/style.css';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';

interface GlasswareProps {
    initializedFromStockroom? : boolean;
    parentState? : Object;
    data : GlasswareModel;
}

function Glassware(props : GlasswareProps) {
    const glasswareStyle = {
        "--tilt": "0", 
        "--fillLevel": props.data.getMixture().getVolume() / props.data.getMaxCap() * 100,
        "--color": props.data.getMixture().calculateColor()
    } as React.CSSProperties;
    return (
        <div className="Glassware" style={glasswareStyle}>
            <div className="glassware-image"></div>
            <div className="glassware-internalFillState"></div>
        </div>
    );
}

export default Glassware;