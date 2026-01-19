'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type AuthState = {
  error?: string;
  success?: boolean;
};

// TODO: Remove after Secondarie Utils Package is implemented
export const loginAction = async (_prevState: AuthState, formData: FormData): Promise<AuthState> => {
  const password = formData.get('passwort');

  if (!password) {
    return { error: 'Passwort ist erforderlich', success: false };
  }

  if (password === 'msfwab') {
    const awaitedCookies = await cookies();
    awaitedCookies.set('auth', password, {
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 99, // 99 days in seconds
      path: '/',
    });

    redirect('/');
  } else {
    return { error: 'Das Passwort ist leider falsch :(', success: false };
  }
};
