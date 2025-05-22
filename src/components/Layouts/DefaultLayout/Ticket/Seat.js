function Seat({ index, seat, seatPick, setSeatPick }) {
    return (
        <div
            key={seat.maghe}
            className={` seatForm
                ${seat.tenloaighe === 'thường' ? 'seatGreen' : 'seatPink'} 
                ${seat.isBooked === true ? 'seatDisable' : ''} `}
            onClick={(e) => {
                const choosen = seatPick.filter(
                    (item) => item.maghe === seat.maghe,
                );
                if (choosen.length > 0) {
                    setSeatPick(() =>
                        seatPick.filter((item) => item.maghe !== seat.maghe),
                    );
                    seat.tenloaighe === 'thường'
                        ? (e.target.className += 'seatGreen')
                        : (e.target.className += 'seatPink');
                } else {
                    setSeatPick(() => [
                        ...seatPick,
                        { ...seat, index: index + 1 },
                    ]);
                    e.target.className += ' bg-mainColor';
                }
            }}
        >
            {index + 1}
        </div>
    );
}

export default Seat;
