import React, { useState } from 'react';
import '../styles/app.scss'

import TimeRangeModel from './TimeRangeModel';

const TimeRange = () => {
  const [ isModelOpen, setIsModelOpen ] = useState(false);

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

  return (
    <>
      <button onClick={toggleModel}>Open</button>
      <TimeRangeModel isOpen={isModelOpen} onClose={toggleModel} />
    </>
  );
}

export default TimeRange;
