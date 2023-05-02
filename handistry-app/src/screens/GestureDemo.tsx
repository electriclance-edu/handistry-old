/*------------
   IMPORTS
------------*/
import React, { useState, useRef, useEffect } from 'react';
import '../styles/style.css';

/*
The Menu screen acts as the landing screen for the user.
It features the app title and logo.
*/
function GestureDemo() {

    const [cameraState, setCameraState] = useState(false);
    const camRef = useRef(null);

    useEffect(() => {
    getVideo();
    }, [camRef]);

    const getVideo = () => {
        if (cameraState==true) {
            navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then(stream => {
                console.log("streaming");
                let video = camRef.current;
                //@ts-ignore
                video.srcObject = stream;
                //@ts-ignore
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
        }
    };
    
    //input video stuff
    // const videoElement = document.getElementsByClassName('input_video');
    // console.log(videoElement);
    // let videoWidth = document.getElementsByClassName('input_video')[0].clientWidth;
    // let videoHeight = document.getElementsByClassName('input_video')[0].clientHeight;

    //annotated video stuff
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    

    return (
        <div className="GestureDemoScreen">
            <div onClick = {() => {setCameraState(!cameraState); console.log(cameraState)}} className = "debug-button">Activate Camera</div>

            <video ref={camRef} width="100%" height="50%" id="input_video"/>
            <canvas id="output_canvas"/>
        </div>
    );
}

export default GestureDemo;