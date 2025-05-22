import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteFilm, filterFilmName, getFilms } from '~/axiosAPI/filmsApi';
import ButtonText from '~/components/Button/ButtonText';
import { deleteImageFirebase } from '~/components/FirebaseIMG';
import InputSearch from '~/components/Input/InputSearch';
import NotificationComp from '~/components/Notifications/Notification';
import PaginationComp from '~/components/Pagination/PaginationComp';
import { storage } from '~/middleware/firebase';
import CardComp from './Films/CardComp';
import ButtonSizeM from '~/components/Button/ButtonsizeM';

function Films() {
    const [filmsAPI, setFilmsAPI] = useState([]);
    const [films, setFilms] = useState([]);
    const [current, setCurrent] = useState(1);
    let pageSize = 3;
    const [searchName, setSearchName] = useState('');
    const [result, setResult] = useState(0);
    const [message, setMessage] = useState(false);
    const navigator = useNavigate();
    const { openNotification, renderNotification } = NotificationComp();

    const dataFilms = async (value) => {
        try {
            const response = await getFilms();
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
                    } else {
                        setFilmsAPI([]);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getImgFilm = async (urlImg, idphim) => {
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
        await filmsAPI.map(async (film) => {
            if (film.theloaiphim) {
                const type = film.theloaiphim.reduce((str, current, index) => {
                    return index !== film.theloaiphim.length - 1
                        ? (str = str + current.tentheloaiphim + ', ')
                        : (str = str + current.tentheloaiphim);
                }, '');
                setFilms([]);
                await getImgFilm(film.anhtitle, film.maphim).then((url) =>
                    setFilms((films) => [
                        ...films,
                        { film: film, type: type, src: url },
                    ]),
                );
            }
        });
    };

    useEffect(() => {
        if (filmsAPI) {
            convertObjToRender();
        }
    }, [filmsAPI]);

    useEffect(() => {
        if (searchName !== '') {
            filterName();
        } else {
            dataFilms();
        }
    }, [searchName]);

    const handleDeleteFilm = async (film) => {
        try {
            const response = await deleteFilm(film.maphim);
            if (response) {
                console.log(response);
                if (response.status === 200) {
                    await deleteImageFirebase(film.anhphim);
                    setResult(1);
                    setMessage(response.data.message);
                } else {
                    setResult(2);
                    setMessage(response.response.data.message);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="">
            <div className="flex justify-between items-center pb-8">
                <div className="w-2/3">
                    <InputSearch
                        placeholder={'Tìm kiếm tên phim...'}
                        enterButton={
                            <FontAwesomeIcon
                                icon={faSearch}
                                className=" text-mainColor"
                            />
                        }
                        size={'middle'}
                        setSearchValue={setSearchName}
                    />
                </div>
                <ButtonText
                    title={
                        <div className="flex items-center text-mainColor gap-4 px-2">
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <p>Thêm phim</p>
                        </div>
                    }
                    css={'mr-0 hover:text-white'}
                    onClick={() => {
                        navigator('/staff/films/addfilm');
                    }}
                    primaryColor={'pinkColor'}
                />
            </div>

            {films && (
                <CardComp
                    films={films}
                    current={current}
                    pageSize={pageSize}
                    handleDeleteFilm={handleDeleteFilm}
                />
            )}
            <div className="text-center mt-10">
                {films && (
                    <PaginationComp
                        total={films}
                        current={current}
                        setCurrent={setCurrent}
                        pageSize={pageSize}
                    />
                )}
            </div>
            {renderNotification}
            {result === 1 ? (
                openNotification('success', 'Successfully', message)
            ) : result === 2 ? (
                openNotification('error', 'Error', message)
            ) : result === 3 ? (
                openNotification(
                    'error',
                    'Error',
                    'Failed to delete image, something went wrong',
                )
            ) : (
                <></>
            )}
        </div>
    );
}

export default Films;
