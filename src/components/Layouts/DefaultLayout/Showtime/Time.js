import { Link } from 'react-router-dom';

function Time({ time, showtime, setShowtime }) {
    return (
        <>
            {time &&
                time.map((item, index) => (
                    <div key={index}>
                        <Link
                            to={`/ticket/${item.masuatchieu}`}
                            key={index}
                            className="text-center w-full h-full flex items-center justify-center bg-bgsecondary shadow-3xl text-white hover:bg-mainColor hover:cursor-pointer"
                        >
                            {item.giochieu}
                        </Link>
                    </div>
                ))}
        </>
    );
}

export default Time;
