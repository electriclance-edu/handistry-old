export default class WorkerBuilder {  
  
  constructor(worker) {
      const code = worker.toString();
      const blob = new Blob([`(${code})()`]);
      const w = new Worker(URL.createObjectURL(blob));
      return w;
    }
  }