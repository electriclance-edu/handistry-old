importScripts("import-test.js");

onmessage = (e) => {
    console.log("got from mainthread", e.data);
    console.log(a);
    postMessage(e.data);
}