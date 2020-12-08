import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/app.scss'
import TimeRangeModel from './TimeRangeModel';
import { zeroPadTime } from '../helpers/format';

const TimeRange = ({ startTimeValue, endTimeValue }) => {

  const [ isModelOpen, setIsModelOpen ] = useState(false);
  const [ startTime, setStartTime ] = useState(zeroPadTime(startTimeValue));
  const [ endTime, setEndTime ] = useState(zeroPadTime(endTimeValue));

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

  return (
    <>
      <button onClick={toggleModel}>{startTime} - {endTime} | Open</button>

      <TimeRangeModel
        startTimeValue={startTime}
        endTimeValue={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        isOpen={isModelOpen}
        onClose={toggleModel}
      />
    </>
  );
}
TimeRange.propTypes = {
  startTimeValue: PropTypes.string,
  endTimeValue: PropTypes.string
}
TimeRange.defaultProps = {
  startTimeValue: '',
  endTimeValue: ''
}

export default TimeRange;
