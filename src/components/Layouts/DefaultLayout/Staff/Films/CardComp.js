import {
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Card, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
function CardComp({ films, current, pageSize, handleDeleteFilm }) {
    const navigator = useNavigate();
    return (
        <div className="grid gap-4">
            {films &&
                Array.from(films).map((item, index) => {
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
                                    style={{ width: '100%' }}
                                    actions={[
                                        <DeleteOutlined
                                            key="delete"
                                            onClick={() => {
                                                handleDeleteFilm(item.film);
                                            }}
                                        />,
                                        <EditOutlined key="edit" />,
                                        <InfoCircleOutlined
                                            key="info"
                                            onClick={() => {
                                                navigator(
                                                    `/staff/films/${item.film.maphim}`,
                                                );
                                            }}
                                        />,
                                    ]}
                                >
                                    <Meta
                                        avatar={
                                            <Avatar size={80} src={item.src} />
                                        }
                                        title={item.film.tenphim}
                                        description={
                                            <p className="line-clamp-3">
                                                {item.film.mota}
                                            </p>
                                        }
                                    />
                                </Card>
                            </ConfigProvider>
                        );
                })}
        </div>
    );
}

export default CardComp;
