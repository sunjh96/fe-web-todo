import axios from 'axios';

const baseURL = 'http://127.0.0.1:5500/';
const client = axios.create({ baseURL });

export default client;
