import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentHome from '../Home/Content';
const logoWeb = require('~/images/logoWeb.png');

function CinemaCity() {
    let { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    let cinemas = JSON.parse(localStorage.getItem('cinemas'));
    let filter = cinemas.filter(
        (cinema) => cinema.tinhthanh === cinemas.at(id - 1).tinhthanh,
    );

    return (
        <div className="w-full h-full" style={{ marginTop: 56 }}>
            <div className="h-screen flex flex-col items-center bg-bgmain">
                <div className="block uppercase mb-12 mt-20 text-white font-semibold text-3xl">
                    HỆ THỐNG RẠP PHIM FILMAX TẠI {cinemas.at(id - 1).tinhthanh}
                </div>
                <div className="w-2/3 grid grid-cols-[1fr_1fr] grid-cols-2 gap-4">
                    {filter.map((city, i) => (
                        <div
                            to={`/cinema/${city.marapchieu}`}
                            key={i}
                            className="text-white h-fit p-10 rounded-xl bg-bgsecondary"
                        >
                            <img src={logoWeb} />

                            <p className="text-textColor mt-4">
                                Địa chỉ: {city.diachi}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <ContentHome />
        </div>
    );
}

export default CinemaCity;
