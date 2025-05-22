import { axiosConfigClient, axiosInstance } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();
export const getCinemas = async () => {
    try {
        const response = await axiosInstance.get('cinema/');
        return response;
    } catch (err) {
        return err;
    }
};

export const getCinemaCity = async ({ id }) => {
    try {
        const response = await axiosInstance.get(`cinema/${id}`);
        return response;
    } catch (err) {
        return err;
    }
};
