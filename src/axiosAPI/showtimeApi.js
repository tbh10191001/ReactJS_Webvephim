import { axiosInstance, axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const getShowtimeByID = async ({ maphim }) => {
    try {
        const response = await axiosInstance.get(`showtime/${maphim}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const getShowtimes = async () => {
    try {
        const response = await axiosInstance.get('showtime/');
        return response;
    } catch (err) {
        return err;
    }
};

export const getShowtimeInfoByID = async (masuatchieu) => {
    try {
        const response = await axiosInstance.get(
            `showtime/info/${masuatchieu}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
export const getTimeByIDRoom = async ({ maphongchieu }) => {
    try {
        const response = await axiosInstance.get(
            `showtime/room/${maphongchieu}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
export const getShowtimeDate = async ({ maphim }) => {
    try {
        const response = await axiosInstance.get(`showtime/date/${maphim}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const getCinemaByDate = async ({ ngaychieu }) => {
    try {
        const response = await axiosInstance.get(
            `showtime/cinema/${ngaychieu}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};

export const getTimeByDate = async ({ ngaychieu }) => {
    try {
        const response = await axiosInstance.get(`showtime/time/${ngaychieu}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const addShowtime = async ({
    thoigianbatdau,
    giavemacdinh,
    maphim,
    maphongchieu,
}) => {
    try {
        const response = await axiosInstanceHeaders.post('showtime/add', {
            thoigianbatdau: thoigianbatdau,
            giavemacdinh: giavemacdinh,
            maphim: maphim,
            maphongchieu: maphongchieu,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const getShowtimesStaff = async ({ maphongchieu }) => {
    try {
        const response = await axiosInstanceHeaders.get(
            `showtime/staff/${maphongchieu}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
