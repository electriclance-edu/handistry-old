const myWorker = new Worker("worker.js");
    
myWorker.onmessage = (e) => {
    console.log("got from worker", e.data);
}

myWorker.postMessage("bruh");