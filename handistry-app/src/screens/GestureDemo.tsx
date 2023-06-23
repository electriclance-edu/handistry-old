/*------------
   IMPORTS
------------*/
import React, { useState, useRef, useEffect } from 'react';
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import '../styles/style.css';

/*
Gesture demo description
*/
function GestureDemo() {

    const [cameraState, setCameraState] = useState(false);
    console.log("camerastate = " + cameraState);
    const [buttonText, setButtonText] = useState("Open Camera");
    const [landmarkerStatus, setLandmarkerStatus] = useState(false);
    const camRef = useRef(null);
    const interactiveCanvas = useRef(null);
    var stream: any = null;

    const getVideo = () => {
        let video: any = null;
        console.log("stream originally:" + stream);
        navigator.mediaDevices.getUserMedia({ video: { width: 300 } })
        
        .then(mediastream => {
            console.log("streaming");
            stream = mediastream;
            console.log("stream updated:" + stream);
            let video = camRef.current;
            //@ts-ignore
            video.srcObject = mediastream;
            //@ts-ignore
            video.play();
        })

        .catch(err => {
            console.error("error:", err);
        });
    };
    const closeVideo = (videoElem : any) => {
        const stream = videoElem.srcObject;
        //@ts-ignore
        const tracks = stream.getTracks();

        tracks.forEach((track: any) => {
            track.stop();
        });

        videoElem.srcObject = null;
    };
    const handleCamera = () => {
        console.log("handle camera sees camera as: " + cameraState);
        if (!cameraState) {
            getVideo();
            setButtonText("Close Camera");
        }
        else {
            closeVideo(camRef.current);
            setButtonText("Open Camera");
        }
    }
    
    console.log("redefining handlandmarker");
    let handLandmarker = useRef();
    let runningMode = "IMAGE";
    let enableWebcamButton: HTMLButtonElement;
    let video = document.getElementById("webcam") as HTMLVideoElement;
    let annotatedVideo = document.getElementById("annotated-webcam") as HTMLCanvasElement;
    let requestID = 0;

    const createHandLandmarker = async () => {
        const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-11/wasm"
        );
        //@ts-ignore
        handLandmarker.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task`
        },
        //@ts-ignore
        runningMode: runningMode,
        numHands: 2
        });
        console.log("success setting up landmarker" + handLandmarker);
        setLandmarkerStatus(true);
    }

    const predictWebcam = async () => {
        console.log("predicting webcam");
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          if (handLandmarker.current !== undefined) {
            //@ts-ignore
            await handLandmarker.current.setOptions({ runningMode: "VIDEO" });
          }
        }
        let startTimeMs = performance.now();
        let results = undefined;
        //@ts-ignore
        results = handLandmarker.current.detectForVideo(video, startTimeMs);
      
        //@ts-ignore
        if (results !== undefined) {
            if (results.landmarks) {
                // @ts-ignore
                for (const landmarks of results.landmarks) {
                    console.log(landmarks[8].x);
                    drawOnScreen(landmarks[8].x, landmarks[8].y, landmarks[8].z);
                }
            }
        }
       
        if (cameraState === true) {
            requestID = window.requestAnimationFrame(predictWebcam);
        }
        else {
            handLandmarker.current = undefined;
            window.cancelAnimationFrame(requestID);
        }
    }

    const drawOnScreen = (x: number, y: number, z: number) => { //for canvases, (0,0) is top left corner
        //@ts-ignore
        let drawingCanvas = interactiveCanvas.current;
        //@ts-ignore
        const drawingCtx = drawingCanvas.getContext('2d');
    
        //flipping x:
        x = 0.5 - (x-0.5);
    
        //@ts-ignore
        let rX = x*drawingCanvas.width;
        //@ts-ignore
        let rY = y*drawingCanvas.height;
        
        console.log(rX, rY);
    
        drawingCtx.fillRect(rX-10,rY-10,20,20);
        drawingCtx.stroke();    

        //@ts-ignore
        // drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    
        drawingCtx.restore();
    }


    if (cameraState === true) {
        requestID = window.requestAnimationFrame(predictWebcam);
    }
    else {
        handLandmarker.current = undefined;
        window.cancelAnimationFrame(requestID);
    }

    return (
        <div className="GestureDemoScreen">
            <div onClick = {() => {
                setCameraState(!cameraState);
                handleCamera();
            }} className = "debug-button">{buttonText}</div>

            <div onClick = {() => {
                createHandLandmarker();
            }} className = "debug-button2">Prepare Hand Landmarker</div>

            <div className="row">
                <video id="webcam" ref={camRef} className="column"/>
                <div className="column">
                    <h2>Welcome to Hand Control Demo Screen!</h2>
                    <h3>Landmarker Ready: {}</h3>
                </div> 
                {/* <canvas id="annotated-webcam" width="50%" height="100%" className="column"/> */}
            </div>
            
            <canvas ref={interactiveCanvas} className="row"/>
        </div>
    );
}

export default GestureDemo;