import React from 'react';
import PropTypes from 'prop-types';

const TimeRangeModel = ({ isOpen, onClose }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="time-range-model" role="presentation">

      <div className="time-range-model__container">
        <button onClick={onClose}>X</button>
        Model
      </div>
    </div>
  );
}
TimeRangeModel.prototype = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TimeRangeModel;
