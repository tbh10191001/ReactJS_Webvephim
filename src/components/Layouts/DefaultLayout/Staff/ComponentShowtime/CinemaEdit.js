import { useParams } from 'react-router-dom';
import { getShowtimeInfoByID } from '~/axiosAPI/showtimeApi';
import {
    faCircleInfo,
    faRightLong,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getCinemas } from '~/axiosAPI/cinemaApi';
import { getAccessToken } from '~/cookies/cookies';
import { getTimeByIDRoom } from '~/axiosAPI/showtimeApi';
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
    Calendar,
    Checkbox,
    Modal,
    Radio,
    TimePicker,
    ConfigProvider,
} from 'antd';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import AlertNoti from '~/components/Notifications/alertNoti';
import { dataCinemas } from '~/redux/actions';
import { getRoomByCinema } from '~/axiosAPI/roomApi';

function CinemaEdit({ data }) {
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [checkCinemas, setCheckCinemas] = useState(false);
    const [cinemas, setCinemas] = useState([]);
    useEffect(() => {
        setMarapchieu(data.marapchieu);
    }, [data]);
    useEffect(() => {
        const dataCinema = async () => {
            try {
                const response = await getCinemas();
                if (response) {
                    if (response.status === 200) {
                        setCinemas(response.data.data);
                        setCheckCinemas(true);
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
        dataCinema();
    }, []);
    const [cinemaState, setCinemaState] = useState({ active: null, state: [] });
    useEffect(() => {
        if (data !== undefined) {
            const filter = cinemas.filter(
                (item) => item.diachi === data.diachi,
            );
            setCinemaState({ active: filter[0], state: cinemas });
        }
    }, [checkCinemas, data]);

    const [inputTinhthanh, setInputTinhthanh] = useState('');

    useEffect(() => {
        if (inputTinhthanh.toLowerCase().trim() === '') {
            setCinemaState({ ...cinemaState, state: cinemas });
        } else {
            const filter = cinemas.filter((item) => {
                return (
                    inputTinhthanh &&
                    item &&
                    item.tinhthanh &&
                    item.tinhthanh
                        .toLowerCase()
                        .includes(inputTinhthanh.toLowerCase().trim())
                );
            });
            setCinemaState({ ...cinemaState, state: filter });
        }
    }, [inputTinhthanh]);
    const [pageNumber, setPageNumber] = useState(0);
    const cityPerPage = 3;
    const pageVisited = pageNumber * cityPerPage;
    const [pageCount, setPageCount] = useState(0);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    useEffect(() => {
        if (cinemaState !== undefined) {
            setPageCount(Math.ceil(cinemaState.state.length / cityPerPage));
        }
    }, [cinemaState.state]);
    const [marapchieu, setMarapchieu] = useState('');
    function toggleActiveElement(e, index) {
        setCinemaState({ ...cinemaState, active: e.target.value });
        setMarapchieu(e.target.value.marapchieu);
    }

    return {
        marapchieu,
        renderCinema: (
            <div>
                <div className="flex items-center mt-10">
                    <div className="w-1/3 ml-6 flex items-center">
                        <p className="text-white font-semibold text-3xl mr-6">
                            Rạp chiếu
                        </p>
                        <input
                            value={inputTinhthanh}
                            onChange={(e) => setInputTinhthanh(e.target.value)}
                            placeholder="Tìm kiếm tên tỉnh thành..."
                            className="border-textColor w-2/3 bg-bgthird rounded-xl px-4 py-2 text-white hover:border-none"
                        />
                    </div>
                    <p className="border border-mainColor w-2/3"></p>
                </div>
                <div className="flex w-full justify-center items-center">
                    <div className="border h-96 w-3/5 flex flex-col justify-center mt-10 border-mainColor rounded-xl bg-bgmain">
                        {cinemaState.state.length > 0 ? (
                            cinemaState.state
                                .slice(pageVisited, pageVisited + cityPerPage)
                                .map((cinema, index) => (
                                    <div
                                        className={`p-4 hover:text-white cursor-pointer flex justify-between items-center hover:bg-bgthird ${
                                            cinemaState.active === cinema
                                                ? 'text-white'
                                                : 'text-textColor'
                                        }`}
                                    >
                                        <div>
                                            <p className="text-3xl font-semibold">
                                                {cinema.tinhthanh}
                                            </p>
                                            <p>{cinema.diachi}</p>
                                        </div>
                                        <Radio.Group
                                            onChange={(e) =>
                                                toggleActiveElement(e, index)
                                            }
                                            value={cinemaState.active}
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Radio: {
                                                            colorPrimary:
                                                                '#b91c1c',
                                                            colorPrimaryHover:
                                                                '#b91c1c',
                                                            fontWeightStrong:
                                                                'medium',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Radio value={cinema}></Radio>
                                            </ConfigProvider>
                                        </Radio.Group>
                                    </div>
                                ))
                        ) : (
                            <p className="text-textColor">
                                Không có thông tin rạp chiếu phim
                            </p>
                        )}
                    </div>
                </div>
                {cinemaState.state.length > 0 && (
                    <div className="w-full flex justify-center mt-10 font-semibold ">
                        <ReactPaginate
                            previousLabel={
                                <FontAwesomeIcon icon={faChevronLeft} />
                            }
                            nextLabel={
                                <FontAwesomeIcon icon={faChevronRight} />
                            }
                            pageCount={pageCount}
                            onPageChange={changePage}
                            previousClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                            containerClassName="text-center text-white flex gap-6"
                            nextClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                            activeClassName="text-mainColor "
                        />
                    </div>
                )}
            </div>
        ),
    };
}

export default CinemaEdit;
