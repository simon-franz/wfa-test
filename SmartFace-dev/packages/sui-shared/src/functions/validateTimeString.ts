export function isValidTimeString(timeString: string): boolean {
  const parts = timeString.split(':');

  if (parts.length !== 2 && parts.length !== 3) {
    return false;
  }

  const [hours, minutes, seconds] = parts.map(Number);

  const isValidHour = hours >= 0 && hours <= 23;
  const isValidMinute = minutes >= 0 && minutes <= 59;
  const isValidSecond = seconds === undefined || (seconds >= 0 && seconds <= 59);

  return isValidHour && isValidMinute && isValidSecond;
}
