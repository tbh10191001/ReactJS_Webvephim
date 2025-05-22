import jwtDecode from 'jwt-decode';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const decodeToken = (accessToken) => {
    try {
        const decoded = jwtDecode(accessToken);
        return decoded;
    } catch (err) {
        return err;
    }
};

export const setAccessToken = (token, exp) => {
    setCookie('accessToken', token, { maxAge: exp });
};

export const getAccessToken = () => {
    const cookieValue = getCookie('accessToken');
    return cookieValue ? decodeURIComponent(cookieValue) : null;
};

export const deleteAccessToken = () => {
    return deleteCookie('accessToken');
};
