import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetail, refund, refundStatus } from '~/axiosAPI/orderApi';
import ButtonSizeM from '~/components/Button/ButtonsizeM';
import Detail from './OrderDetail/Detail';
import NotificationComp from '~/components/Notifications/Notification';

function OrderDetail() {
    let { mahoadon } = useParams();
    const [orderDetail, setOrderDetail] = useState();
    const { renderNotification, openNotification } = NotificationComp();
    const [result, setResult] = useState();
    const [message, setMessage] = useState();

    const navigator = useNavigate();

    useEffect(() => {
        const getOrderDetailData = async () => {
            try {
                const response = await getOrderDetail(mahoadon);
                if (response) {
                    if (response.status === 200) {
                        setOrderDetail(response.data.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getOrderDetailData();
    }, []);

    async function cancelOrderApi() {
        try {
            const response = await refund({
                zpTransID: orderDetail.data.zpTransID,
                amount: orderDetail.data.giatongcong,
                description: 'Huỷ hoá đơn',
                mahoadon,
                seats: orderDetail.seats,
                ngaychieu: orderDetail.data.ngaychieu,
                giochieu: orderDetail.data.giochieu,
            });
            if (response) {
                if (response.status === 200) {
                    console.log(response.data);
                } else {
                    setResult(2);
                    setMessage(response.response.data.message);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (orderDetail && orderDetail.data.trangthaihoadon === 2) {
            const getRefundStatus = async () => {
                try {
                    const response = await refundStatus(
                        orderDetail.data.mRefundID,
                        orderDetail.data.mahoadon,
                    );
                    if (response) {
                        if (response.status === 200) {
                            console.log(response.data);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            getRefundStatus();
        }
    }, [orderDetail]);
    return (
        <div className="bg-bgmain w-full py-10" style={{ marginTop: 60 }}>
            <div className="relative">
                <p className="text-white font-semibold text-4xl text-center">
                    Thông tin hoá đơn
                </p>
                <div
                    onClick={() => navigator('/customer/orders')}
                    className="text-white absolute left-3 top-1/2 font-semibold -translate-y-1/2 flex items-center hover:text-mainColor hover:cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={faCircleLeft}
                        className="ml-2 text-6xl"
                    />
                </div>
            </div>
            {orderDetail && <Detail orderDetail={orderDetail} />}
            <div className="mt-10 text-center">
                {orderDetail && (
                    <ButtonSizeM
                        title={'Huỷ đơn'}
                        primaryColor={'mainColor'}
                        onClick={cancelOrderApi}
                        disabled={
                            orderDetail.data.trangthaihoadon === 1
                                ? false
                                : true
                        }
                    />
                )}
            </div>
            {result === 2 ? openNotification('error', 'Error', message) : <></>}
            {renderNotification}
        </div>
    );
}

export default OrderDetail;
