/*------------
   IMPORTS
------------*/
import React from 'react';
import '../styles/style.css';

interface GlasswareContainerProps {
    children: React.ReactNode;
}

/*
The parent component for Equipments (not only Glassware) to be generated on the Tabletop screen
*/
function GlasswareContainer(props : GlasswareContainerProps) {

    //----- RETURN -----//
    return (
        <div className="GlasswareContainer">
            {props.children}
        </div>
    );
}

export default GlasswareContainer;