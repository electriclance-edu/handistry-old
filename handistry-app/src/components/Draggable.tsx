/*------------
   IMPORTS
------------*/
import React, { useState } from "react";

interface DraggableProps {
    children: React.ReactNode;
}

/*
A parent container that makes nested components draggable.
Dragging occurs when mouse is held and moved.
Dragging stops when mouse is released.
*/
function Draggable(props : DraggableProps) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const setDraggable = (e : MouseEvent, elem : any, state : boolean) => {
        console.log("setDraggable: " + state);
        //@ts-ignore
        if (state) e.target.addEventListener("mousemove", manageDragMove);
        //@ts-ignore
        else e.target.removeEventListener("mousemove", manageDragMove);
    }
    const manageDragMove = (e : MouseEvent) => {
        e = e || window.event;
        e.preventDefault();

        setPosition({
            x: e.clientX,
            y: e.clientY 
        });
    }

    const DraggableStyle = {
        "--x": position.x,
        "--y": position.y
    } as React.CSSProperties;

    return (
        <div className="draggable" 
            //@ts-ignore
            onMouseDown={(e) => {setDraggable(e, this, true)}}
            //@ts-ignore
            onMouseUp={(e) => {setDraggable(e, this, false)}}
            style={DraggableStyle}
        >
            {props.children}
        </div>
    );
}

function clamp(value : number, min : number, max : number) {
    return Math.max(Math.min(value, max), min);
}

export default Draggable;