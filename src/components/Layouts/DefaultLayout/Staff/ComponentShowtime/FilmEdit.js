import { getDownloadURL, ref } from 'firebase/storage';
import { firebase, storage } from '~/middleware/firebase';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFilms } from '~/axiosAPI/filmsApi';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import {
    faChevronLeft,
    faChevronRight,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { ConfigProvider, Radio } from 'antd';
import ReactPaginate from 'react-paginate';
function FilmEdit({ data }) {
    const [maphim, setMaphim] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [films, setFilms] = useState([]);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [film, setFilm] = useState('');
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
    const [displayFilms, setDisplayFilms] = useState({
        active: null,
        state: [],
    });
    useEffect(() => {
        if (data !== undefined) {
            const filter = films.filter((item) => item.maphim === data.maphim);
            setDisplayFilms({ active: filter[0], state: films });
            setFilm(filter[0]);
        }
    }, [isCheck, films]);
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
    function toggleActiveElement(e, index) {
        setDisplayFilms({ ...displayFilms, active: e.target.value });
        setMaphim(e.target.value.maphim);
        setFilm(e.target.value);
    }
    const [inputTenphim, setinputTenphim] = useState('');
    useEffect(() => {
        if (inputTenphim.toLowerCase().trim() === '') {
            setDisplayFilms({ ...displayFilms, state: films });
        } else {
            const filter = films.filter((item) => {
                return (
                    inputTenphim &&
                    item &&
                    item.tenphim &&
                    item.tenphim
                        .toLowerCase()
                        .includes(inputTenphim.toLowerCase().trim())
                );
            });
            setDisplayFilms({ ...displayFilms, state: filter });
        }
    }, [inputTenphim]);

    return {
        film,
        maphim,
        renderFilm: (
            <div>
                <div className="flex items-center mt-10">
                    <div className="w-1/3 ml-6 flex items-center mr-6">
                        <p className="text-white font-semibold text-3xl mr-6">
                            Phim
                        </p>
                        <input
                            value={inputTenphim}
                            onChange={(e) => setinputTenphim(e.target.value)}
                            placeholder="Tìm kiếm loại phòng..."
                            className="border-textColor w-2/3 bg-bgthird rounded-xl px-4 py-2 text-white hover:border-none"
                        />
                    </div>
                    <p className="border border-mainColor w-2/3"></p>
                </div>
                <div className="flex items-center w-full mt-10 justify-center">
                    <div className="w-3/5 h-420">
                        {displayFilms.state
                            .slice(pageVisited, pageVisited + filmPerPage)
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
                                                    {film.thoiluongchieu} (phút)
                                                </div>
                                            </div>

                                            <div className="flex items-center mt-2">
                                                <p className="mr-4">
                                                    Ngày bắt đầu chiếu:
                                                </p>
                                                <div className="font-thin">
                                                    {Moment(
                                                        film.ngaybatdauchieu,
                                                    ).format('DD/MM/YYYY')}
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
                                                        e,
                                                        index,
                                                    )
                                                }
                                                value={displayFilms.active}
                                            >
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Radio: {
                                                                colorPrimary:
                                                                    '#b91c1c',
                                                                colorPrimaryHover:
                                                                    '#b91c1c',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Radio value={film}></Radio>
                                                </ConfigProvider>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                activeClassName="text-mainColor"
                            />
                        </div>
                    </div>
                </div>
            </div>
        ),
    };
}

export default FilmEdit;
