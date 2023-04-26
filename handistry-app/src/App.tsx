import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';
import GraduatedSideview from './components/GraduatedSideview';
import Background from './components/Background';

function App() {

  useEffect(() => {
    document.title = "Handistry"
  }, []);
  return (
    <div className="App">
      <Background/>
      <ScreenContainer/>
      <GraduatedSideview 
        graduations={[300,200,100]}
      />
    </div>
  );
}

export default App;
