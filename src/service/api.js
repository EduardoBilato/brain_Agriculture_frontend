import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.PUBLIC_BACK_URL ||'http://localhost:3001'}/api`,
});

export default api;