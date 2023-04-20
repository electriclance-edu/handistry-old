import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';
import GraduatedSideview from './components/GraduatedSideview';
import ObjectInformation from './components/ObjectInformation';

function App() {

  useEffect(() => {
    document.title = "Handistry"
  }, []);
  return (
    <div className="App">
      <ScreenContainer/>
      <GraduatedSideview 
        graduations={[300,200,100]}
      />
      <ObjectInformation/>
    </div>
  );
}

export default App;
