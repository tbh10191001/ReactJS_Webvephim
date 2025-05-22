import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ratingFilm } from '~/axiosAPI/filmsApi';
import AlertNoti from '~/components/Notifications/alertNoti';
import { getAccessToken } from '~/cookies/cookies';

function RatingStar({
    idphim,
    count = 5,
    rating,
    color = { filled: '#eab308', unfilled: '#a3a3a3' },
    onRating,
}) {
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);
    const navigator = useNavigate();

    const [ishover, setIsHover] = useState(0);
    const getColor = (index) => {
        if (ishover >= index) {
            return color.filled;
        } else if (!ishover && rating >= index) {
            return color.filled;
        }
        return color.unfilled;
    };

    const handleRating = (index) => {
        const token = getAccessToken();
        if (token === null) {
            setIsDisplay(true);
        } else {
            ratingAPI(index, token);
        }
    };

    const ratingAPI = async (index, token) => {
        const rating = index;
        const response = await ratingFilm({
            rating,
            idphim,
            token,
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
        } else {
            setDesc('Server đang xảy ra lỗi');
            setType('error');
            setIsSuccess(true);
        }
    };
    const startRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, index) => index + 1)
            .map((index) => (
                <>
                    <FontAwesomeIcon
                        icon={faStar}
                        className="cursor-pointer"
                        onClick={() => {
                            handleRating(index);
                            onRating(index);
                        }}
                        style={{ color: getColor(index) }}
                        onMouseEnter={() => setIsHover(index)}
                        onMouseLeave={() => setIsHover(0)}
                    />
                </>
            ));
    }, [count, rating, ishover]);
    function handleAccept() {
        setIsDisplay(false);
        navigator('/login');
    }
    function handleCancel() {
        setIsDisplay(false);
    }
    return (
        <div>
            {startRating}
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
            {isDisplay && (
                <Modal
                    title={`Đánh giá phim thất bại`}
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
                >
                    Vui lòng đăng nhập vào trang web để tiến hành đánh giá phim.
                </Modal>
            )}
        </div>
    );
}

export default RatingStar;
