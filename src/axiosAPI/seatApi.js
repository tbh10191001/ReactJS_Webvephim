import { axiosInstance } from '~/configs/axios';

export const getSeatByIDRoom = async ({ maphongchieu }) => {
    try {
        const response = await axiosInstance.get(`seat/${maphongchieu}`);
        return response;
    } catch (err) {
        return err;
    }
};
