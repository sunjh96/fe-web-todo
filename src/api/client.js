import { SERVER_URL } from '../constants/TODO.js';

const baseURL = SERVER_URL;

const client = axios.create({
  baseURL,
});

export { client };
