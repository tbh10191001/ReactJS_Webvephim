import { useEffect, useState } from 'react';
import { getOrders } from '~/axiosAPI/orderApi';
import PaginationComp from '~/components/Pagination/PaginationComp';
import Card from './Orders/Card';

function Orders({ openNotification }) {
    const [result, setResult] = useState(0);
    const [message, setMessage] = useState(false);
    const [orders, setOrders] = useState([]);
    const [current, setCurrent] = useState(1);
    const [grOrders, setGrOrders] = useState(1);
    const pageSize = 6;

    const getListOrder = async (mave) => {
        try {
            const response = await getOrders();
            if (response) {
                console.log(response);
                if (response.status === 200) {
                    setOrders(response.data.data);
                } else {
                    setResult(1);
                    setMessage(response.response.data.message);
                }
            }
        } catch (err) {
            console.log(err);
            setResult(2);
        }
    };
    useEffect(() => {
        getListOrder();
    }, []);
    useEffect(() => {
        setGrOrders(Map.groupBy(orders, (order) => order.mahoadon));
    }, [orders]);

    return (
        <div className=" w-full bg-[#001628] p-10 rounded-2xl">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-5">
                {grOrders && (
                    <Card
                        grOrders={grOrders}
                        current={current}
                        pageSize={pageSize}
                    />
                )}
            </div>
            <div className="text-center mt-10">
                {grOrders && (
                    <PaginationComp
                        total={grOrders}
                        current={current}
                        setCurrent={setCurrent}
                        pageSize={pageSize}
                    />
                )}
            </div>
            {result === 1 ? openNotification('error', 'Error', message) : <></>}
        </div>
    );
}

export default Orders;
