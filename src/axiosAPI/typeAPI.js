import { axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const getStatisticalTicket = async ({ matheloaiphim }) => {
    try {
        const response = await axiosInstanceHeaders.get(
            `type/statistical/${matheloaiphim}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
