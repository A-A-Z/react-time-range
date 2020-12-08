import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { zeroPadUnit } from '../helpers/format';

const TimeForm = ({ isOpen, startTime, timeValue, suggestTimes, setTimeValue }) => {
  const [ defaultHhValue, defaultMmValue ] = timeValue.split(':');
  // const [ activeTab, setActivetab ] = useState('hh');
  const [ hhValue, setHhValue ] = useState(defaultHhValue);
  const [ mmValue, setMmValue ] = useState(defaultMmValue);
  const inputHhEl = useRef(null); // ref for hours input
  const inputMmEl = useRef(null); // ref for minutes input

  // On load: focus on HH
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputHhEl.current.focus();
      }, 100)
    }
  }, [isOpen]);

  useEffect(() => {
    const [ newHhValue = '', newMmValue = '' ] = timeValue.split(':');
    setHhValue(newHhValue);
    setMmValue(newMmValue)
  }, [ timeValue, setHhValue, setMmValue ]);

  // On value update: update total time value 
  useEffect(() => {
    setTimeValue(`${hhValue}:${mmValue}`);
  }, [hhValue, mmValue, setTimeValue]);

  // On hours update: if hours is two digits than focus on minutes 
  useEffect(() => {
    if (hhValue.length >= 2 && document.activeElement === inputHhEl.current) {
      inputMmEl.current.focus();
    }
  }, [hhValue]);

  // On Hours input change
  const onHhChange = ({ target: { value } }) => {
    let newValue =  /^\d{0,2}$/.test(value) ? value : '';
    const valueInt = parseInt(newValue);

    // hours can't be more then 23
    if (valueInt > 23) {
      newValue = '23';
    }

    // if the first digit is more then 2 than assume it's zero padded (eg '09')
    if (valueInt > 2 && newValue.length === 1) {
      newValue = zeroPadUnit(newValue)
    }

    setHhValue(newValue);
  }

  // On Hours input focus
  const onHhFocus = ({ target }) => {
    // setActivetab('hh');
    target.select();
  }

  // On Hours input blur
  const onHhBlur = () => {
    // number should be zero padded
    if (hhValue.length === 1) {
      setHhValue(zeroPadUnit(hhValue));
    }
  }

  // On Minutes input change
  const onMmChange = ({ target: { value } }) => {
    let newValue =  /^\d{0,2}$/.test(value) ? value : '';
    const valueInt = parseInt(newValue);

    // minutes can't be more then 59
    if (valueInt > 59) {
      newValue = '59';
    }

    // if the first digit is more then 5 than assume it's zero padded (eg '09')
    if (valueInt > 5 && newValue.length === 1) {
      newValue = zeroPadUnit(newValue);
    }

    setMmValue(newValue);
  }

  // On Minutes input blue
  const onMmBlur = () => {
    console.log('focus mm');
    // number should be zero padded
    if (mmValue.length === 1) {
      setMmValue(zeroPadUnit(mmValue));
    }

    // mins should not be blank if hours is set
    if (mmValue === '' && hhValue !== '') {
      setMmValue('00');
    }
  }

  // On Minutes input focus
  const onMmFocus = ({ target }) => {
    // setActivetab('mm');

    target.select();
  }

  const onSuggestClick = ({ target: { value } }) => {
    console.log('click', value);
    setTimeValue(value); // FIX
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="time-form">

      <div className="time-form__fields">
        <input 
          type="text"
          className="time-form__input"
          value={hhValue}
          ref={inputHhEl}
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={onHhChange}
          onFocus={onHhFocus}
          onBlur={onHhBlur}
        />
        <span className="time-form__semi">:</span>
        <input
          type="text"
          className="time-form__input"
          value={mmValue}
          ref={inputMmEl}
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={onMmChange}
          onFocus={onMmFocus}
          onBlur={onMmBlur}
        />
      </div>

      <div className="suggestions">
        <h2 className="suggestions__title">Suggestions</h2>

        <ul className="suggestions__list">
          {suggestTimes.filter(time => true /* TODO: fitler by starting time */).map(time => (
            <li key={`time-${time}`} className="suggestions__item">
              <button 
                className="suggestions__time-btn"
                value={time}
                onClick={onSuggestClick}
              >{time}</button>
            </li>
          ))}
        </ul>

      </div>

    </section>
  );
}
TimeForm.prototype = {
  isOpen: PropTypes.bool,
  startTime: PropTypes.string,
  timeValue: PropTypes.string.isRequired,
  suggestTimes: PropTypes.arrayOf(PropTypes.string),
  setTimeValue: PropTypes.func.isRequired
}
TimeForm.defaultProps = {
  isOpen: false,
  startTime: '',
  suggestTimes: []
}

export default TimeForm;
