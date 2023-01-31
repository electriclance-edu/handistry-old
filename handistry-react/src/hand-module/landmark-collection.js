//input video stuff
const videoElement = document.getElementsByClassName('input_video')[0];
let videoWidth = document.getElementsByClassName('input_video')[0].clientWidth;
let videoHeight = document.getElementsByClassName('input_video')[0].clientHeight;

//annotated video stuff
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');


const hands = new Hands({locateFile: (file) => {
    // console.log('hands collecting');
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 3,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

function onResults(results) {
    // console.log('getting hand data');
    canvasElement.width = document.getElementsByClassName('input_video')[0].clientWidth-10;
    canvasElement.height = document.getElementsByClassName('input_video')[0].clientHeight;
    
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        console.log(results.multiHandLandmarks);
        for (const landmarks of results.multiHandLandmarks) {
            var pointer_x = landmarks[8].x;
            var pointer_y = landmarks[8].y;
            var pointer_z = landmarks[8].z;
            
            //console.log(pointer_x, pointer_y, pointer_z);
            drawOnScreen(pointer_x,pointer_y,pointer_z);

            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                            {color: '#00FF00', lineWidth: 3});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
        }
    }

    //const landmarks = results.multiLandMarks[0];
    
    canvasCtx.restore();
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
function drawOnScreen(x, y, z) { //for canvases, (0,0) is top left corner
    let drawingCanvas = document.getElementById('drawing_canvas');
    drawingCanvas.width = document.getElementsByClassName('drawing_container')[0].clientWidth;
    drawingCanvas.height = document.getElementsByClassName('drawing_container')[0].clientHeight;
    const drawingCtx = drawingCanvas.getContext('2d');

    //flipping x:
    x = 0.5 - (x-0.5);

    let rX = x*drawingCanvas.width;
    let rY = y*drawingCanvas.height;
    
    console.log(rX, rY);

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