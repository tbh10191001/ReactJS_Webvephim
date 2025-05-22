import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmByID } from '~/axiosAPI/filmsApi';
import { getSeatByIDRoom } from '~/axiosAPI/seatApi';
import { getShowtimeInfoByID } from '~/axiosAPI/showtimeApi';
import { getListTickets } from '~/axiosAPI/ticketApi';
import FilmInfo from '~/components/Layouts/DefaultLayout/Ticket/FilmInfo';
import Map from '~/components/Layouts/DefaultLayout/Ticket/Map';
import Order from '~/components/Layouts/DefaultLayout/Ticket/Order';
import Price from '~/components/Layouts/DefaultLayout/Ticket/Price';
import NotificationComp from '~/components/Notifications/Notification';
const bgFilm = require('~/images/bgFilm.jpeg');

function Ticket() {
    let { id } = useParams();
    const { openNotification, renderNotification } = NotificationComp();

    const [seats, setSeats] = useState([]);
    const [listTickets, setListTickets] = useState([]);
    const [filmInfo, setFilmInfo] = useState([]);
    const [showtimeInfo, setShowtimeInfo] = useState();
    const { seatPick, renderMap } = Map({ seats, listTickets });
    const [result, setResult] = useState(0);
    const [message, setMessage] = useState(false);
    const masuatchieu = id;

    const getShowtime = async () => {
        const response = await getShowtimeInfoByID(masuatchieu);
        if (response) {
            if (response.status === 200) {
                setShowtimeInfo(response.data.data);
            } else {
                setResult(2);
                setMessage(response.response.data.message);
            }
        }
    };
    const getFilmInfo = async () => {
        const response = await getFilmByID({
            idphim: showtimeInfo.maphim,
        });
        if (response) {
            if (response.status === 200) {
                setFilmInfo(response.data.data);
            } else {
                setResult(1);
                setMessage(response.response.data.message);
            }
        }
    };
    const getSeat = async () => {
        const response = await getSeatByIDRoom({
            maphongchieu: showtimeInfo.maphongchieu,
        });
        if (response) {
            if (response.status === 200) {
                setSeats(response.data.data);
            } else {
                setResult(1);
                setMessage(response.response.data.message);
            }
        }
    };
    const getList = async () => {
        const response = await getListTickets({
            masuatchieu,
        });
        if (response) {
            if (response.status === 200) {
                setListTickets(response.data.data);
            } else {
                setResult(1);
                setMessage(response.response.data.message);
            }
        }
    };

    useEffect(() => {
        getShowtime();
        getList();
    }, []);
    useEffect(() => {
        if (showtimeInfo) {
            getFilmInfo();
            getSeat();
        }
    }, [showtimeInfo]);

    useEffect(() => {
        if (result === 3) {
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }, [result]);

    return (
        <div
            className="w-full bg-fixed bg-cover px-20 py-20"
            style={{ backgroundImage: `url(${bgFilm})`, marginTop: 55 }}
        >
            <div className="grid grid-cols-3 gap-6">
                <div className=" col-span-2">
                    {filmInfo && <FilmInfo filmInfo={filmInfo} />}
                    {seats && <Price seats={seats} />}
                    <p className="text-white uppercase font-semibold mt-20 text-center text-4xl">
                        Sơ đồ ghế ngồi tạp rạp
                    </p>
                    {seats && listTickets && renderMap}
                </div>
                <div className="">
                    {seatPick && (
                        <Order
                            masuatchieu={masuatchieu}
                            seatPick={seatPick}
                            setResult={setResult}
                            setMessage={setMessage}
                            result={result}
                        />
                    )}
                </div>
            </div>
            {renderNotification}
            {result === 0 ? (
                <></>
            ) : result === 3 ? (
                openNotification('success', 'Successfully', message)
            ) : result === 1 ? (
                openNotification('error', 'Error', message)
            ) : (
                openNotification(
                    'error',
                    'Error',
                    'Server đang xảy ra lỗi vui lòng thử lại.',
                )
            )}
        </div>
    );
}

export default Ticket;
