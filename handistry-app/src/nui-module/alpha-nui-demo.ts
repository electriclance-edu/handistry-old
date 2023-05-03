import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let handLandmarker = undefined;
let runningMode = "IMAGE";
let enableWebcamButton: HTMLButtonElement;
let webcamRunning: Boolean = false;
const videoHeight = "360px";
const videoWidth = "480px";

const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-11/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `handistry-app/src/nui-module/hand_landmarker.task`
      },
      //@ts-ignore
      runningMode: runningMode,
      numHands: 2
    });
    console.log("success setting up landmarker");
  }
createHandLandmarker();

async function predictHands(video: any) {
    
}

export default predictHands;