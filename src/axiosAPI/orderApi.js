import { axiosInstance, axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const getOrders = async () => {
    try {
        const response = await axiosInstanceHeaders.get('order/');
        return response;
    } catch (err) {
        return err;
    }
};
export const getOrderDetail = async (mahoadon) => {
    try {
        console.log('mahoadon', mahoadon);
        const response = await axiosInstanceHeaders.get(`order/${mahoadon}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const refund = async ({
    zpTransID,
    amount,
    description,
    mahoadon,
    seats,
    ngaychieu,
    giochieu,
}) => {
    try {
        const response = await axiosInstanceHeaders.post(`order/refund`, {
            zpTransID,
            amount,
            description,
            mahoadon,
            seats,
            ngaychieu,
            giochieu,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const refundStatus = async (mRefundID, mahoadon) => {
    try {
        const response = await axiosInstanceHeaders.post(`order/refundstatus`, {
            mrefundid: mRefundID,
            mahoadon: mahoadon,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const payment = async ({ giatongcong, masuatchieu, list }) => {
    try {
        console.log(giatongcong, masuatchieu, list);

        const response = await axiosInstanceHeaders.post('order/payment', {
            giatongcong: giatongcong,
            masuatchieu: masuatchieu,
            list: list,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const paymentStatus = async ({
    appTransId,
    masuatchieu,
    totalPrice,
    seatPick,
}) => {
    try {
        console.log(appTransId);
        const response = await axiosInstanceHeaders.post(
            `order/zalostatus/${appTransId}`,
            {
                masuatchieu: masuatchieu,
                giatongcong: totalPrice,
                list: seatPick,
            },
        );
        return response;
    } catch (err) {
        return err;
    }
};
