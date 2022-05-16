export function setVisualTime(current, offset) {
  const timeUTC = current + ((offset - getTimeZone) * 60 * 60 * 1000);
  const degs = { onMinSec: 360 / 60, onHour: 360 / 12, }
  return [
    (new Date(timeUTC)).getHours() * degs.onHour + ((new Date(timeUTC)).getMinutes()*degs.onHour/60),
    (new Date(timeUTC)).getMinutes() * degs.onMinSec,
    (new Date(timeUTC)).getSeconds() * degs.onMinSec
  ];
}

export const getTimeZone = (new Date()).getTimezoneOffset() / 60;
