import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, ConfigProvider } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function CardComp({ grOrders, current, pageSize }) {
    const navigator = useNavigate();
    return (
        <>
            {grOrders &&
                Array.from(grOrders).map(([key, value], index) => {
                    if (
                        (current - 1) * pageSize <= index &&
                        index <= current * pageSize - 1
                    )
                        return (
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#b91c1c',
                                    },
                                }}
                            >
                                <Card
                                    // style={{ width: '100%' }}
                                    actions={[
                                        <InfoCircleOutlined
                                            key="info"
                                            onClick={() => {
                                                navigator(
                                                    `/customer/orders/${key}`,
                                                );
                                            }}
                                        />,
                                    ]}
                                >
                                    <Meta
                                        title={key}
                                        description={
                                            <div className=" ">
                                                <div className="text-xl">
                                                    <p className="mb-2">
                                                        Phim: {value[0].tenphim}
                                                    </p>
                                                    <p className="mb-2">
                                                        Suất chiếu:{' '}
                                                        {value[0].giochieu} -{' '}
                                                        {moment(
                                                            value[0].ngaychieu,
                                                        ).format('DD/MM/YYYY')}
                                                    </p>
                                                    <p className="mb-2">
                                                        Số lượng vé:{' '}
                                                        {value.length}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </ConfigProvider>
                        );
                })}
        </>
    );
}

export default CardComp;
