import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';
import GraduatedSideview from './components/GraduatedSideview';
import Background from './components/Background';

var hasNotChangedScreenInTheLast500Milliseconds : boolean = true;

function App() {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    document.title = "Handistry"
  }, []);
  return (
    <div className="App">
      <Background/>
      <ScreenContainer screen={screen}/>
      <GraduatedSideview 
        graduations={[300,200,100]}
      />
      <div className="ToPreviousScreen flex-centered" onMouseOver={(e) => {
          attemptToSetScreen(clamp(screen - 1, 0, 2),setScreen)}
      }></div>
      <div className="ToNextScreen flex-centered" onMouseOver={(e) => {
          attemptToSetScreen(clamp(screen + 1, 0, 2),setScreen)}
      }></div>
    </div>
  );
}

function clamp(value : number, min : number, max : number) {
  return Math.max(Math.min(value, max), min);
}
function attemptToSetScreen(newScreen : number, setScreen : Function) {
  if (hasNotChangedScreenInTheLast500Milliseconds) {
    // console.log("newScreen",newScreen);
    setScreen(newScreen);
    hasNotChangedScreenInTheLast500Milliseconds = false;
    setTimeout(() => {
      hasNotChangedScreenInTheLast500Milliseconds = true;
    },500);
  }
  // } else {
  //   console.log("silly you, hasNotChangedScreenInTheLast500Milliseconds is",hasNotChangedScreenInTheLast500Milliseconds);
  // }
}

export default App;
