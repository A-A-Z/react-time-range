
export const zeroPadUnit = unit => (`${unit}`.length === 1) ? `0${unit}` : `${unit}`

export const zeroPadTime = timeString => {
  const [ hr, min ] = timeString.split(':');
  return `${zeroPadUnit(hr)}:${zeroPadUnit(min)}`;
}

export const timeToFloat = timeString => parseFloat(timeString.replace(':', '.'))
