import { FALLBACK_IMAGE_BASE64 } from '@hrworks/sui-shared/constants';
import type { InputHTMLAttributes } from 'react';

import { S } from './mockComponents.styles';

const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <S.Checkbox data-cy="cy-checkbox" data-cy-type="cy-test-element" type="checkbox" {...props} />
);

export const mockComponents = {
  Badge: (
    <S.Badge data-cy="cy-badge" data-cy-type="cy-test-element">
      Badge
    </S.Badge>
  ),
  BadgeFullHeight: (
    <S.Badge fullHeight data-cy="cy-badge" data-cy-type="cy-test-element">
      FullHeight Badge
    </S.Badge>
  ),
  Button: (
    <S.Button data-cy="cy-button" data-cy-type="cy-test-element">
      Click me
    </S.Button>
  ),
  Checkbox,
  CheckboxGroup: (
    <div data-cy="cy-checkbox-group" data-cy-type="cy-test-element">
      <Checkbox id="cb1" name="cb" value="1" />
      <label htmlFor="cb1" style={{ marginLeft: '4px' }}>
        Option 1
      </label>
      <br />
      <Checkbox id="cb2" name="cb" value="2" />
      <label htmlFor="cb2" style={{ marginLeft: '4px' }}>
        Option 2
      </label>
      <br />
      <Checkbox id="cb3" name="cb" value="3" />
      <label htmlFor="cb3" style={{ marginLeft: '4px' }}>
        Option 3
      </label>
    </div>
  ),
  DateField: <S.Input data-cy="cy-datefield" data-cy-type="cy-test-element" type="date" />,
  DecimalField: <S.Input data-cy="cy-decimalfield" data-cy-type="cy-test-element" type="number" step="0.01" />,
  Icon: (
    <S.Icon data-cy="cy-icon" data-cy-type="cy-test-element" role="img" aria-label="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
    </S.Icon>
  ),
  Image: <S.Image data-cy="cy-image" data-cy-type="cy-test-element" src={FALLBACK_IMAGE_BASE64} alt="Test Image" />,
  Input: <S.Input data-cy="cy-input" data-cy-type="cy-test-element" type="text" name="vorname" placeholder="Vorname" />,
  IntegerField: <S.Input data-cy="cy-integerfield" data-cy-type="cy-test-element" type="number" step="1" />,
  Link: (
    <S.Link data-cy="cy-link" data-cy-type="cy-test-element" href="#">
      Dummy Link
    </S.Link>
  ),
  PasswordField: (
    <S.Input data-cy="cy-passwordfield" data-cy-type="cy-test-element" type="password" placeholder="Password" />
  ),
  RadioGroup: (
    <S.RadioGroup data-cy="cy-radio-group" data-cy-type="cy-test-element">
      <S.Checkbox type="radio" id="r1" name="radio" value="1" />
      <label htmlFor="r1" style={{ marginLeft: '4px' }}>
        Option 1
      </label>
      <br />
      <S.Checkbox type="radio" id="r2" name="radio" value="2" />
      <label htmlFor="r2" style={{ marginLeft: '4px' }}>
        Option 2
      </label>
      <br />
      <S.Checkbox type="radio" id="r3" name="radio" value="3" />
      <label htmlFor="r3" style={{ marginLeft: '4px' }}>
        Option 3
      </label>
    </S.RadioGroup>
  ),
  Select: (
    <S.Select data-cy="cy-select" data-cy-type="cy-test-element">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </S.Select>
  ),
  Textarea: <S.Textarea data-cy="cy-textarea" data-cy-type="cy-test-element" placeholder="Enter text" />,
  TextField: <S.Input data-cy="cy-textfield" data-cy-type="cy-test-element" type="text" placeholder="Enter text" />,
  TimeField: <S.Input data-cy="cy-timefield" data-cy-type="cy-test-element" type="time" />,
};
