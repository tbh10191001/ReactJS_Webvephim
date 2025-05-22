import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getCinemas } from '~/axiosAPI/cinemaApi';
import ReactPaginate from 'react-paginate';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
function Cinema() {
    const [cinemas, setCinemas] = useState([]);
    const [valCinemasCity, setValCinemasCity] = useState('');
    const [valCinemasVillage, setValCinemasVillage] = useState('');
    const [marapchieu, setMarapchieu] = useState('');

    const [checkCinemas, setCheckCinemas] = useState(false);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
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
    const [uniqueCity, setUniqueCity] = useState([]);
    useEffect(() => {
        const unique = cinemas.reduce((groups, cinema) => {
            const type = cinema.tinhthanh;
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(cinema);
            return groups;
        }, {});
        const uniqueCityObj = Object.keys(unique).map((city) => {
            return {
                city,
                citys: unique[city],
            };
        });
        setUniqueCity(uniqueCityObj);
    }, [checkCinemas]);
    const [uniqueVillage, setUniqueVillage] = useState({
        active: null,
        state: [],
    });
    useEffect(() => {
        if (uniqueCity !== undefined) {
            let filter = uniqueCity.filter(
                (city) => city.city === valCinemasCity,
            );
            if (filter[0] !== undefined) {
                setUniqueVillage({ state: filter[0].citys });
            }
        }
    }, [valCinemasCity]);

    function toggleActiveElement(i) {
        setUniqueVillage({ ...uniqueVillage, active: uniqueVillage.state[i] });
    }

    useEffect(() => {
        if (
            uniqueVillage.active !== null &&
            uniqueVillage.active !== undefined
        ) {
            setMarapchieu(uniqueVillage.active.marapchieu);
        }
    }, [uniqueVillage.active]);
    const [pageNumber, setPageNumber] = useState(0);
    const cityPerPage = 4;
    const pageVisited = pageNumber * cityPerPage;
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        if (uniqueVillage !== undefined) {
            setPageCount(Math.ceil(uniqueVillage.state.length / cityPerPage));
        }
    }, [uniqueVillage.state]);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return {
        marapchieu,
        renderCinema: (
            <div>
                <div className="relative">
                    <select
                        onChange={(e) => setValCinemasCity(e.target.value)}
                        className="ml-8 w-1/4 py-2 pl-2 shadow-3xl bg-bgmain border border-mainColor rounded-xl font-semibold text-white focus:outline-none"
                    >
                        <option value={''}>Chọn khu vực</option>
                        {uniqueCity.length !== 0 ? (
                            uniqueCity.map((city, index) => (
                                <option value={city.city}>{city.city}</option>
                            ))
                        ) : (
                            <></>
                        )}
                    </select>
                    <p className="absolute w-2/3 top-1/2 -translate-y-1/2 right-0 border-t-2 border-mainColor"></p>
                </div>
                <div
                    className={`w-fit place-items-center grid grid-cols-4 gap-4 mt-6`}
                >
                    {uniqueVillage.state
                        .slice(pageVisited, pageVisited + cityPerPage)
                        .map((cinema, i) => (
                            <div
                                key={i}
                                className={`place-content-center text-textColor p-10 rounded-xl hover:cursor-pointer ${
                                    uniqueVillage.active !== undefined &&
                                    uniqueVillage.active.marapchieu ===
                                        uniqueVillage.state[i].marapchieu
                                        ? 'bg-mainColor text-white'
                                        : 'bg-bgmain'
                                }`}
                                onClick={() => toggleActiveElement(i)}
                            >
                                <p className=" font-semibold text-3xl">
                                    {cinema.tinhthanh}
                                </p>
                                <p className=" mt-4">{cinema.diachi}</p>
                            </div>
                        ))}
                </div>
                {uniqueVillage.state.length > 0 && (
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

export default Cinema;
