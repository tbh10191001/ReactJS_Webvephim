import {
    faCheck,
    faCircleLeft,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    acceptedTicket,
    deleteTicket,
    getInfomation,
    getTicketsByID,
} from '~/axiosAPI/ticketApi';
import Moment from 'moment';
import { Modal } from 'antd';
import { getAccessToken } from '~/cookies/cookies';

function TicketInfo() {
    let { mave } = useParams();
    const [info, setInfo] = useState([]);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);
    const [isFailed, setIsFalied] = useState(false);

    const [isAccepted, setIsAccepted] = useState(false);

    const navigator = useNavigate();
    Moment.locale('vi');
    console.log(info);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const token = getAccessToken();
                const response = await getTicketsByID({ token, mave });
                if (response) {
                    if (response.status === 200) {
                        setInfo(response.data.data);
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

    const cancelTicket = async () => {
        try {
            const token = getAccessToken();
            const response = await deleteTicket({
                token,
                mave,
                giatongcong: info.giatongcong,
                sdtkhachhang: info.sdtkhachhang,
            });
            if (response) {
                if (response.status === 200) {
                    setDesc(response.data.message);
                    setType('success');
                    setIsSuccess(true);
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

    async function handleAccept() {
        const time = new Date(info.thoigianbatdau);
        const day = new Date();
        const today = day.getTime();

        if (today < time) {
            await cancelTicket();
            setIsDisplay(false);
        } else {
            setIsFalied(true);
            setIsDisplay(false);
        }
    }

    function handleCancel() {
        setIsDisplay(false);
    }

    function handleAccepted() {
        setIsAccepted(false);
        navigator('/staff/tickets');
    }
    async function handleUpdateStatusTicket() {
        try {
            const token = getAccessToken();
            const response = await acceptedTicket({
                token,
                mave: info.mave,
                email: info.email,
            });
            if (response) {
                if (response.status === 200) {
                    setDesc(response.data.message);
                    setType('success');
                    setIsSuccess(true);
                    setIsAccepted(true);
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
    }

    return (
        <div className="bg-bgmain w-full py-10" style={{ marginTop: 60 }}>
            <div className="relative">
                <p className="text-white font-semibold text-4xl text-center">
                    Thông tin vé xem phim
                </p>
                <div
                    onClick={() => navigator('/staff/tickets')}
                    className="text-white absolute left-3 top-1/2 font-semibold -translate-y-1/2 flex items-center hover:text-mainColor hover:cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={faCircleLeft}
                        className="ml-2 text-6xl"
                    />
                </div>
            </div>
            <div className="mx-32 px-10 py-4 bg-bgthird rounded-3xl shadow-3xl mt-10">
                {info.length !== 0 ? (
                    <div className="text-white">
                        <div className="mt-6 grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Mã vé
                            </p>
                            <p className="col-span-4 pt-6">{info.mave}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                SDT khách hàng
                            </p>
                            <p className="pt-6 col-span-4">
                                {info.sdtkhachhang}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Email khách hàng
                            </p>
                            <p className="pt-6 col-span-4">{info.email}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Tên phim
                            </p>
                            <p className="pt-6 col-span-4">{info.tenphim}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Thời gian bắt đầu
                            </p>
                            <p className="pt-6 col-span-4">
                                {Moment(info.thoigianbatdau).format(
                                    'hh:mm:ss DD/MM/YYYY',
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Thời lượng chiếu
                            </p>
                            <p className="pt-6 col-span-4">
                                {info.thoiluongchieu} phút
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Ngôn ngữ
                            </p>
                            <p className="pt-6 col-span-4">{info.ngonngu}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Giới hạn độ tuổi
                            </p>
                            <p className="pt-6 col-span-4">{info.dotuoixem}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Mã ghế
                            </p>
                            <p className="pt-6 col-span-4">{info.maghe}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Tên ghế
                            </p>
                            <p className="pt-6 col-span-4">
                                {info.tenghe !== null ? (
                                    <>{info.tenghe}</>
                                ) : (
                                    <></>
                                )}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Loại ghế
                            </p>
                            <p className="pt-6 col-span-4">{info.tenloaighe}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Giá vé:
                            </p>
                            <p className="pt-6 col-span-4">
                                {info.giatongcong.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Thời gian thanh toán
                            </p>
                            <p className="pt-6 col-span-4">
                                {info.thoigianthanhtoan !== null ? (
                                    <>
                                        {Moment(info.thoigianthanhtoan).format(
                                            'hh:mm:ss DD/MM/YYYY',
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold pt-6 border-r border-textColor">
                                Trạng thái vé:
                            </p>
                            <p className="pt-6 col-span-4 italic">
                                {info.trangthaive === 0 ? (
                                    <span className="text-yellow">
                                        Vé đã được đặt
                                    </span>
                                ) : info.trangthaive === 1 ? (
                                    <span className="text-btGreen">
                                        Vé đã được xác nhận
                                    </span>
                                ) : (
                                    <span className="text-mainColor">
                                        Vé đã huỷ
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <p className="font-semibold py-6 border-r border-textColor">
                                Hiệu lực
                            </p>

                            {info.trangthaivaorap.data[0] === 0 ? (
                                <p className="pt-6 col-span-4 italic text-btGreen">
                                    Vé còn hiệu lực
                                </p>
                            ) : (
                                <p className="pt-6 col-span-4 italic text-mainColor">
                                    Vé hết hiệu lực
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="flex items-center justify-center gap-5">
                <div className="text-white text-center mt-10">
                    <button
                        onClick={handleUpdateStatusTicket}
                        disabled={
                            info.trangthaive === 1 || info.trangthaive === 2
                                ? true
                                : false
                        }
                        className={`py-4 px-20 rounded-full font-semibold ${
                            info.trangthaive === 1 || info.trangthaive === 2
                                ? 'bg-bgthird text-white cursor-not-allowed'
                                : 'bg-btGreen hover:text-btGreen hover:bg-white'
                        }`}
                    >
                        Xác nhận
                        <FontAwesomeIcon icon={faCheck} className="ml-2" />
                    </button>
                </div>
                <div className="text-white text-center mt-10">
                    <button
                        onClick={() => setIsDisplay(true)}
                        disabled={
                            info.trangthaivaorap === 0 || info.trangthaive === 1
                                ? true
                                : false
                        }
                        className={`py-4 px-20 rounded-full font-semibold ${
                            info.trangthaive === 1 || info.trangthaive === 2
                                ? 'bg-bgthird text-white cursor-not-allowed'
                                : 'bg-mainColor hover:text-mainColor hover:bg-white'
                        }`}
                    >
                        Huỷ vé
                        <FontAwesomeIcon icon={faTrash} className="ml-2" />
                    </button>
                </div>
            </div>
            {isDisplay && (
                <Modal
                    title={`Bạn có chắc chắn muốn huỷ vé?`}
                    mask={false}
                    open={isDisplay}
                    onOk={handleAccept}
                    okText="Xác nhận"
                    okButtonProps={{
                        style: {
                            backgroundColor: '#b91c1c',
                            '&:hover': {
                                background: '#efefef',
                            },
                        },
                    }}
                    onCancel={handleCancel}
                    cancelText="Thoát"
                ></Modal>
            )}
            {isFailed && (
                <Modal
                    title={`Huỷ vé thất bại`}
                    mask={false}
                    open={isFailed}
                    onOk={handleAccepted}
                    okText="Xác nhận"
                    okButtonProps={{
                        style: {
                            backgroundColor: '#b91c1c',
                            '&:hover': {
                                background: '#efefef',
                            },
                        },
                    }}
                    cancelButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                >
                    Vé của bạn đã quá hạn.
                </Modal>
            )}{' '}
            {isAccepted && (
                <Modal
                    title={`Xác nhận vé thành công.`}
                    mask={false}
                    open={isAccepted}
                    onOk={handleAccepted}
                    okText="Xác nhận"
                    okButtonProps={{
                        style: {
                            backgroundColor: '#b91c1c',
                            '&:hover': {
                                background: '#efefef',
                            },
                        },
                    }}
                    cancelButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                >
                    Vui lòng kiểm tra lại vé mã {info.mave}
                </Modal>
            )}{' '}
        </div>
    );
}

export default TicketInfo;
