import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlertNoti from '~/components/Notifications/alertNoti';
import Moment from 'moment';
import { checkinTicket, getTicketInfosByID } from '~/axiosAPI/ticketApi';
import Modal from 'antd/es/modal/Modal';

function CheckTicket() {
    let { mave } = useParams();
    const id = JSON.parse(mave);
    console.log(id);
    const [obj, setObj] = useState([]);
    const [check, setCheck] = useState(false);
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await getTicketInfosByID({ mave: id });
                if (response) {
                    if (response.status === 200) {
                        setObj(response.data.data);
                        setCheck(true);
                    } else {
                        setDesc(response.response.data.message);
                        setType('error');
                        setIsSuccess(true);
                    }
                }
            } catch (err) {
                console.log(err);
                setDesc('Server đang xảy ra lỗi');
                setType('error');
                setIsSuccess(true);
            }
        };
        getInfo();
    }, []);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const handleAccept = async () => {
        try {
            const response = await checkinTicket({ mave: id });
            if (response) {
                if (response.status === 200) {
                    setDesc(response.data.message);
                    setType('success');
                    setIsSuccess(true);
                    setModal(true);
                } else {
                    setDesc(response.response.data.message);
                    setType('error');
                    setIsSuccess(true);
                }
            }
        } catch (err) {
            console.log(err);
            setDesc('Server đang xảy ra lỗi');
            setType('error');
            setIsSuccess(true);
        }
    };
    const [isModal, setModal] = useState(false);

    return (
        <>
            {obj.length !== 0 ? (
                <div className="flex flex-col h-screen items-center bg-bgsecondary">
                    <p className="text-5xl mt-10 font-semibold text-white">
                        Thông tin vé
                    </p>
                    <div className="w-3/4 bg-bgthird text-white px-10 mt-10 rounded-lg shadow-3xl border border-mainColor">
                        <div className="mt-6 grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Mã vé
                            </p>
                            <p className="col-span-4 pt-6">{obj.mave}</p>
                        </div>
                        <div className=" grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Email khách hàng
                            </p>
                            <p className="col-span-4 pt-6">{obj.email}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Tên phim
                            </p>
                            <p className="col-span-4 pt-6">{obj.tenphim}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Suất chiếu phim
                            </p>
                            <p className="col-span-4 pt-6">
                                {Moment(obj.thoigianbatdau).format(
                                    'hh:mm:ss DD/MM/YYYY',
                                )}
                            </p>
                        </div>
                        <div className=" grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Tên ghế
                            </p>
                            <p className="col-span-4 pt-6">{obj.tenghe}</p>
                        </div>
                        <div className=" grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Loại ghế
                            </p>
                            <p className="col-span-4 pt-6">{obj.tenloaighe}</p>
                        </div>
                        <div className=" grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Thời gian thanh toán
                            </p>
                            <p className="col-span-4 pt-6">
                                {' '}
                                {Moment(obj.thoigianthanhtoan).format(
                                    'hh:mm:ss DD/MM/YYYY',
                                )}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Trạng thái vé
                            </p>
                            {obj.trangthaive === 1 ? (
                                <p className="col-span-4 pt-6 text-btGreen italic">
                                    {' '}
                                    vé đã xác nhận
                                </p>
                            ) : obj.trangthaive === 0 ? (
                                <p className="col-span-4 pt-6 text-yellow italic">
                                    {' '}
                                    vé chưa được xác nhận
                                </p>
                            ) : (
                                <p className="col-span-4 pt-6 text-mainColor italic">
                                    {' '}
                                    vé đã huỷ
                                </p>
                            )}
                        </div>
                        <div className="pb-6 grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Trạng thái vào rạp
                            </p>
                            {obj.trangthaivaorap.data[0] === 0 ? (
                                <p className="col-span-4 pt-6 text-btGreen italic">
                                    {' '}
                                    vé có hiệu lực
                                </p>
                            ) : (
                                <p className="col-span-4 pt-6 text-mainColor italic">
                                    {' '}
                                    vé hết hiệu lực
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            className="text-white font-semibold bg-btGreen px-8 py-2 rounded-full hover:text-btGreen hover:bg-white"
                            onClick={handleAccept}
                        >
                            Xác nhận vào rạp
                        </button>
                    </div>
                    {isSuccess && (
                        <div
                            className={`fixed z-20 right-4 top-24 ${
                                isSuccess
                                    ? 'animate-[sildeInRight_1s_ease-in-out]'
                                    : 'animate-[hide_1s_ease-in-out]'
                            }`}
                        >
                            <AlertNoti type={type} desc={desc} />
                        </div>
                    )}
                    {isModal && (
                        <Modal
                            title={`Trang web sẽ tự động đóng trong 3 giây...`}
                            open={isModal}
                            footer={false}
                            closable={false}
                        ></Modal>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default CheckTicket;
