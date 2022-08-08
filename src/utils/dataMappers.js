// ----------------------------------------------------------------------

export const ACCOUNT_STATUSES = {
  activated: 'Activated',
  banned: 'Banned',
};

export const USER_AUTHORITIES = {
  user: 'User',
  admin: 'Admin',
};

// ----------------------------------------------------------------------

export const mapUserStatus = (isActivated) => (isActivated ? ACCOUNT_STATUSES.activated : ACCOUNT_STATUSES.banned);

export const mapUserAuthority = (authority) => {
  switch (authority) {
    case 'ROLE_USER':
      return USER_AUTHORITIES.user;

    case 'ROLE_ADMIN':
      return USER_AUTHORITIES.admin;

    default:
      return null;
  }
};
