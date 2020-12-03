import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TimeForm = ({ setTimeValue }) => {
  const [ activeTab, setActivetab ] = useState('hh');
  const [ hhValue, setHhValue ] = useState('');
  const [ mmValue, setMmValue ] = useState('');
  const inputHhEl = useRef(null);
  const inputMmEl = useRef(null);

  useEffect(() => {
    inputHhEl.current.focus(inputHhEl);
  }, []);

  useEffect(() => {
    setTimeValue(`${hhValue}:${mmValue}`);
  }, [hhValue, mmValue, setTimeValue]);

  const onHhChange = ({ target: { value } }) => {
    setHhValue(value);
  }

  const onMmChange = ({ target: { value } }) => {
    setMmValue(value);
  }

  const onHhBtnClick = ({ target: { value } }) => {
    console.log('click');
    setHhValue(value);
    inputMmEl.current.focus();
  }

  const onMmBtnClick = ({ target: { value } }) => {
    setMmValue(value);
  }

  const hhValueBtns = [];
  for (let hr = 0; hr <= 23; hr++) {
    // TODO handle black listed times
    let zeroPadHr = (hr < 10) ? `0${hr}` : `${hr}`;
    hhValueBtns.push(
      <li className="time-form__time-item">
        <button 
          key={`hh-val-btn-${zeroPadHr}`} 
          type="button"
          className="time-form__value-btn"
          value={zeroPadHr}
          onClick={onHhBtnClick}
        ><strong>{zeroPadHr}</strong>:{mmValue || '00'}</button>
      </li>
    );
  }

  const mmValueBtns = [];
  for (let min = 0; min <= 45; min += 15) {
    let zeroPadMin = (min < 10) ? `0${min}` : `${min}`;
    mmValueBtns.push(
      <li className="time-form__time-item">
        <button 
          key={`hh-val-btn-${zeroPadMin}`} 
          type="button"
          className="time-form__value-btn"
          value={zeroPadMin}
          onClick={onMmBtnClick}
        >{hhValue || '00'}:<strong>{zeroPadMin}</strong></button>
      </li>
    );
  }

  const tabClasses = tabType => classNames('time-form__tab', { 'time-form__tab--active': (tabType === activeTab ) })

  return (
    <section className="time-form">
      <ul role="tablist" className="time-form__tabs" aria-label="Time Form">
        <li className={tabClasses('hh')}>
          <input 
            type="text"
            className="time-form__input"
            value={hhValue}
            ref={inputHhEl}
            placeholder="--"
            onChange={onHhChange}
            onFocus={() => setActivetab('hh')} 
          />
        </li>
        <li className="time-form__semi">:</li>
        <li className={tabClasses('mm')}>
          <input
            type="text"
            className="time-form__input"
            value={mmValue}
            ref={inputMmEl}
            placeholder="--"
            onChange={onMmChange}
            onFocus={() => setActivetab('mm')}
          />
        </li>
      </ul>

      <div className={classNames('time-form__panel', { 'time-form__panel--active': (activeTab === 'hh') })}>
        <ul className="time-form__times-list">{hhValueBtns}</ul>
      </div>

      <div className={classNames('time-form__panel', { 'time-form__panel--active': (activeTab === 'mm') })}>
      <ul className="time-form__times-list">{mmValueBtns}</ul>
      </div>
      
    </section>
  );
}
TimeForm.prototype = {
  setTimeValue: PropTypes.func.isRequired
}

export default TimeForm;
