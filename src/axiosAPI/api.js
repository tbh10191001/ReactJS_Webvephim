import { login } from './accountApi.js';
import { getFilms, getFilmByID, deleteFilm, getTypeOfFilm } from './filmsApi.js';
import { getCinemas } from './cinemaApi.js';
import { getShowtimeByID } from './showtimeApi.js';
import { getSeatByIDRoom } from './seatApi.js';
import { updateInfo, refillWallet, getListStickets } from './customerApi.js';
import { buySticket } from './ticketApi.js/index.js';


export {
    login,
    getFilms,
    getTypeOfFilm,
    getFilmByID,
    deleteFilm,
    getCinemas,
    getShowtimeByID,
    getSeatByIDRoom,
    updateInfo,
    refillWallet,
    getListStickets
    buySticket,
};
