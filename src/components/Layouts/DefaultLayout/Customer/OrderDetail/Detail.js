import moment from 'moment';

function Detail({ orderDetail }) {
    const grSeats = Map.groupBy(orderDetail.seats, (seat) => seat.tenloaighe);
    return (
        <div className="mx-32 px-10 py-4 bg-bgthird rounded-3xl shadow-3xl mt-10">
            {orderDetail && (
                <div className="text-white">
                    <div className="mt-6 grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Mã hóa đơn
                        </p>
                        <p className="col-span-4 pt-6">
                            {orderDetail.data.mahoadon}
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Thời gian bắt đầu
                        </p>
                        <p className="pt-6 col-span-4">
                            {orderDetail.data.giochieu} -{' '}
                            {moment(orderDetail.data.ngaychieu).format(
                                'DD/MM/YYYY',
                            )}
                        </p>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Tên phim
                        </p>
                        <p className="pt-6 col-span-4">
                            {orderDetail.data.tenphim}
                        </p>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Thời lượng chiếu
                        </p>
                        <p className="pt-6 col-span-4">
                            {orderDetail.data.thoiluongchieu} phút
                        </p>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Ngôn ngữ
                        </p>
                        <p className="pt-6 col-span-4">
                            {orderDetail.data.ngonngu}
                        </p>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Giới hạn độ tuổi
                        </p>
                        <p className="pt-6 col-span-4">
                            {orderDetail.data.dotuoixem}
                        </p>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Ghế
                        </p>
                        {grSeats &&
                            Array.from(grSeats).map(([key, value], index) => {
                                return (
                                    <div className="flex-col col-span-4 items-center pt-6">
                                        <div className="mr-2 capitalize">
                                            {key} - {value[0].giaghe} VND
                                        </div>
                                        {value.map((item, index) => (
                                            <div className="mr-3 mt-2">
                                                Tên ghế: {item.tenghe}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        <p className="font-semibold pt-6 border-r border-textColor">
                            Thời gian thanh toán
                        </p>
                        <p className="pt-6 col-span-4">
                            {orderDetail.data.thoigianthanhtoan &&
                                moment(
                                    orderDetail.data.thoigianthanhtoan,
                                ).format('hh:mm:ss DD/MM/YYYY')}
                        </p>
                    </div>
                    <div className="pt-6 italic">
                        {orderDetail.data.description}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
