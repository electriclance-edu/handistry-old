/*------------
   IMPORTS
------------*/
import React, { useState } from 'react';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import Glassware from './Glassware'
import '../styles/style.css';

// Interface for ...
interface EquipmentGeneratorProps {
    glasswareType : GlasswareModel;
};

// Description...
function EquipmentGenerator(props : EquipmentGeneratorProps) {
    const [chemicals, updateElements] = useState("");
    
    return (
        <div className="ChemicalGenerator">
            {
                Array(5).fill(
                    <Glassware 
                        initializedFromStockroom={true} 
                        parentState={{chemicals, updateElements}} 
                        data={props.glasswareType}
                    />
                )
            }
        </div>
    );
}

export default EquipmentGenerator;