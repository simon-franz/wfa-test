import { createContext } from 'react';

import type { FormState } from './ApplicationForm.types';

export type ApplicationFormContext = {
  formState: FormState;
};

export const ApplicationFormContext = createContext<ApplicationFormContext>({} as ApplicationFormContext);
