// import { expose } from 'comlink';
// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (e) => {
        console.log("got from mainthread", e);
        postMessage(e.data);
    }    
}