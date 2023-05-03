//imports
import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
  } from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.1.0-alpha-11";

//input video stuff
let gestureRecognizer;
let runningMode = "IMAGE";
let enableWebcamButton;
let webcamRunning = false;

const videoElement = document.getElementsByClassName('input_video')[0];
let videoWidth = document.getElementsByClassName('input_video')[0].clientWidth;
let videoHeight = document.getElementsByClassName('input_video')[0].clientHeight;
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');


const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const createGestureRecognizer = async () => {
    console.log("gesture recognizer created");
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-11/wasm"
    );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "../gesture_recognizer_v1.task"
      },
      runningMode: "VIDEO"
    });
    console.log("from creating gesture recognizer: " + gestureRecognizer);

    runPrediction();
};

const runPrediction = () => {
    const constraints = {
        video: true
      };
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        videoElement.srcObject = stream;
        videoElement.addEventListener("loadeddata", predictWebcam);
    });
}

createGestureRecognizer();


function onResults(results) {
    canvasElement.width = document.getElementsByClassName('input_video')[0].clientWidth-10;
    canvasElement.height = document.getElementsByClassName('input_video')[0].clientHeight;
    
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    let nowInMs = Date.now();
    let gestureResults = gestureRecognizer.recognizeForVideo(videoElement, nowInMs);
    let boxColor = `#15D7EE`;
    if (gestureResults.gestures.length > 0) {
        // gestureOutput.style.display = "block";
        // gestureOutput.style.width = videoWidth;
        const categoryName = gestureResults.gestures[0][0].categoryName;
        const categoryScore = parseFloat(
          gestureResults.gestures[0][0].score * 100
        ).toFixed(2);
        if (categoryName === "holding") boxColor = `#10C829`;
        else boxColor = `#15D7EE`;
        // console.log(`GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`);
        // gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`;
    }
    if (results.multiHandLandmarks) {
        // console.log(results.multiHandLandmarks);
        for (const landmarks of results.multiHandLandmarks) {

            // console.log(landmarks);
            
            //console.log(pointer_x, pointer_y, pointer_z);
            drawBeaker(landmarks, boxColor);
            // drawOnScreen(pointer_x,pointer_y,pointer_z);

            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                            {color: boxColor, lineWidth: 3});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
        }
    }

    //const landmarks = results.multiLandMarks[0];
    
    canvasCtx.restore();
}

function enableCam(event) {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }
  
    if (webcamRunning === true) {
      webcamRunning = false;
      enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
      webcamRunning = true;
      enableWebcamButton.innerText = "DISABLE PREDICITONS";
    }
  
    // getUsermedia parameters.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    });
}

//not used
async function predictWebcam() {
    console.log("gesture detecting");
    const webcamElement = document.getElementById("webcam");
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      console.log("gesture recognizer: " + gestureRecognizer);
      await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }
    let nowInMs = Date.now();
    let results = gestureRecognizer.recognizeForVideo(videoElement, nowInMs);
  
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
    console.log(results);

    // canvasElement.style.height = videoHeight;
    // videoElement.style.height = videoHeight;
    // canvasElement.style.width = videoWidth;
    // webcamElement.style.width = videoWidth;
    // if (results.landmarks) {
    //   for (const landmarks of results.landmarks) {
    //     drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
    //       color: "#00FF00",
    //       lineWidth: 5
    //     });
    //     drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
    //   }
    // }
    // canvasCtx.restore();
    // if (results.gestures.length > 0) {
    //   gestureOutput.style.display = "block";
    //   gestureOutput.style.width = videoWidth;
    //   const categoryName = results.gestures[0][0].categoryName;
    //   const categoryScore = parseFloat(
    //     results.gestures[0][0].score * 100
    //   ).toFixed(2);
    //   gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`;
    // } else {
    //   gestureOutput.style.display = "none";
    // }
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

const camera = new Camera(videoElement, {
    onFrame: async () => {
    await hands.send({image: videoElement});
    },
    width: videoWidth,
    height: videoHeight,
});
camera.start();

let lastX=0, lastY=0;

function drawBeaker (landmarks, selectColor) {
    let drawCanv = document.getElementById('drawing_canvas');
    drawCanv.width = document.getElementsByClassName('drawing_container')[0].clientWidth;
    drawCanv.height = document.getElementsByClassName('drawing_container')[0].clientHeight;
    const drawCtx = drawCanv.getContext('2d');

    let pointer = {x: landmarks[9].x, y: landmarks[9].y};
    let node1 = {x: landmarks[5].x, y: landmarks[5].y}; //pointer node
    let node2 = {x: landmarks[17].x, y: landmarks[17].y}; //pinky node

    // rotation setting
    let degrees = 0;
    let nodeDX = node1.x - node2.x;
    let nodeDY = node1.y - node2.y;

    // console.log(`nodeDX = ${nodeDX}, nodeDY = ${nodeDY}`);

    let nodeDistance = ((nodeDX)**2 + (nodeDY)**2)**0.5;
    // console.log(nodeDX);
    // console.log(nodeDY);
    let initialDegree = Math.asin(nodeDX/nodeDistance);
    console.log("initialDegree = " + initialDegree);

    if (nodeDX <= 0 && nodeDY < 0) degrees = initialDegree; // quadrant 1 -- this is not following cartesian logic, check DX & DY values
    else if (nodeDX > 0 && nodeDY < 0) degrees = initialDegree; // quadrant 2
    else if (nodeDX > 0 && nodeDY >= 0) degrees = Math.PI - initialDegree; // quadrant 3
    else if (nodeDX < 0 && nodeDY > 0) degrees = Math.PI - initialDegree; // quadrant 4
    // if (nodeDY > 0) {
    //     degrees = initialDegree;
    // }
    // else if (nodeDY == 0) {
    //     degrees = 0;
    // }
    // else if (nodeDY < 0) {
    //     degrees = initialDegree;
    // } else{}

    let beaker = {x:0, y:pointer.y};
    beaker.x = 0.5 - (pointer.x-0.5);
    beaker.x *= drawCanv.width;
    beaker.y *= drawCanv.height;

    drawCtx.save();
    let startX = beaker.x-10;
    let startY = beaker.y-10;
    let width = 30, height = 90;
    drawCtx.translate(startX + width/2, startY + height/2);
    drawCtx.rotate(-degrees);

    if (selectColor == '#10C829') drawCtx.rect(-width/2,-height/2,width,height);
    else drawCtx.rect(-width/2,-height/2, width, height);

    drawCtx.fillStyle = selectColor;
    drawCtx.fill();

    // drawCtx.restore();
    
    // console.log(degrees);
}


function drawOnScreen(x, y, z) { //for canvases, (0,0) is top left corner
    let drawingCanvas = document.getElementById('drawing_canvas');
    drawingCanvas.width = document.getElementsByClassName('drawing_container')[0].clientWidth;
    drawingCanvas.height = document.getElementsByClassName('drawing_container')[0].clientHeight;
    const drawingCtx = drawingCanvas.getContext('2d');

    //flipping x:
    x = 0.5 - (x-0.5);

    let rX = x*drawingCanvas.width;
    let rY = y*drawingCanvas.height;
    
    // console.log(rX, rY);

    //Processing degrees

    /*
    drawingCtx.beginPath();
    if(lerp(lastX, lastY, rX, rY)){
        //drawingCtx.fillStyle = 'red';
        //drawingCtx.fillRect(rX-10,rY-10,20,20);
        drawingCtx.arc(rX+5, rY+5, 10, 0, 2 * Math.PI, false);
        drawingCtx.fillStyle = 'blue';
        drawingCtx.fill();
        drawingCtx.lineWidth = 5;
        drawingCtx.strokeStyle = '#003300';
        drawingCtx.stroke();    
        lastX = rX;
        lastY = rY;
    }
    else {
        //drawingCtx.fillStyle = 'red';
        //drawingCtx.fillRect(lastX-10,lastY-10,20,20);
        drawingCtx.arc(lastX+10, lastY+10, 20, 0, 2 * Math.PI, false);
        drawingCtx.fillStyle = 'blue';
        drawingCtx.fill();
        drawingCtx.lineWidth = 5;
        drawingCtx.strokeStyle = '#003300';
        drawingCtx.stroke();    
    }
    //drawingCtx.restore();
    */
    
    drawingCtx.save();

    if(lerp(lastX, lastY, rX, rY)) {
        drawingCtx.fillRect(rX-10,rY-10,20,20);
        lastX = rX;
        lastY = rY;
    } else {
        drawingCtx.fillRect(lastX-10,lastY-10,20,20);
    }

    drawingCtx.restore();
}

function lerp(prevX, prevY, newX, newY) {
    if(Math.abs(newX-prevX)>0.01 && Math.abs(newY-prevY)>0.01) {
        return true;
    } else {
        return false;
    }
}