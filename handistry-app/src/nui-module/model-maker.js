import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

var vision, gestureRecognizer;

export default async function makeModel() {

    console.log(window.location.pathname);
    vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "CPU"
        },
        runningMode: "VIDEO"
    });
}

