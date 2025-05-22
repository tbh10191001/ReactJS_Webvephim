import { forwardRef, useEffect, useState } from 'react';
import { getCinemaByDate, getTimeByDate } from '~/axiosAPI/showtimeApi';
import Cinema from './Showtime/Cinema';
import Date from './Showtime/Date';
import Time from './Showtime/Time';

const Showtime = forwardRef(({ maphim, film, showtimes, date }, ref) => {
    const [cinema, setCinema] = useState();
    const [time, setTime] = useState([]);
    const { datePick, renderDate } = Date({ date });
    const getCinema = async () => {
        try {
            const response = await getCinemaByDate({
                ngaychieu: datePick,
            });
            if (response) {
                if (response.status === 200) {
                    setCinema(response.data.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getTime = async () => {
        try {
            const response = await getTimeByDate({
                ngaychieu: datePick,
            });
            if (response) {
                if (response.status === 200) {
                    setTime(response.data.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (datePick) {
            getCinema();
            getTime();
        }
    }, datePick);

    return (
        <div>
            <p className="text-white text-4xl font-bold text-center">
                SUẤT CHIẾU PHIM
            </p>
            <p className="border-2 border-mainColor mt-10"></p>
            {date && renderDate && date.length > 0 ? (
                renderDate
            ) : (
                <p className="text-white text-center mt-20 font-semibold text-3xl">
                    Rấc tiếc! hiện phim chưa có suất chiếu
                </p>
            )}
            {cinema && time ? (
                cinema.length > 0 &&
                time.length > 0 && (
                    <div className="mt-6 grid grid-cols-4 gap-10">
                        <Cinema cinema={cinema} />
                        <div className="col-span-3 grid grid-cols-8 grid-rows-2 gap-4">
                            <Time time={time} />
                        </div>
                    </div>
                )
            ) : (
                <></>
            )}
        </div>
    );
});

export default Showtime;
