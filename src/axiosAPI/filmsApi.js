import { axiosInstance, axiosConfigClient } from '~/configs/axios';
const axiosInstanceHeaders = axiosConfigClient();

export const getFilms = async () => {
    try {
        const response = await axiosInstance.get('film/');
        return response;
    } catch (err) {
        return err;
    }
};

export const filterFilmType = async (type) => {
    try {
        const response = await axiosInstance.get(`film/type`, {
            params: { types: JSON.stringify(type) },
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const filterFilmName = async (searchName) => {
    try {
        const response = await axiosInstance.get(`film/search_name`, {
            params: { name: searchName },
        });
        return response;
    } catch (err) {
        return err;
    }
};
export const filterFilmDate = async (searchDate) => {
    try {
        const response = await axiosInstance.get(`film/search_date`, {
            params: { date: searchDate },
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const getTypeOfFilm = async () => {
    try {
        const response = await axiosInstance.get('film/gettype');
        return response;
    } catch (err) {
        return err;
    }
};

export const deleteFilm = async (maphim) => {
    try {
        const response = await axiosInstanceHeaders.delete(
            `film/delete/${maphim}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};
export const updateFilm = async ({
    id,
    tenphim,
    thoiluongchieu,
    ngaybatdauchieu,
    ngonngu,
    daodien,
    dienvien,
    mota,
    anhtitle,
    dotuoixem,
    trailer,
    theloaiphim,
}) => {
    try {
        const response = await axiosInstanceHeaders.patch(`film/update/${id}`, {
            tenphim: tenphim,
            thoiluongchieu: thoiluongchieu,
            ngaybatdauchieu: ngaybatdauchieu,
            ngonngu: ngonngu,
            daodien: daodien,
            dienvien: dienvien,
            mota: mota,
            anhtitle: anhtitle,
            dotuoixem: dotuoixem,
            trailer: trailer,
            theloaiphim: theloaiphim,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const getFilmByID = async ({ idphim }) => {
    try {
        const response = await axiosInstance.get(`film/${idphim}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const getRatingFilm = async ({ idphim }) => {
    try {
        const response = await axiosInstance.get(`film/getrating/${idphim}`);
        return response;
    } catch (err) {
        return err;
    }
};

export const getRatingFilmByCustomer = async ({ idphim }) => {
    try {
        const response = await axiosInstance.get(
            `film/ratingbycustomer/${idphim}`,
        );
        return response;
    } catch (err) {
        return err;
    }
};

export const ratingFilm = async ({ rating, idphim }) => {
    try {
        const response = await axiosInstance.post('film/rating', {
            diem: rating,
            maphim: idphim,
        });
        return response;
    } catch (err) {
        return err;
    }
};

export const insertFilm = async ({
    tenphim,
    thoiluongchieu,
    ngaybatdauchieu,
    ngonngu,
    daodien,
    dienvien,
    mota,
    anhtitle,
    dotuoixem,
    trailer,
    theloaiphim,
}) => {
    try {
        const response = await axiosInstanceHeaders.post('film/add', {
            tenphim: tenphim,
            thoiluongchieu: thoiluongchieu,
            ngaybatdauchieu: ngaybatdauchieu,
            ngonngu: ngonngu,
            daodien: daodien,
            dienvien: dienvien,
            mota: mota,
            anhtitle: anhtitle,
            dotuoixem: dotuoixem,
            trailer: trailer,
            theloaiphim: theloaiphim,
        });
        return response;
    } catch (err) {
        return err;
    }
};
