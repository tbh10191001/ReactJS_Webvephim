import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Empty, Spin } from 'antd';
import { getDownloadURL, ref } from 'firebase/storage';
import { set } from 'lodash';
import { useEffect, useState } from 'react';
import {
    filterFilmDate,
    filterFilmName,
    filterFilmType,
    getFilms,
    getTypeOfFilm,
} from '~/axiosAPI/filmsApi';
import InputSearch from '~/components/Input/InputSearch';
import Card from '~/components/Layouts/DefaultLayout/Films/Card';
import PaginationComp from '~/components/Pagination/PaginationComp';
import SelectComp from '~/components/Select/SelectComp';
import { storage } from '~/middleware/firebase';

function Films() {
    const [filmsAPI, setFilmsAPI] = useState([]);
    const [films, setFilms] = useState([]);
    const [types, setTypes] = useState();
    const [current, setCurrent] = useState(1);
    const [isLoading, setIsLoading] = useState();
    let pageSize = 10;
    const { type, renderSelectComp } = SelectComp({
        placeholder: 'Chọn thể loại',
        options: types,
    });
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const obj = {};

    const dataFilms = async () => {
        try {
            setIsLoading(true);
            const response = await getFilms();
            if (response) {
                if (response.status === 200) {
                    setFilmsAPI(response.data.data);
                    setIsLoading(false);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const dataTypes = async () => {
        try {
            const response = await getTypeOfFilm();
            if (response) {
                if (response.status === 200) {
                    setTypes(response.data.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const filterType = async () => {
        try {
            const response = await filterFilmType(type);
            if (response) {
                if (response.status === 200) {
                    setFilmsAPI(response.data.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const filterName = async () => {
        try {
            const response = await filterFilmName(searchName);
            if (response) {
                if (response.status === 200) {
                    if (response.data.data.length > 0) {
                        setFilmsAPI(response.data.data);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const filterDate = async () => {
        try {
            const response = await filterFilmDate(searchDate);
            if (response) {
                if (response.status === 200) {
                    console.log(response.data.data);
                    if (response.data.data.length > 0) {
                        setFilmsAPI(response.data.data);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getImgFilm = async (urlImg) => {
        const result = await getDownloadURL(ref(storage, `files/${urlImg}`))
            .then((url) => {
                return url;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    };
    const convertObjToRender = async () => {
        let temp = [];
        for (let i = 0; i < filmsAPI.length; i++) {
            if (filmsAPI[i].theloaiphim) {
                const type = filmsAPI[i].theloaiphim.reduce(
                    (str, current, index) => {
                        return index !== filmsAPI[i].theloaiphim.length - 1
                            ? (str = str + current.tentheloaiphim + ', ')
                            : (str = str + current.tentheloaiphim);
                    },
                    '',
                );
                await getImgFilm(filmsAPI[i].anhtitle, filmsAPI[i].maphim).then(
                    (url) => {
                        temp.push({ film: filmsAPI[i], type: type, src: url });
                    },
                );
            }
        }
        setFilms(temp);
    };

    useEffect(() => {
        dataTypes();
    }, []);
    useEffect(() => {
        if (filmsAPI) {
            convertObjToRender();
        }
    }, [filmsAPI]);

    useEffect(() => {
        if (type.length > 0) {
            filterType();
        } else {
            dataFilms();
        }
    }, [type]);
    useEffect(() => {
        if (searchName !== '') {
            filterName();
        } else {
            dataFilms();
        }
    }, [searchName]);
    useEffect(() => {
        if (searchDate !== '') {
            filterDate();
        } else {
            dataFilms();
        }
    }, [searchDate]);
    console.log(isLoading);

    return (
        <div
            className="w-full min-h-screen bg-bgmain px-10 flex flex-col"
            style={{ marginTop: 60 }}
        >
            <p className="flex-none text-white text-5xl font-semibold text-center pt-10">
                Danh sách phim tại Filmax
            </p>
            <div className="flex-none mt-10 grid grid-cols-3 gap-10 content-center text-white ">
                <InputSearch
                    placeholder={'Tìm kiếm tên phim...'}
                    enterButton={<FontAwesomeIcon icon={faSearch} />}
                    size={'middle'}
                    setSearchValue={setSearchName}
                />
                <InputSearch
                    placeholder={'Tìm kiếm suất chiếu (DD-MM-YYYY)...'}
                    enterButton={<FontAwesomeIcon icon={faSearch} />}
                    size={'middle'}
                    setSearchValue={setSearchDate}
                />
                {types && renderSelectComp}
            </div>
            {isLoading === true ? (
                <Spin />
            ) : (
                <>
                    {films.length > 0 && (
                        <>
                            <div className="grid grid-cols-5 gap-4 mt-10 h-3/4">
                                {films && (
                                    <Card
                                        films={films}
                                        current={current}
                                        pageSize={pageSize}
                                    />
                                )}
                            </div>
                            <div className="text-center my-10">
                                {films && (
                                    <PaginationComp
                                        total={films}
                                        current={current}
                                        setCurrent={setCurrent}
                                        pageSize={pageSize}
                                    />
                                )}
                            </div>
                        </>
                    )}

                    {films.length === 0 && (
                        <div className="flex-1 flex items-center justify-center ">
                            <Empty
                                description={
                                    <p className=" text-textColor font-semibold text-3xl">
                                        Không có kết quả
                                    </p>
                                }
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Films;
