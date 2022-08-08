// ----------------------------------------------------------------------

const path = (root, sublink) => `${root}/${sublink}`;

// SETUP ROOTS
const ROOTS_AUTH = '/auth';
const ROOTS_ACCOUNT = '/account';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_MAIN = {
  root: '/',
  home: '/home',
  notFound: '/404',
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signIn: path(ROOTS_AUTH, 'sign-in'),
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  user: {
    root: path(ROOTS_ADMIN, 'users'),
    create: path(ROOTS_ADMIN, 'users/create'),
  },
};

export const PATH_ACCOUNT = {
  root: ROOTS_ACCOUNT,
  reset: {
    request: path(ROOTS_ACCOUNT, 'reset/request'),
    finish: path(ROOTS_ACCOUNT, 'reset/finish'),
  },
};
