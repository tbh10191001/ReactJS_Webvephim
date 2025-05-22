import ButtonSizeM from '~/components/Button/ButtonsizeM';
import CountdownComp from './CountdownComp';
import { useState } from 'react';
import { payment } from '~/axiosAPI/orderApi';

function Order({ masuatchieu, seatPick, setResult, setMessage, result }) {
    const [appTransId, setAppTransId] = useState();
    const grSeats = seatPick.reduce((groups, seat) => {
        const type = seat.tenloaighe;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(seat);
        return groups;
    }, {});
    const totalPrice = seatPick.reduce((total, current) => {
        return (total += current.giaghe);
    }, 0);
    const handlePayment = async (totalPrice, masuatchieu, seatPick) => {
        try {
            const response = await payment({
                giatongcong: totalPrice,
                masuatchieu,
                list: seatPick,
            });
            if (response) {
                if (response.status === 200) {
                    if (response.data.return_code === 1) {
                        window.open(response.data.order_url, '_blank').focus();
                        setAppTransId(response.data.app_trans_id);
                    } else {
                        setResult(1);
                        setMessage(response.data.return_message);
                    }
                } else {
                    setResult(2);
                    setMessage(response.response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="p-4 bg-bgmain">
            <p className="text-white font-semibold text-center mt-10 text-3xl">
                Đơn hàng của bạn
            </p>

            <div className="px-6 border-t-2 border-textColor mt-10">
                <div className=" text-white ">
                    <div className=" my-6 grid grid-cols-3">
                        <p className=" font-semibold">Loại</p>
                        <p className="font-semibold text-center">Mã</p>
                        <p id="normal" className="font-semibold text-end">
                            Giá
                        </p>
                    </div>
                    {grSeats['thường'] &&
                        grSeats['thường'].map((item, index) => (
                            <div className="grid grid-cols-3">
                                <div>{item.tenloaighe}</div>
                                <div className="text-center">{item.index}</div>
                                <div id="normal" className="text-end">
                                    {item.giaghe}
                                </div>
                            </div>
                        ))}
                    {grSeats['sweetbox'] &&
                        grSeats['sweetbox'].map((item, index) => (
                            <div className="grid grid-cols-3">
                                <div>{item.tenloaighe}</div>
                                <div className="text-center">{item.index}</div>
                                <div id="normal" className="text-end">
                                    {item.giaghe}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="text-white border-t-2 border-textColor mt-10">
                <div className="mt-10 flex justify-between px-6 font-semibold">
                    <p>Tổng cộng:</p>
                    <p className="text-mainColor font-semibold">{totalPrice}</p>
                </div>
            </div>
            <div className="">
                {appTransId && (
                    <CountdownComp
                        appTransId={appTransId}
                        masuatchieu={masuatchieu}
                        totalPrice={totalPrice}
                        seatPick={seatPick}
                        setResult={setResult}
                        setMessage={setMessage}
                        result={result}
                    />
                )}
            </div>
            {seatPick.length > 0 && (
                <p className="text-mainColor text-xl italic px-6 mt-2">
                    Vui lòng thanh toán trước khi rời đi để hệ thống giữ chỗ cho
                    bạn nhé.
                </p>
            )}
            <div className="flex justify-center mt-10">
                <ButtonSizeM
                    title={'Thanh toán'}
                    primaryColor={'yellow'}
                    onClick={() =>
                        handlePayment(totalPrice, masuatchieu, seatPick)
                    }
                    disabled={seatPick.length === 0 ? true : false}
                />
            </div>
        </div>
    );
}

export default Order;
