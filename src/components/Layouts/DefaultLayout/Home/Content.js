import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilms } from '~/axiosAPI/filmsApi';
import { storage } from '~/middleware/firebase';
import filmsSlice from '~/redux/filmsSlice';
import SwiperAuto from './SwiperAuto';

function Content() {
    const [filmsAPI, setFilmsAPI] = useState([]);
    const [films, setFilms] = useState([]);
    const [current, setCurrent] = useState(1);
    const pageSize = 4;

    const dispatch = useDispatch();
    const dataFilms = async () => {
        try {
            const response = await getFilms();
            if (response) {
                if (response.status === 200) {
                    setFilmsAPI(response.data.data);
                    dispatch(filmsSlice.actions.saveFilms(response.data.data));
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const getImgFilm = async (urlImg, maphim) => {
        const result = await getDownloadURL(ref(storage, `files/${urlImg}`))
            .then((url) => {
                return url;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    };

    useEffect(() => {
        dataFilms();
    }, []);

    useEffect(() => {
        if (filmsAPI) {
            filmsAPI.map(async (film) => {
                if (film.theloaiphim) {
                    const type = film.theloaiphim.reduce(
                        (str, current, index) => {
                            return index !== film.theloaiphim.length - 1
                                ? (str = str + current.tentheloaiphim + ', ')
                                : (str = str + current.tentheloaiphim);
                        },
                        '',
                    );
                    const src = await getImgFilm(
                        film.anhtitle,
                        film.maphim,
                    ).then((url) =>
                        setFilms((films) => [
                            ...films,
                            { film: film, type: type, src: url },
                        ]),
                    );
                }
            });
        }
    }, [filmsAPI]);

    return (
        <div>
            <div className="flex items-center justify-center mb-8">
                <div className="w-3/4">
                    <p className="font-bold text-center my-6 text-4xl">
                        Xin chào bạn đến với rạp chiếu phim Filmax
                    </p>
                    <p className="font-semibold text-center mb-6 text-2xl">
                        Filmax hân hạnh phục vụ bạn những thước phim chất lượng
                    </p>
                    <p className="border-2 text-mainColor"></p>

                    {films.length > 0 && (
                        <SwiperAuto
                            films={films}
                            current={current}
                            pageSize={pageSize}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Content;
