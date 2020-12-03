import React, { useState } from 'react';
import '../styles/app.scss'

import TimeRangeModel from './TimeRangeModel';

const TimeRange = () => {
  const [ isModelOpen, setIsModelOpen ] = useState(true);
  const [ startTime, setStartTime ] = useState('--:--');
  const [ endTime, setEndTime ] = useState('--:--');

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }



  return (
    <>
      <button onClick={toggleModel}>{startTime} - {endTime} | Open</button>
      <TimeRangeModel
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        isOpen={isModelOpen}
        onClose={toggleModel}
      />
    </>
  );
}

export default TimeRange;
