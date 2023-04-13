import React from 'react';
import '../styles/style.css';

interface GlasswareContainerProps {
    children: React.ReactNode;
}

function GlasswareContainer(props : GlasswareContainerProps) {
    return (
        <div className="GlasswareContainer">
            {props.children}
        </div>
    );
}

export default GlasswareContainer;