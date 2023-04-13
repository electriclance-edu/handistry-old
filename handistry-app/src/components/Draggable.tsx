import React, { useState } from "react";

interface DraggableProps {
    children: React.ReactNode;
}

function Draggable(props : DraggableProps) {
    // const [movementManager, setMovementManager] = useState(() => {});
    // const [position, setPosition] = useState({
    //     x:0,
    //     y:0
    // });

    // const setDraggable = (elem : any, state : boolean) => {
    //     if (state) {
    //         //@ts-ignore
    //         setMovementManager(manageDragMove);
    //     } else {
    //         setMovementManager(() => {});
    //     }
    // }
    // const manageDragMove = (e : MouseEvent) => {
    //     e = e || window.event;
    //     e.preventDefault();

    //     console.log(e.clientX);
    // }

    // const DraggableStyle = {
    //     "--x": position.x,
    //     "--y": position.y
    // } as React.CSSProperties;

    return (
        <div className="Draggable" 
            //@ts-ignore
            // onMouseDown={() => {setDraggable(this, true)}}
            //@ts-ignore
            onAbort={console.log("bosldfjhhdf")}
            //@ts-ignore
            // onMouseUp={() => {setDraggable(this, false)}}
        >
            {props.children}
        </div>
    );
}

function clamp(value : number, min : number, max : number) {
    return Math.max(Math.min(value, max), min);
}

export default Draggable;
