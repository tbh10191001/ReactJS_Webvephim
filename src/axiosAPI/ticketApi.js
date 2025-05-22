import { axiosInstance, axiosInstanceHeaders } from '~/configs/axios';

export const getListTickets = async ({ masuatchieu }) => {
    try {
        const response = await axiosInstance.get(`ticket/${masuatchieu}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const deleteTicket = async ({ token, mave, giatongcong }) => {
    try {
        const response = await axiosInstance.post('sticket/deleteticket', {
            token: token,
            mave: mave,
            giatongcong: giatongcong,
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const deleteTicketByStaff = async ({
    token,
    mave,
    giatongcong,
    sdtkhachhang,
}) => {
    try {
        const response = await axiosInstance.post(
            'sticket/deleteticketbystaff',
            {
                token: token,
                mave: mave,
                giatongcong: giatongcong,
                sdtkhachhang: sdtkhachhang,
            },
        );
        return response;
    } catch (err) {
        return err;
    }
};
export const getTickets = async ({ token }) => {
    try {
        const response = await axiosInstance.post('sticket/gettickets', {
            token: token,
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const getTicketsByID = async ({ token, mave }) => {
    try {
        const response = await axiosInstance.post('sticket/getticketbyid', {
            token: token,
            mave: mave,
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const getTicketInfosByID = async ({ mave }) => {
    try {
        const response = await axiosInstance.post('sticket/getticketinfobyid', {
            mave: mave,
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const acceptedTicket = async ({ token, mave, email }) => {
    try {
        const response = await axiosInstance.post('sticket/accetpedticket', {
            token: token,
            mave: mave,
            email: email,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const checkinTicket = async ({ mave }) => {
    try {
        const response = await axiosInstance.post('sticket/checkinticket', {
            mave: mave,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const getTicketStatistical = async (type) => {
    try {
        const response = await axiosInstance.get(`/statistical/${type}`);
        return response;
    } catch (err) {
        return err;
    }
};
