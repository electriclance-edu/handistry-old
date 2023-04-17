/*------------
   IMPORTS
------------*/
import React, { useState, useCallback } from "react";

interface DraggableProps {
    children: React.ReactNode;
}

/*
A parent container that makes nested components draggable.
Dragging occurs when mouse is held and moved.
Dragging stops when mouse is released.
*/
function Draggable(props : DraggableProps) {
    const manageDragMove = (e : MouseEvent) => {
        e = e || window.event;
        e.preventDefault();

        setPosition({
            x: e.clientX,
            y: e.clientY 
        });
    }
    
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const callback = useCallback(manageDragMove, [])

    const setDraggable = (e : MouseEvent, elem : any, state : boolean) => {
        console.log("setDraggable: " + state);
        //@ts-ignore
        if (state) document.addEventListener("mousemove", callback, true);
        //@ts-ignore
        else {
            console.log(state + "help")
            document.removeEventListener("mousemove", callback, true);
        }
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