import http from 'http/index';

export const authenticate = data => http.post('/auth/login', data).then(res => res.data);

export const blank = {};
