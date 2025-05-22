import { axiosInstance, axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const updateInfo = async ({ hoten, gioitinh, cccd }) => {
    try {
        const response = await axiosInstanceHeaders.patch('user/update', {
            hoten: hoten,
            gioitinh: gioitinh,
            cccd: cccd,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const updateInfoCustomer = async ({ hoten, gioitinh, cccd, sdt }) => {
    try {
        const response = await axiosInstanceHeaders.patch(
            'user/update/customer',
            {
                hoten: hoten,
                gioitinh: gioitinh,
                cccd: cccd,
                sdt: sdt,
            },
        );
        return response;
    } catch (err) {
        return err;
    }
};
export const getInfo = async () => {
    try {
        const response = await axiosInstanceHeaders.get('user/');
        return response;
    } catch (err) {
        return err;
    }
};

export const getInfoCustomer = async () => {
    try {
        const response = await axiosInstance.get(`user/`);
        return response;
    } catch (err) {
        return err;
    }
};
export const getInfoCustomerBySDT = async (sdt) => {
    try {
        const response = await axiosInstanceHeaders.get(`user/customer/${sdt}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const getOrders = async ({ token }) => {
    try {
        const response = await axiosInstance.post('user/getstikcetsbytoken', {
            token: token,
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const getCustomerAccount = async () => {
    try {
        const response = await axiosInstanceHeaders.get(
            'user/customer/account',
        );
        return response;
    } catch (err) {
        return err;
    }
};

export const getCustomerInformation = async () => {
    try {
        const response = await axiosInstanceHeaders.get(
            'user/customer/information',
        );
        return response;
    } catch (err) {
        return err;
    }
};
