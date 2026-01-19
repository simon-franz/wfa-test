import { deleteCookie as deleteCookieNext, getCookie as getCookieNext, setCookie as setCookieNext } from 'cookies-next';

import type {
  CookieOptions,
  DeleteCookieClient,
  GetBooleanCookieClient,
  GetCookieClient,
  SetBooleanCookieClient,
  SetCookieClient,
} from './cookies.types';

export const setCookie: SetCookieClient = (name, value, options = {}) => {
  const defaults: CookieOptions = {
    path: '/',
    secure: true,
    sameSite: 'strict',
  };

  const finalOptions = { ...defaults, ...options };

  setCookieNext(name, value, finalOptions);
};

export const getCookie: GetCookieClient = (name) => {
  const value = getCookieNext(name);

  return value?.toString() || null;
};

export const deleteCookie: DeleteCookieClient = (name, options = {}) => {
  deleteCookieNext(name, options);
};

export const getBooleanCookie: GetBooleanCookieClient = (name) => {
  const value = getCookie(name);

  return value === 'true';
};

export const setBooleanCookie: SetBooleanCookieClient = (name, value, options = {}) => {
  setCookie(name, value.toString(), options);
};
