import React, { useState } from 'react';
import '../styles/style.css';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import Glassware from './Glassware'

interface EquipmentGeneratorProps {
    glasswareType : GlasswareModel;
};

function EquipmentGenerator(props : EquipmentGeneratorProps) {
    const [chemicals, updateElements] = useState("");
    
    return (
        <div className="ChemicalGenerator">
            {
                Array(5).fill(
                    <Glassware initializedFromStockroom={true} parentState={{chemicals, updateElements}} data={props.glasswareType}/>
                )
            }
        </div>
    );
}

export default EquipmentGenerator;