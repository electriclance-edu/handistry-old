onmessage = (e) => {
    console.log("got from mainthread", e.data);
    postMessage(e.data);
}