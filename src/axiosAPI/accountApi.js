import { axiosInstance, axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const login = async ({ email, matkhau }) => {
    try {
        const response = await axiosInstance.post('account/login', {
            email: email,
            matkhau: matkhau,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const signup = async ({
    email,
    matkhau,
    sdt,
    hoten,
    gioitinh,
    cccd,
}) => {
    try {
        const response = await axiosInstance.post('account/signup', {
            email: email,
            matkhau: matkhau,
            sdt: sdt,
            hoten: hoten,
            gioitinh: gioitinh,
            cccd: cccd,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const changePassword = async ({ matkhau, matkhaumoi }) => {
    try {
        const response = await axiosInstanceHeaders.patch(
            'account/changepassword',
            {
                matkhau: matkhau,
                matkhaumoi: matkhaumoi,
            },
        );
        return response;
    } catch (err) {
        return err;
    }
};

export const deleteAccountByStaff = async ({ sdt }) => {
    try {
        const response = await axiosInstanceHeaders.delete(
            `account/delete/${sdt}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};

export const forgetPassword = async ({ email }) => {
    try {
        const response = await axiosInstance.post('account/forgetpassword', {
            email: email,
        });
        return response;
    } catch (err) {
        return err;
    }
};
