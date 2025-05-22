export const dataCustomer = (customer) => {
    return {
        type: '/customer/save',
        payload: customer,
    };
};

export const updateInfoCustomer = (customer) => {
    return {
        type: '/customer/updateInfo',
        payload: customer,
    };
};

export const saveStaff = (staff) => {
    return {
        type: '/staff/save',
        payload: staff,
    };
};

export const updateInfoStaff = (staff) => {
    return {
        type: '/staff/updateInfo',
        payload: staff,
    };
};

export const dataFilms = (films) => {
    return {
        type: '/films/saveFilms',
        payload: films,
    };
};

export const dataCinemas = (cinemas) => {
    return {
        type: '/cinemas/saveCinemas',
        payload: cinemas,
    };
};

export const dataShowtime = (showtime) => {
    return {
        type: '/showtime/saveShowtime',
        payload: showtime,
    };
};

export const dataFilmLocal = (film) => {
    return {
        type: '/film/saveFilm',
        payload: film,
    };
};

export const savePayment = (data) => {
    return {
        type: '/payment/save',
        payload: data,
    };
};
