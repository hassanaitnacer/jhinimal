export const TOKEN_KEY = process.env.REACT_APP_JWT_KEY;

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getSession = () => localStorage.getItem(TOKEN_KEY);
