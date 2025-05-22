import { useState } from 'react';
import Seat from './Seat';

function Map({ seats, listTickets }) {
    const [seatPick, setSeatPick] = useState([]);
    const grSeats = seats.reduce((groups, seat, index) => {
        let isBooked = false;
        if (listTickets.length > 0) {
            isBooked = listTickets.some(
                (booked) => booked.maghe === seat.maghe,
            );
        }
        const type = seat.tenloaighe;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push({ ...seat, isBooked: isBooked });
        return groups;
    }, {});
    console.log('listTickets', listTickets);
    console.log('grSeats', grSeats);

    return {
        seatPick: seatPick,
        renderMap: (
            <div className="bg-bgmain px-20 shadow-3xl py-20 mt-20">
                <div className="text-white bg-bgthird py-4 mb-10 font-semibold text-center">
                    Màn hình chiếu phim
                </div>
                <div className="pb-20">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-btGreen"></div>
                        <p className="text-white ml-6">Ghế thường còn trống</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-10 h-10 bg-bgPink"></div>
                        <p className="text-white ml-6">
                            Ghế sweetbox còn trống
                        </p>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-10 h-10 bg-bgthird"></div>
                        <p className="text-white ml-6">Chỗ ngồi đã được đặt</p>
                    </div>
                </div>
                <div className="grid grid-cols-10 gap-10 place-content-center pb-20">
                    {grSeats['thường'] &&
                        grSeats['thường'].map((seat, index) => (
                            <Seat
                                index={index}
                                seat={seat}
                                seatPick={seatPick}
                                setSeatPick={setSeatPick}
                            />
                        ))}
                </div>

                <div className="grid grid-cols-10 mt-4 gap-10 place-content-center">
                    {grSeats['sweetbox'] &&
                        grSeats['sweetbox'].map((seat, index) => (
                            <Seat
                                index={index}
                                seat={seat}
                                seatPick={seatPick}
                                setSeatPick={setSeatPick}
                            />
                        ))}
                </div>
            </div>
        ),
    };
}

export default Map;
