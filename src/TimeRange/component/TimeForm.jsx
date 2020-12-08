import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { zeroPadUnit, timeToFloat } from '../helpers/format';

const TimeForm = ({ isOpen, startTime, timeValue, suggestTimes, setTimeValue }) => {
  const [ defaultHhValue, defaultMmValue ] = timeValue.split(':');
  // console.log('test', hh, mm);
  const [ activeTab, setActivetab ] = useState('hh');
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
    setActivetab('hh');
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
    setActivetab('mm');
    target.select();
  }

  const onHhBtnClick = ({ target: { value } }) => {
    setHhValue(value);
    inputMmEl.current.focus();
  }

  const onMmBtnClick = ({ target: { value } }) => {
    setMmValue(value);
    // TODO to something after
  }

  console.log('suggestTimes', suggestTimes);

  const hhValueBtns = [];
  for (let hr = 0; hr <= 23; hr++) {
    const zeroPadHr = zeroPadUnit(hr);
    const timeAsFlaot = timeToFloat(`${zeroPadHr}:00`);
    

    // console.log('float', `${zeroPadHr}:${mmValue || '00'}`, timeToFloat(`${zeroPadHr}:${mmValue || '00'}`) > timeToFloat(startTime));

    if (timeAsFlaot > timeToFloat(startTime)) {
      hhValueBtns.push(
        <li className="time-form__time-item" key={`hh-val-item-${zeroPadHr}`}>
          <button 
            type="button"
            className="time-form__value-btn"
            value={zeroPadHr}
            onClick={onHhBtnClick}
          ><strong>{zeroPadHr}</strong>:{mmValue || '00'}</button>
        </li>
      );
    }
  }

  const mmValueBtns = [];
  for (let min = 0; min <= 45; min += 15) {
    let zeroPadMin = zeroPadUnit(min);
    mmValueBtns.push(
      <li className="time-form__time-item" key={`hh-val-item-${zeroPadMin}`} >
        <button 
          type="button"
          className="time-form__value-btn"
          value={zeroPadMin}
          onClick={onMmBtnClick}
        >{hhValue || '00'}:<strong>{zeroPadMin}</strong></button>
      </li>
    );
  }

  const tabClasses = tabType => classNames('time-form__tab', { 'time-form__tab--active': (tabType === activeTab ) })

  if (!isOpen) {
    return null;
  }

  return (
    <section className="time-form">
      <ul role="tablist" className="time-form__tabs" aria-label="Time Form">
        <li className={tabClasses('hh')}>
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
        </li>
        <li className="time-form__semi">:</li>
        <li className={tabClasses('mm')}>
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
        </li>
      </ul>

      <div className={classNames('time-form__panel', { 'time-form__panel--active': (activeTab !== 'xxxxhh') })}>
        <ul className="time-form__times-list">
          <li className="time-form__time-item">
            <button 
              type="button"
              className="time-form__value-btn"
              value={'09:30'}
              onClick={() => {}}
            >09:30</button>
          </li>
        </ul>
      </div>

      <div className={classNames('time-form__panel', { 'time-form__panel--active': (activeTab === 'xhh') })}>
        <ul className="time-form__times-list">{hhValueBtns}</ul>
      </div>

      <div className={classNames('time-form__panel', { 'time-form__panel--active': (activeTab === 'xmm') })}>
      <ul className="time-form__times-list">{mmValueBtns}</ul>
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
