import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';
import GraduatedSideview from './components/GraduatedSideview';
import Background from './components/Background';
import './styles/style.css';

var hasNotChangedScreenInTheLast500Milliseconds : boolean = true;

export var WebCam = (
  <video id="webcam" width="100%" height="100%"></video>
);

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
      <div>{WebCam}</div>
      <div className="ToPreviousScreen flex-centered" onMouseOver={(e) => {
          attemptToSetScreen(clamp(screen - 1, 0, 3),setScreen)}
      }></div>
      <div className="ToNextScreen flex-centered" onMouseOver={(e) => {
          attemptToSetScreen(clamp(screen + 1, 0, 3),setScreen)}
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
