import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar, Modal, TimePicker } from 'antd';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShowtimeInfoByID, getTimeByIDRoom } from '~/axiosAPI/showtimeApi';
import { getListTickets } from '~/axiosAPI/ticketApi';
import { getAccessToken } from '~/cookies/cookies';
import CinemaEdit from './ComponentShowtime/CinemaEdit';
import FilmEdit from './ComponentShowtime/FilmEdit';
import RoomEdit from './ComponentShowtime/RoomEdit';

function ShowtimeInfo() {
    const { masuatchieu } = useParams();
    const [data, setData] = useState([]);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [checkData, setCheckData] = useState(false);
    const { marapchieu, renderCinema } = CinemaEdit({ data });
    const { maphongchieu, renderRoom } = RoomEdit({ data, marapchieu });
    const { film, maphim, renderFilm } = FilmEdit({ data });

    const navigate = useNavigate();
    const [giavemacdinh, setGiavemacdinh] = useState('');
    const [giavemacdinhError, setGiavemacdinhError] = useState('');
    const [ngaybatdauchieu, setngaybatdauchieu] = useState('');
    const [ngaybatdauchieuError, setngaybatdauchieuError] = useState('');
    const [isCalendar, setIsCalendar] = useState(false);
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [isModalNgaychieu, setIsModalNgaychieu] = useState(false);
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        const getlistTicket = async () => {
            try {
                const response = await getListTickets({
                    masuatchieu,
                });
                if (response) {
                    if (response.status === 200) {
                        setTickets(response.data.data);
                    } else {
                        setDesc(response.response.data.message);
                        setType('error');
                        setIsSuccess(true);
                    }
                } else {
                    setDesc('Server đang xảy ra lỗi');
                    setType('error');
                    setIsSuccess(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getlistTicket();
    }, []);
    useEffect(() => {
        const dataShowtimes = async () => {
            try {
                const token = getAccessToken();
                const response = await getShowtimeInfoByID({
                    token,
                    masuatchieu,
                });
                if (response) {
                    if (response.status === 200) {
                        setData(response.data.data);
                        setCheckData(true);
                    } else {
                        setDesc(response.response.data.message);
                        setType('error');
                        setIsSuccess(true);
                    }
                } else {
                    setDesc('Server đang xảy ra lỗi');
                    setType('error');
                    setIsSuccess(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        dataShowtimes();
    }, []);
    useEffect(() => {
        setGiavemacdinh(data.giavemacdinh);
        setngaybatdauchieu(data.thoigianbatdau);
    }, [checkData, data]);
    console.log('data', data);

    function handlePickDate(e) {
        const showtime = e.format('MM/DD/YYYY');
        console.log(showtime);
        if (film === undefined) {
            setDesc(`Chọn ngày ${showtime}. Vui lòng chọn phim trước`);
            setType('error');
            setIsSuccess(true);
            setIsCalendar(false);
        } else {
            const filmDay = Moment(film.ngaybatdauchieu).format('MM/DD/YYYY');
            console.log('film', filmDay);
            const date = new Date();
            const currentDate = date.toLocaleDateString();
            if (
                Date.parse(showtime) > Date.parse(filmDay) &&
                Date.parse(showtime) >= Date.parse(currentDate)
            ) {
                setngaybatdauchieu(e.format('MM/DD/YYYY'));
                setIsCalendar(false);
                setDesc(`Bạn đã chọn thành công ngày ${showtime}`);
                setType('success');
                setIsSuccess(true);
            } else {
                setngaybatdauchieuError(
                    'Suất chiếu phim cần thêm phải được chiếu sau ngày phim được công chiếu và muộn nhất là hôm nay',
                );
                setIsModalNgaychieu(true);
                setIsCalendar(false);
            }
        }
    }
    const [times, setTimes] = useState([]);
    const [check, setCheck] = useState(false);
    const [checkTime, setCheckTime] = useState([]);
    useEffect(() => {
        setCheckTime([]);
    }, [ngaybatdauchieu]);
    useEffect(() => {
        times.map((time, index) => {
            if (
                Date.parse(ngaybatdauchieu) ===
                Date.parse(
                    Moment(time.thoigianbatdau.toString()).format('MM/DD/YYYY'),
                )
            ) {
                setCheckTime((previous) => [...previous, time]);
            }
        });
    }, [ngaybatdauchieu]);
    useEffect(() => {
        const dataTime = async () => {
            try {
                const token = getAccessToken();
                const response = await getTimeByIDRoom({ token, maphongchieu });
                if (response) {
                    if (response.status === 200) {
                        setTimes(response.data.data);
                        setCheck(true);
                    } else {
                        setDesc(response.response.data.message);
                        setType('error');
                        setIsSuccess(true);
                    }
                } else {
                    setDesc('Server đang xảy ra lỗi');
                    setType('error');
                    setIsSuccess(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        dataTime();
    }, [maphongchieu]);
    function checkTimetoAdd(timeChoose) {
        let check = false;
        if (checkTime !== []) {
            const format = 'HH:mm:ss';
            checkTime.map((item, index) => {
                let timeShowtime = Moment(
                    item.thoigianbatdau.toString(),
                ).format('HH:mm:ss');
                let start = Moment(timeShowtime.toString(), format);
                let end = start.clone();
                end = end.add(item.thoiluongchieu + 15, 'minutes');
                console.dir(start.toString());
                console.dir(end.toString());
                if (timeChoose.isBetween(start, end)) {
                    check = true;
                }
            });
        }
        return check;
    }
    const [thoigianbatdau, setThoigianbatdau] = useState('');
    const [timePicker, setTimePicker] = useState('');
    const onChange = (time, timeString) => {
        const format = 'HH:mm:ss';
        let timeChoose = Moment(timeString, format);
        const thoigian = checkTimetoAdd(timeChoose);
        if (thoigian === true) {
            setDesc(
                `Thời gian bạn chọn ${timeChoose}. Đã trùng với lịch chiếu trước đó. Vui lòng thử lại`,
            );
            setType('warning');
            setIsSuccess(true);
        } else {
            const date = `${timeChoose._i} ${ngaybatdauchieu}`;
            const convert = new Date(date);
            setTimePicker(timeString);
            setThoigianbatdau(convert);
        }
    };
    return (
        <div
            className=" bg-bgsecondary w-full h-fit pb-20"
            style={{ marginTop: 60 }}
        >
            <p className="font-semibold text-5xl text-center pt-10 text-white">
                Thông tin suất chiếu
            </p>
            {tickets.length === 0 ? (
                <></>
            ) : (
                <p className="text-mainColor mt-10 italic text-center">
                    Phim hiện tại đã có khách hàng đặt vé. Không thể chỉnh sửa.
                </p>
            )}
            {renderCinema}
            {renderRoom}
            {renderFilm}
            <div className="ml-6 flex items-center mr-6">
                <p className="text-white w-1/3 font-semibold text-3xl mr-6">
                    Thông tin suất chiếu
                </p>
                <p className="border border-mainColor w-2/3"></p>
            </div>
            {film !== [] ? (
                <div className="flex px-14">
                    <div className="w-2/3">
                        <div className="flex w-full">
                            <div className="w-2/3">
                                <div className="grid grid-cols-5 mt-10">
                                    <div className="col-span-1 text-white font-semibold flex items-center">
                                        Giá vé:
                                    </div>
                                    <div className="col-span-4 flex items-center">
                                        <div className="relative">
                                            <input
                                                id="giavemacdinh"
                                                value={giavemacdinh}
                                                type="number"
                                                onChange={(e) => {
                                                    setGiavemacdinh(
                                                        e.target.value,
                                                    );
                                                    if (
                                                        e.target.value < 10000
                                                    ) {
                                                        setGiavemacdinhError(
                                                            'Giá vé ít nhất là 10.000 VND',
                                                        );
                                                    } else {
                                                        setGiavemacdinhError(
                                                            ' ',
                                                        );
                                                    }
                                                }}
                                                className={`py-3 px-2 h-fit bg-bgthird rounded-xl text-white hover:outline-none focus:outline-none disabled:cursor-not-allowed ${
                                                    giavemacdinhError !== ' '
                                                        ? 'border border-mainColor'
                                                        : ''
                                                }`}
                                            />
                                            <label className="text-white ml-4 ">
                                                (VND)
                                            </label>
                                            <p className="absolute left-0 -top-6 font-medium text-lg italic text-mainColor">
                                                {giavemacdinhError}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-5">
                                    <div className="col-span-1 text-white font-semibold flex items-center">
                                        Ngày chiếu:
                                    </div>
                                    <div className="col-span-4 flex items-center">
                                        <div className="col-span-3 flex items-center ">
                                            <div className="text-ellipsis overflow-hidden">
                                                {ngaybatdauchieu !== '' && (
                                                    <>
                                                        <span className="text-white">
                                                            {Moment(
                                                                ngaybatdauchieu,
                                                            ).format(
                                                                'DD/MM/YYYY',
                                                            )}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsCalendar(true);
                                                setIsShowCalendar(false);
                                            }}
                                            className=" ml-10 col-span-2 font-semibold text-white px-4 py-2 bg-mainColor rounded-lg hover:text-mainColor hover:bg-white"
                                        >
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-5">
                                    <div className=" text-white font-semibold flex items-center">
                                        Thời gian:
                                    </div>
                                    <div className="col-span-3 ml-7 flex items-center">
                                        <TimePicker
                                            format={'HH:mm:ss'}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 flex items-center">
                        <button
                            onClick={() => navigate('/staff/showtimes')}
                            className="w-1/3 py-2 text-white font-semibold rounded-xl bg-mainColor mr-10 hover:bg-white hover:text-mainColor"
                        >
                            Trở về
                        </button>
                        <button
                            className={`w-1/3 py-2 text-white font-semibold rounded-xl ${
                                tickets.length === 0
                                    ? 'bg-btGreen hover:text-btGreen hover:bg-white'
                                    : 'bg-bgthird cursor-not-allowed'
                            }`}
                            disabled={tickets.length === 0 ? false : true}
                        >
                            Lưu chỉnh sửa
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {isCalendar === true ? (
                <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center">
                    <Calendar
                        className="w-1/3"
                        fullscreen={false}
                        onSelect={(e) => {
                            handlePickDate(e);
                        }}
                    />
                </div>
            ) : (
                <></>
            )}
            {isModalNgaychieu && (
                <Modal
                    title={'Ngày chiếu không hợp lệ.'}
                    open={isModalNgaychieu}
                    onOk={(e) => {
                        setIsModalNgaychieu(false);
                    }}
                    okText="Xác nhận"
                    okButtonProps={{
                        style: {
                            backgroundColor: '#b91c1c',
                            '&:hover': {
                                background: '#efefef',
                            },
                        },
                    }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    {ngaybatdauchieuError}
                </Modal>
            )}
        </div>
    );
}

export default ShowtimeInfo;
