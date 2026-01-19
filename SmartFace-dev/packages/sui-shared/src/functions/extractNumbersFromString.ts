const extractNumbersFromString = (str: string): string => {
  return str.replace(/[^\d.].*/, '');
};

export default extractNumbersFromString;
