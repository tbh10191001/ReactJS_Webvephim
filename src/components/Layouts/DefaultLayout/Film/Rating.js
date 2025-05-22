import { HeartOutlined } from '@ant-design/icons';
import { ConfigProvider, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { getRatingFilm } from '~/axiosAPI/filmsApi';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function Rating({ id }) {
    const [value, setValue] = useState(3);
    const [rating, setRating] = useState([]);
    const getRating = async () => {
        const response = await getRatingFilm({
            idphim: id,
        });
        if (response) {
            if (response.status === 200) {
                setRating(response.data.data);
            }
        }
    };
    useEffect(() => {
        getRating();
    }, []);
    useEffect(() => {
        if (rating.length > 0) {
            const sumOfRating = rating.reduce((sum, current) => {
                return current.diem + sum;
            }, 0);
            setValue(sumOfRating / rating.length);
        }
    }, [rating]);
    console.log(rating);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#fff',
                },
            }}
        >
            {rating.length > 0 ? (
                <div className="flex items-center">
                    <Rate
                        tooltips={desc}
                        value={value}
                        allowHalf
                        disabled
                        className=" text-xl"
                    />
                    <span className="ml-6">({rating.length})</span>
                </div>
            ) : (
                <p>Chưa có đánh giá</p>
            )}
        </ConfigProvider>
    );
}

export default Rating;
