import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCinemas } from '~/axiosAPI/cinemaApi';
import cinemasSlice from '~/redux/cinemasSlice';
import ContentHome from '../components/Layouts/DefaultLayout/Home/Content';
const logoWeb = require('~/images/logoWeb.png');

function Cinema() {
    const [cinemas, setCinemas] = useState([]);

    const dispatch = useDispatch();
    const dataCinemas = async () => {
        try {
            const response = await getCinemas();
            if (response) {
                if (response.status === 200) {
                    setCinemas(response.data.data);
                    dispatch(
                        cinemasSlice.actions.saveCinemas(response.data.data),
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        dataCinemas();
    }, []);

    const uniqueCity = cinemas.reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.tinhthanh === current.tinhthanh)) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);

    return (
        <div className="w-full h-full" style={{ marginTop: 55 }}>
            <div className="h-screen flex flex-col items-center bg-bgmain">
                <div className="block mb-12 mt-20 text-white font-semibold text-3xl">
                    HỆ THỐNG RẠP PHIM FILMAX
                </div>
                <div className="w-2/3 grid grid-cols-[1fr_1fr] gap-4">
                    {uniqueCity.map((city, i) => (
                        <Link
                            to={`/cinema/${city.marapchieu}`}
                            key={i}
                            className="text-white h-fit p-10 rounded-xl bg-bgsecondary hover:text-mainColor hover:cursor-pointer"
                        >
                            <img src={logoWeb} />
                            <p className=" mt-10 ">Filmax {city.tinhthanh}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <ContentHome />
        </div>
    );
}

export default Cinema;
