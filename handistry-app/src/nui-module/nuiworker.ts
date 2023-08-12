// eslint-disable-next-line import/no-anonymous-default-export
export default async() => {    

    // eslint-disable-next-line no-restricted-globals
    // importScripts("test.js");

    onmessage = (e: any) => {
        if (e.data.status=="IMPORT") {
        }
        //@ts-ignore
        // console.log(gestureRecognizer);
        console.log(e.data.worker);
        // const gestureRecognitionResult = gestureRecognizer.recognizeForVideo();
        // postMessage(gestureRecognitionResult);
    }
}