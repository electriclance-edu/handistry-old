import React from 'react';
import '../styles/style.css';

interface ScreenProps {
  index: number;
  children: React.ReactNode;
};

function Screen(props : ScreenProps) {
  return (
    <div className="screen">
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default Screen;
