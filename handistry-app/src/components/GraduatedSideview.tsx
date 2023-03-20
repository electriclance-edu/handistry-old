import React, { useState, MouseEvent } from 'react';
import '../styles/style.css';
import GraduationLineGroup from './GraduationLineGroup';

interface GraduatedSideviewProps {
    graduations : number[];
}
function GraduatedSideview(props : GraduatedSideviewProps) {
    const [fill, setFill] = useState(30);
    return (
        <div className="GraduatedSideview" onClick={() => {setFill(fill + 3); console.log(fill)}}>
            {
                Array.from(props.graduations, graduation => {
                    return <GraduationLineGroup graduation={graduation} />
                })
            }
            <div
                className="GraduatedSideview-fill"
                style={{"--height": `${fill}`} as React.CSSProperties}
            />
        </div>
    );
}

export default GraduatedSideview;