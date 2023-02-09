import React, {useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';

function App() {
  useEffect(() => {
    document.title = "Handistry"
  }, []);
  return (
    <div className="App">
      <ScreenContainer/>
    </div>
  );
}

export default App;
