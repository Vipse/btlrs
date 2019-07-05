import axios from 'axios';

const baseUrl = ""; //Need to input after backend deploy

const http = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export default http;
