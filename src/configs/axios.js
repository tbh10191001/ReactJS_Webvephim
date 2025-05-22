import axios from 'axios';
import { getCookie } from 'cookies-next';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const axiosConfigClient = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
            accept: 'application/json',
        },
    });
    instance.interceptors.request.use(function (config) {
        const token = getCookie('accessToken');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });
    return instance;
};
