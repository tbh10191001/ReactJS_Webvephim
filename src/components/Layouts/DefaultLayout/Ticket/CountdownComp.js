import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Statistic } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { paymentStatus } from '~/axiosAPI/orderApi';

const { Countdown } = Statistic;

function CountdownComp({
    appTransId,
    masuatchieu,
    totalPrice,
    seatPick,
    setResult,
    setMessage,
    result,
}) {
    const [value, setValue] = useState(15 * 60 * 1000);
    // const [value, setValue] = useState(30 * 1000);
    const [returnCode, setReturnCode] = useState(3);

    async function handleCheckStatus() {
        try {
            const response = await paymentStatus({
                appTransId,
                masuatchieu,
                totalPrice,
                seatPick,
            });
            if (response) {
                if (response.status === 200) {
                    if (response.data.return_code === 1) {
                        setResult(3);
                        setMessage(response.data.return_message);
                    }
                    setReturnCode(response.data.return_code);
                } else {
                    setResult(2);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue(value - 1000);
        }, 1000);
        if (value === 0 && returnCode !== 1) {
            setResult(1);
            setMessage('Hết thời gian giữ ghế, thanh toán thất bại!');
        }
        if (returnCode === 1 || value === 0) {
            clearTimeout(timeout);
        }
        if (returnCode === 3) {
            handleCheckStatus();
        }
    }, [value]);

    return (
        <>
            {result !== 3 && (
                <div className="text-white flex justify-between">
                    <p>
                        <FontAwesomeIcon
                            icon={faClockRotateLeft}
                            className="mr-4"
                        />
                        Thời gian giữ ghế:
                    </p>
                    <div className="text-mainColor">
                        {moment(value).format('mm:ss')}
                    </div>
                </div>
            )}
        </>
    );
}

export default CountdownComp;
