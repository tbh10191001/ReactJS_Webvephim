function Price({ seats }) {
    const seatsType = seats.reduce((arr, current) => {
        if (!arr.find((item) => item.tenloaighe === current.tenloaighe)) {
            arr.push(current);
        }
        return arr;
    }, []);
    return (
        <div className="mt-10 border-4 border-btGreen bg-bgmain shadow-3xl p-6">
            {seatsType.length !== 0 ? (
                seatsType.map((seat, index) => (
                    <div
                        key={index}
                        className="flex items-center mt-6 pt-4 border-t-2 border-textColor first:mt-0 first:pt-4 first:border-none"
                    >
                        <div className="text-white flex-1">
                            <div className="flex">
                                <p className="font-semibold mr-6">Loại ghế:</p>
                                <p className="mr-4">{seat.tenloaighe}</p>
                            </div>
                            <div className="flex">
                                <p className="font-semibold mr-6">Giá:</p>
                                <div className="text-white">
                                    {seat.giaghe.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default Price;
