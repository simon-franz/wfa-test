import { casePropsButtonColorWarning, casePropsButtonWithLeftIcon } from '../exampleData/Button/ButtonCaseProps';
import {
  casePropsCardFullHeight,
  casePropsCardOnClick,
  casePropsCardWithFooter,
} from '../exampleData/Card/CardCaseProps';
import { casePropsPageWithModal } from '../exampleData/Page/PageCaseProps';

export const caseMap = {
  ButtonColorWarning: casePropsButtonColorWarning,
  ButtonWithLeftIcon: casePropsButtonWithLeftIcon,
  CardFullHeight: casePropsCardFullHeight,
  CardOnClick: casePropsCardOnClick,
  CardWithFooter: casePropsCardWithFooter,
  PageWithModal: casePropsPageWithModal,
} as const;
