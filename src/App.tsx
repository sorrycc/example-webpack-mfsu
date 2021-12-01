import React from 'react';
import ReactDOM from 'react-dom';
import Antd from './antd';
import FramerMotion from './framer-motion';

function App() {
  return (
    <div>
      <Antd />
      <FramerMotion />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
