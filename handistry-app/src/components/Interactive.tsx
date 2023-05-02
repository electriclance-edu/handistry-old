/*------------
   IMPORTS
------------*/
import React, { useRef, useState, useCallback } from "react";

interface InteractiveProps {
    children : React.ReactNode;
    updateIntersection : Function;
    index : Number;
}
/*
A parent container that makes nested components dragga  ble.
Dragging occurs when mouse is held and moved.
Dragging stops when mouse is released.
*/
function Interactive(props : InteractiveProps) {
    const ref = useRef(null);
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });

    const manageDragMove = (e : MouseEvent) => {
        e = e || window.event;
        e.preventDefault(); 

        setPosition({
            x: e.clientX,
            y: e.clientY 
        });
    }

    const callback = useCallback(manageDragMove, []);

    const setDraggable = (e : MouseEvent, elem : any, state : boolean) => {
        //@ts-ignore
        if (state) {
            document.addEventListener("mousemove", callback, true);
            //@ts-ignore
            ref.current.classList.remove("intersection");
        } else {
            document.removeEventListener("mousemove", callback, true);
            props.updateIntersection(ref);
        }
    }

    const InteractiveStyle = {
        "--x": position.x,
        "--y": position.y,
    } as React.CSSProperties;

    return (
        <div ref={ref} className="interactive" data-index={props.index} 
            //@ts-ignore
            onMouseDown={(e) => {setDraggable(e, this, true)}}
            //@ts-ignore
            onMouseUp={(e) => {setDraggable(e, this, false)}}
            style={InteractiveStyle}
        >
            {props.children}
        </div>
    );
}

function clamp(value : number, min : number, max : number) {
    return Math.max(Math.min(value, max), min);
}

export default Interactive;