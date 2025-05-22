import { axiosInstance, axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const getRoomByCinema = async ({ marapchieu }) => {
    try {
        const response = await axiosInstance.get(`room/${marapchieu}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const getRoomByStaff = async ({ marapchieu }) => {
    try {
        const response = await axiosInstanceHeaders.get(
            `room/staff/${marapchieu}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
export const getStatisticalTicket = async ({ maphongchieu }) => {
    try {
        const response = await axiosInstanceHeaders.get(
            `room/statistical/${maphongchieu}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
