import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFilmByID } from '~/axiosAPI/filmsApi';
import { getShowtimeByID, getShowtimeDate } from '~/axiosAPI/showtimeApi';
import FilmInfo from '~/components/Layouts/DefaultLayout/Film/FilmInfo';
import Showtime from '~/components/Layouts/DefaultLayout/Showtime';
import NotificationComp from '~/components/Notifications/Notification';
import { storage } from '~/middleware/firebase';
import showtimeSlice from '~/redux/showtimeSlice';

const bgFilm = require('~/images/bgFilm.jpeg');

function Film() {
    let { id } = useParams();
    const { openNotification, renderNotification } = NotificationComp();
    const resultRef = useRef();

    const [result, setResult] = useState(0);
    const [message, setMessage] = useState(false);
    const [filmInfo, setFilmInfo] = useState();
    const [filmType, setFilmType] = useState();
    const [showtimes, setShowtimes] = useState();
    const [date, setDate] = useState();
    const [src, setSrc] = useState('');
    const dispatch = useDispatch();
    const { renderFilmInfo } = FilmInfo({
        filmInfo,
        filmType,
        src,
        id,
        resultRef,
    });

    const getFilmInfo = async () => {
        try {
            const response = await getFilmByID({
                idphim: id,
            });
            if (response) {
                if (response.status === 200) {
                    setFilmInfo(response.data.data);
                } else {
                    setResult(1);
                    setMessage(response.response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getDate = async () => {
        try {
            const response = await getShowtimeDate({
                maphim: id,
            });
            if (response) {
                if (response.status === 200) {
                    setDate(response.data.data);
                } else {
                    setResult(1);
                    setMessage(response.response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getShowtime = async () => {
        const response = await getShowtimeByID({
            maphim: id,
        });
        if (response) {
            if (response.status === 200) {
                setShowtimes(response.data.data);
                dispatch(
                    showtimeSlice.actions.saveShowtime(response.data.data),
                );
                setResult(1);
                setMessage(response.data.message);
            } else {
                setResult(2);
                setMessage(response.response.data.message);
            }
        }
    };
    const getImgFilm = async (urlImg, idphim) => {
        await getDownloadURL(ref(storage, `files/${urlImg}`))
            .then((url) => {
                setSrc(url);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getFilmInfo();
        getShowtime();
        getDate();
    }, []);

    useEffect(() => {
        if (filmInfo) {
            const type = filmInfo.theloaiphim.reduce((str, current, index) => {
                return index !== filmInfo.theloaiphim.length - 1
                    ? (str = str + current.tentheloaiphim + ', ')
                    : (str = str + current.tentheloaiphim);
            }, '');
            setFilmType(type);
            setSrc(getImgFilm(filmInfo.anhtitle, filmInfo.maphim));
        }
    }, filmInfo);

    useEffect(() => {
        window.scrollTo(0, 200);
    }, []);

    return (
        <div
            className="w-full bg-fixed bg-cover"
            style={{ backgroundImage: `url(${bgFilm})` }}
        >
            {filmInfo && renderFilmInfo}
            <div className="p-20" id="showtime" ref={resultRef}>
                {filmInfo && showtimes && date && (
                    <Showtime
                        ref={resultRef}
                        maphim={filmInfo.maphim}
                        film={filmInfo}
                        showtimes={showtimes}
                        date={date}
                    />
                )}
            </div>

            {renderNotification}
        </div>
    );
}

export default Film;
