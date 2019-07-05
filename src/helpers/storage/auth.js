import http from 'http/index';

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem('BUTLERS-Token'));
  http.defaults.headers.Authorization = `Bearer ${token}`;
  return token;
};

export const getUser = () => JSON.parse(localStorage.getItem('BUTLERS-User'));

export const setUser = (user = getUser(), token = getToken()) => {
  localStorage.setItem('BUTLERS-User', JSON.stringify(user));
  localStorage.setItem('BUTLERS-Token', JSON.stringify(token));
  http.defaults.headers.Authorization = `Bearer ${token}`;
};

export const deleteUser = () => {
  localStorage.removeItem('BUTLERS-User');
  localStorage.removeItem('BUTLERS-Token');
  http.defaults.headers.Authorization = '';
};