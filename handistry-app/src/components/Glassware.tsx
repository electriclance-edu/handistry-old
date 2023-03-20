// extends equipment
// has an internal fill state that determines how high/low the vesselContent should be
// has an svg mask for the vesselContent so it conforms to the shape of the vessel
import React from 'react';
import '../styles/style.css';

function Glassware() {
    const internalFillState = { } as React.CSSProperties;
    const glasswareStyle = {"--tilt": "50", "--fillLevel": "50"} as React.CSSProperties;
    return (
        <div className="Glassware" style={glasswareStyle}>
            <div className="glassware-image"></div>
            <div className="glassware-internalFillState" style={internalFillState}></div>
        </div>
    );
}

export default Glassware;
