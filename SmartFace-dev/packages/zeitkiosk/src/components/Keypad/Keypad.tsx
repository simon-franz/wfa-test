import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { useContext } from 'react';

import { PinPadContext } from '../PinPad/PinPadContext';
import { S } from './Keypad.styles';
import type { KeypadProps } from './Keypad.types';
import { KeypadButton } from './KeypadButton/KeypadButton';

const PIN_LENGTH = 4;

export const Keypad = (props: KeypadProps) => {
  const { pinValue, setPinValue } = useContext(PinPadContext);

  const addDigit = (digit: string) =>
    pinValue.length < PIN_LENGTH && setPinValue((prevPinValue) => prevPinValue + digit);

  const backspace = () => setPinValue((prevPinValue) => prevPinValue.slice(0, -1));

  return (
    <S.Container {...props}>
      <KeypadButton onClick={() => addDigit('7')}>7</KeypadButton>
      <KeypadButton onClick={() => addDigit('8')}>8</KeypadButton>
      <KeypadButton onClick={() => addDigit('9')}>9</KeypadButton>
      <KeypadButton onClick={() => addDigit('4')}>4</KeypadButton>
      <KeypadButton onClick={() => addDigit('5')}>5</KeypadButton>
      <KeypadButton onClick={() => addDigit('6')}>6</KeypadButton>
      <KeypadButton onClick={() => addDigit('1')}>1</KeypadButton>
      <KeypadButton onClick={() => addDigit('2')}>2</KeypadButton>
      <KeypadButton onClick={() => addDigit('3')}>3</KeypadButton>
      <KeypadButton $isZero onClick={() => addDigit('0')}>
        0
      </KeypadButton>
      <KeypadButton $isBackspace onClick={backspace}>
        <FontAwesomeIcon variant="regular" name="delete-left" />
      </KeypadButton>
    </S.Container>
  );
};
