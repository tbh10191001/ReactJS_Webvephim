import {
    faCheck,
    faCircleInfo,
    faRightLong,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getCinemas } from '~/axiosAPI/cinemaApi';
import Cinema from './ComponentShowtime/Cinema';
import { getAccessToken } from '~/cookies/cookies';
import Room from './ComponentShowtime/Room';
import { addShowtime, getTimeByIDRoom } from '~/axiosAPI/showtimeApi';
import Moment from 'moment';
import { getFilms } from '~/axiosAPI/filmsApi';
import { getDownloadURL, ref } from 'firebase/storage';
import { firebase, storage } from '~/middleware/firebase';
import ReactPaginate from 'react-paginate';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
    ConfigProvider,
    Calendar,
    Checkbox,
    Modal,
    Radio,
    TimePicker,
} from 'antd';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import AlertNoti from '~/components/Notifications/alertNoti';

function AddShowtime() {
    const { marapchieu, renderCinema } = Cinema();
    const { maphongchieu, renderRoom } = Room(marapchieu);
    const token = getAccessToken();
    const [times, setTimes] = useState([]);
    const [check, setCheck] = useState(false);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
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
    const [giavemacdinh, setGiavemacdinh] = useState('');
    const [giavemacdinhError, setGiavemacdinhError] = useState('');
    const [ngaybatdauchieu, setngaybatdauchieu] = useState('');
    const [ngaybatdauchieuError, setngaybatdauchieuError] = useState('');
    const [isModalNgaychieu, setIsModalNgaychieu] = useState(false);
    const [maphim, setMaphim] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [films, setFilms] = useState([]);
    useEffect(() => {
        const dataFilms = async (value) => {
            try {
                const response = await getFilms();
                if (response) {
                    if (response.status === 200) {
                        setIsCheck(true);
                        setFilms(response.data.data);
                    } else {
                        setDesc(response.data.message);
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
        dataFilms();
    }, []);
    useEffect(() => {
        setDisplayFilms({ state: films });
    }, [isCheck]);
    const [displayFilms, setDisplayFilms] = useState({
        active: null,
        state: [],
    });
    const getImgFilm = async (urlImg, idphim) => {
        await getDownloadURL(ref(storage, `files/${urlImg}`))
            .then((url) => {
                const img = document.getElementById(idphim);
                img.setAttribute('src', url);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const navigator = useNavigate();
    const handleFilmInfo = (film) => {
        navigator(`/staff/films/${film.maphim}`);
    };
    const [pageNumber, setPageNumber] = useState(0);
    const filmPerPage = 3;
    const pageVisited = pageNumber * filmPerPage;
    const pageCount = Math.ceil(films.length / filmPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    function toggleActiveElement(i, e) {
        setMaphim(e.target.value);
        setDisplayFilms({ ...displayFilms, active: displayFilms.state[i] });
    }

    const [isCalendar, setIsCalendar] = useState(false);
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    function handlePickDate(e) {
        const showtime = e.format('MM/DD/YYYY');
        if (displayFilms.active === undefined) {
            setDesc(`Chọn ngày ${showtime}. Vui lòng chọn phim trước`);
            setType('error');
            setIsSuccess(true);
            setIsCalendar(false);
        } else {
            const film = Moment(displayFilms.active.ngaybatdauchieu).format(
                'MM/DD/YYYY',
            );
            const date = new Date();
            const currentDate = date.toLocaleDateString();
            if (
                Date.parse(showtime) > Date.parse(film) &&
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
    const [checkTime, setCheckTime] = useState([]);
    useEffect(() => {
        setCheckTime([]);
    }, [ngaybatdauchieu]);
    useEffect(() => {
        times.map((time, index) => {
            if (
                Date.parse(ngaybatdauchieu) ===
                Date.parse(Moment(time.thoigianbatdau).format('MM/DD/YYYY'))
            ) {
                setCheckTime((previous) => [...previous, time]);
            }
        });
    }, [ngaybatdauchieu]);

    function checkTimetoAdd(timeChoose) {
        let check = false;
        if (checkTime !== []) {
            const format = 'HH:mm:ss';
            checkTime.map((item, index) => {
                let timeShowtime = Moment(item.thoigianbatdau).format(
                    'HH:mm:ss',
                );
                let start = Moment(timeShowtime, format);
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
    const [isModal, setIsModal] = useState(false);

    async function InsertShowtime() {
        try {
            const token = getAccessToken();
            const response = await addShowtime({
                token,
                thoigianbatdau: Moment(thoigianbatdau).format(
                    'YYYY-MM-DD HH:mm:ss',
                ),
                giavemacdinh: giavemacdinh,
                maphim: maphim,
                maphongchieu,
            });
            if (response) {
                if (response.status === 200) {
                    setIsModal(true);
                } else {
                    setDesc(response.response.data.message);
                    setType('error');
                    setIsSuccess(true);
                }
            }
        } catch (err) {
            console.log(err);
            setDesc('Server đang xảy ra lỗi vui lòng thử lại.');
            setType('error');
            setIsSuccess(true);
        }
    }

    const [thoigianbatdau, setThoigianbatdau] = useState('');
    const [timePicker, setTimePicker] = useState('');
    console.log(thoigianbatdau);
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
            className="w-full min-h-screen bg-bgsecondary py-10"
            style={{ marginTop: 50 }}
        >
            <div className="text-white text-center font-semibold pt-10 text-6xl ml-10 mb-10">
                Suất chiếu phim
            </div>

            <div className="mt-10 h-1/3 px-10">{renderCinema}</div>
            <div className="mt-10 h-1/3 px-10">{renderRoom}</div>
            {maphongchieu !== '' && (
                <div>
                    <p className="border-t-2 mt-20 border-mainColor"></p>
                    <div className="mt-10 px-10 w-full">
                        <div className="flex items-center justify-center">
                            <div className="text-white h-fit w-fit bg-bgthird mb-10 px-8 py-6 rounded-2xl border-2 border-btGreen shadow-3xl">
                                <p className="font-semibold text-3xl text-center mb-8">
                                    Thời gian chiếu
                                </p>
                                <div>
                                    {times.length > 0 ? (
                                        times.map((time, index) => (
                                            <div>
                                                <p className="mt-4 font-semibold">
                                                    {Moment(
                                                        time.thoigianbatdau,
                                                    ).format('DD/MM/YYYY')}
                                                </p>
                                                <div className="flex">
                                                    <p className="mt-4 ml-10 font-semibold">
                                                        {time.tenphim}
                                                    </p>
                                                    <p className="mt-4 mx-10">
                                                        -
                                                    </p>
                                                    <p className="mt-4 ">
                                                        {Moment(
                                                            time.thoigianbatdau,
                                                        ).format('HH:mm:ss')}
                                                        {' + '}
                                                        {time.thoiluongchieu}
                                                        {' phút '}
                                                        {' + 15 phút dọn dẹp'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="mt-4 text-center text-textColor italic">
                                            Chưa có lịch chiếu
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" w-full flex ">
                            <div className="w-3/5">
                                {displayFilms.state
                                    .slice(
                                        pageVisited,
                                        pageVisited + filmPerPage,
                                    )
                                    .map((film, index) => (
                                        <div
                                            key={index}
                                            className="text-black h-fit font-semibold border relative border-mainColor bg-bgthird flex items-center mt-10 first:mt-0 hover:cursor-pointer hover:shadow-3xl hover:scale-[1.02]"
                                        >
                                            <div className="w-1/12">
                                                <img
                                                    id={film.maphim}
                                                    src={
                                                        film.anhtitle &&
                                                        getImgFilm(
                                                            film.anhtitle,
                                                            film.maphim,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-full flex justify-between items-center">
                                                <div className="text-white ml-4">
                                                    <div className="flex items-center">
                                                        <p className="mr-4">
                                                            Tên phim:
                                                        </p>
                                                        <p className="font-thin">
                                                            {film.tenphim}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <p className="mr-4">
                                                            Thời lượng:
                                                        </p>
                                                        <div className="font-thin">
                                                            {
                                                                film.thoiluongchieu
                                                            }{' '}
                                                            (phút)
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center mt-2">
                                                        <p className="mr-4">
                                                            Ngày bắt đầu chiếu:
                                                        </p>
                                                        <div className="font-thin">
                                                            {Moment(
                                                                film.ngaybatdauchieu,
                                                            ).format(
                                                                'DD/MM/YYYY',
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mr-10 flex justify-center items-center border-l pl-4 border-textColor">
                                                    <button
                                                        onClick={() =>
                                                            handleFilmInfo(film)
                                                        }
                                                        className="px-4 py-2 h-fit mr-4 bg-yellow rounded-full opacity-100 hover:text-yellow hover:bg-white"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCircleInfo}
                                                        />
                                                    </button>
                                                    <Radio.Group
                                                        onChange={(e) =>
                                                            toggleActiveElement(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        value={maphim}
                                                    >
                                                        <ConfigProvider
                                                            theme={{
                                                                components: {
                                                                    Radio: {
                                                                        colorPrimary:
                                                                            '#15803d',
                                                                        algorithm: true, // Enable algorithm
                                                                        colorPrimaryHover:
                                                                            '#15803d',
                                                                        borderRadius:
                                                                            '46%',
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <Radio.Button
                                                                value={
                                                                    film.maphim
                                                                }
                                                            >
                                                                Chọn
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                    className="ml-2"
                                                                />
                                                            </Radio.Button>
                                                        </ConfigProvider>
                                                    </Radio.Group>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <div className="w-full flex justify-center mt-20 font-semibold ">
                                    <ReactPaginate
                                        previousLabel={
                                            <FontAwesomeIcon
                                                icon={faChevronLeft}
                                            />
                                        }
                                        nextLabel={
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                            />
                                        }
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        previousClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                                        containerClassName="text-center text-white flex gap-6"
                                        nextClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                                        activeClassName="text-mainColor"
                                    />
                                </div>
                            </div>

                            <div className="w-2/5 pl-8">
                                <div className="col-span-3 grid grid-cols-5">
                                    <div className=" text-white font-semibold flex items-center">
                                        Giá vé:
                                    </div>
                                    <div className="col-span-3 flex items-center">
                                        <div className="relative col-span-4">
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
                                <div className="mt-10 col-span-3 grid grid-cols-5">
                                    <div className=" text-white font-semibold flex items-center">
                                        Ngày chiếu:
                                    </div>
                                    <div className="col-span-3 flex items-center">
                                        <button
                                            onClick={() => {
                                                setIsCalendar(true);
                                                setIsShowCalendar(false);
                                            }}
                                            className="col-span-2 font-semibold text-white px-4 py-2 bg-mainColor rounded-lg hover:text-mainColor hover:bg-white"
                                        >
                                            Chọn ngày chiếu
                                        </button>
                                        <div className="col-span-3 flex items-center ">
                                            <div className="text-ellipsis overflow-hidden">
                                                {ngaybatdauchieu !== '' && (
                                                    <>
                                                        <span className="text-white ml-6">
                                                            {ngaybatdauchieu}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 col-span-3 flex items-center">
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
                                <div className="mt-10 flex justify-center">
                                    <button
                                        className={`text-white font-semibold px-10 py-2 rounded-xl ${
                                            (thoigianbatdau === '' &&
                                                ngaybatdauchieu === '' &&
                                                giavemacdinhError === '') ||
                                            (giavemacdinhError === ' ' &&
                                                timePicker === '')
                                                ? 'bg-bgthird cursor-not-allowed pointer-events-none'
                                                : 'bg-btGreen hover:text-btGreen hover:bg-white'
                                        }`}
                                        onClick={InsertShowtime}
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            {isSuccess && (
                <div
                    className={`fixed z-20 right-4 top-24 ${
                        isSuccess
                            ? 'animate-[sildeInRight_1s_ease-in-out]'
                            : 'animate-[hide_1s_ease-in-out]'
                    }`}
                >
                    <AlertNoti type={type} desc={desc} />
                </div>
            )}
            {isModal && (
                <Modal
                    title={`Bạn đã thêm suất chiếu mới thành công tại Filmax Cinema`}
                    open={isModal}
                    onOk={() => {
                        setIsModal(false);
                        navigator('/staff/showtimes');
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
                    onCancel={() => {
                        setIsModal(false);
                    }}
                >
                    Vui lòng xem lại thông tin suất chiếu
                </Modal>
            )}
        </div>
    );
}

export default AddShowtime;
