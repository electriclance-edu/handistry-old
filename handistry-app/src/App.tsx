import React, {useEffect} from 'react';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "Handistry"
  }, []);
  return (
    //Code here the main app component
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>srcasdasdads/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Deez Nuts
        </a>
      </header>
    </div>
  );
}

export default App;
