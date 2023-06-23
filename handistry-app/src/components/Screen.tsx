/*------------
   IMPORTS
------------*/
import React from 'react';
import '../styles/style.css';

interface ScreenProps {
  index: number;
  children: React.ReactNode;
};

/* A parent component for a Screen. */
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
