import React from 'react';
import PropTypes from 'prop-types';
import TimeForm from './TimeForm';

const TimeRangeModel = ({ startTimeValue, endTimeValue, isOpen, setStartTime, setEndTime, onClose }) => {

  if (!isOpen) {
    return null;
  }

  const startTime = '09:00';
  const suggestStartTimes = [ '08:45', '09:15', '09:45', '10:15' ];

  return (
    <div className="time-range-model" role="presentation">

      <div className="time-range-model__container">
        <button onClick={onClose}>X</button>

        <TimeForm 
          timeValue={startTimeValue}
          startTime={startTime}
          isOpen={true}
          suggestTimes={suggestStartTimes}
          setTimeValue={setStartTime}
        />

        <TimeForm timeValue={endTimeValue} setTimeValue={setEndTime} isOpen={false} />

      </div>
    </div>
  );
}
TimeRangeModel.prototype = {
  startTimeValue: PropTypes.string.isRequired,
  endTimeValue: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TimeRangeModel;
