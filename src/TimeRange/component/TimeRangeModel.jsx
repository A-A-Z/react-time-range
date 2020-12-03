import React from 'react';
import PropTypes from 'prop-types';
import TimeForm from './TimeForm';

const TimeRangeModel = ({ isOpen, setStartTime, onClose }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="time-range-model" role="presentation">

      <div className="time-range-model__container">
        <button onClick={onClose}>X</button>

        <TimeForm setTimeValue={setStartTime} />

      </div>
    </div>
  );
}
TimeRangeModel.prototype = {
  isOpen: PropTypes.bool.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TimeRangeModel;
