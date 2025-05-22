import {
    faChevronLeft,
    faChevronRight,
    faCircleInfo,
    faCirclePlus,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getShowtimes } from '~/axiosAPI/showtimeApi';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Showtimes() {
    const [data, setData] = useState([]);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const dataShowtimes = async () => {
            try {
                const response = await getShowtimes();
                if (response) {
                    if (response.status === 200) {
                        setData(response.data.data);
                        setCheck(true);
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
        dataShowtimes();
    }, []);
    useEffect(() => {
        if (data !== undefined) {
            setDisplayData(data);
            setPageCount(Math.ceil(data.length / showtimePerPage));
        }
    }, [check]);
    const [pageNumber, setPageNumber] = useState(0);
    const showtimePerPage = 8;
    const [displayData, setDisplayData] = useState([]);
    const pageVisited = pageNumber * showtimePerPage;
    const [pageCount, setPageCount] = useState(0);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const navigator = useNavigate();
    function handleShowTimeInfo(masuatchieu) {
        navigator(`${masuatchieu}`);
    }
    const [inputTenphim, setInputTenphim] = useState('');
    console.log(data);
    useEffect(() => {
        if (inputTenphim.toLowerCase().trim() === '') {
            setDisplayData(data);
        } else {
            const filterData = data.filter((item) => {
                return (
                    inputTenphim &&
                    item &&
                    item.tenphim &&
                    item.tenphim
                        .toLowerCase()
                        .includes(inputTenphim.toLowerCase().trim())
                );
            });
            console.log(filterData);
            setDisplayData(filterData);
        }
    }, [inputTenphim]);
    return (
        <div className="bg-bgmain h-screen w-full">
            <p className="text-white font-semibold pt-10 text-6xl text-center">
                Danh sách suất chiếu phim
            </p>
            <div className="flex justify-between items-center mx-10 mt-10 border border-mainColor bg-bgsecondary shadow-3xl rounded-full">
                <div className="w-2/3 ml-6">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="text-textColor mr-6"
                    />
                    <input
                        value={inputTenphim}
                        onChange={(e) => setInputTenphim(e.target.value)}
                        placeholder="Tìm kiếm tên phim..."
                        className="border-textColor w-2/3 bg-bgthird text-white hover:border-none"
                    />
                </div>
                <button
                    onClick={() => navigator('/staff/showtimes/addshowtime')}
                    className="text-white  bg-mainColor px-6 py-3 rounded-full hover:text-mainColor hover:bg-white"
                >
                    <FontAwesomeIcon className="mr-2" icon={faCirclePlus} />
                    Thêm
                </button>
            </div>
            <div className="mt-10 mx-6 grid grid-cols-2 gap-8">
                {displayData
                    .slice(pageVisited, pageVisited + showtimePerPage)
                    .map((showtime, index) => (
                        <div className="text-white border border-btGreen px-2 flex justify-between bg-bgthird hover:shadow-3xl">
                            <div className="py-4">
                                <div className="flex">
                                    <p className="font-semibold mr-4">
                                        Mã suất chiếu:
                                    </p>
                                    <p>{showtime.masuatchieu}</p>
                                </div>
                                <div className="flex">
                                    <p className="font-semibold mr-4">
                                        Tên phim:
                                    </p>
                                    <p>{showtime.tenphim}</p>
                                </div>
                                <div className="flex">
                                    <p className="font-semibold mr-4">
                                        Thời gian bắt đầu:{' '}
                                    </p>
                                    <p>
                                        {Moment(showtime.thoigianbatdau).format(
                                            'hh:mm:ss DD/MM/YYYY',
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="border-l px-4 py-4 border-textColor flex items-center">
                                <button
                                    onClick={() =>
                                        handleShowTimeInfo(showtime.masuatchieu)
                                    }
                                    className="px-4 py-2 h-fit bg-yellow rounded-full opacity-100 hover:text-yellow hover:bg-white"
                                >
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="w-full flex justify-center mt-10 font-semibold ">
                <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                    containerClassName="text-center text-white flex gap-6"
                    nextClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                    activeClassName="text-mainColor "
                />
            </div>
        </div>
    );
}

export default Showtimes;
