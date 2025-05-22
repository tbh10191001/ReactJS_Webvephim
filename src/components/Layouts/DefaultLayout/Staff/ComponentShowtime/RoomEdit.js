import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAccessToken } from '~/cookies/cookies';
import ReactPaginate from 'react-paginate';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Radio, ConfigProvider } from 'antd';
import { getRoomByCinema } from '~/axiosAPI/roomApi';

function RoomEdit({ data, marapchieu }) {
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [checkRooms, setCheckRooms] = useState(false);
    const [checkrap, setCheckrap] = useState(false);
    const [maphongchieu, setMaphongchieu] = useState('');
    const [rapchieu, setRapchieu] = useState('');
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        if (data !== undefined && data !== [] && marapchieu !== undefined) {
            setRapchieu(data.marapchieu);
            setMaphongchieu(data.maphongchieu);
            setCheckrap(true);
        }
    }, [data, marapchieu]);
    useEffect(() => {
        setRapchieu(marapchieu);
    }, [marapchieu]);

    useEffect(() => {
        const dataRoom = async () => {
            try {
                const token = getAccessToken();
                const response = await getRoomByCinema({
                    token,
                    marapchieu: rapchieu,
                });
                if (response) {
                    if (response.status === 200) {
                        setRooms(response.data.data);
                        setCheckRooms(true);
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
            } catch (err) {
                console.log(err);
            }
        };

        dataRoom();
    }, [rapchieu, checkrap]);
    const [roomState, setRoomState] = useState({ active: null, state: [] });
    useEffect(() => {
        if (data !== undefined) {
            const filter = rooms.filter(
                (item) => item.maphongchieu === data.maphongchieu,
            );
            setRoomState({ active: filter[0], state: rooms });
        }
    }, [checkRooms, rooms]);
    const [inputLoaiphong, setInputLoaiphong] = useState('');
    useEffect(() => {
        if (inputLoaiphong.toLowerCase().trim() === '') {
            setRoomState({ ...roomState, state: rooms });
        } else {
            const filter = rooms.filter((item) => {
                return (
                    inputLoaiphong &&
                    item &&
                    item.tenloaiphongchieu &&
                    item.tenloaiphongchieu
                        .toLowerCase()
                        .includes(inputLoaiphong.toLowerCase().trim())
                );
            });
            setRoomState({ ...roomState, state: filter });
        }
    }, [inputLoaiphong]);
    const [pageNumber, setPageNumber] = useState(0);
    const cityPerPage = 2;
    const pageVisited = pageNumber * cityPerPage;
    const [pageCount, setPageCount] = useState(0);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    useEffect(() => {
        if (roomState !== undefined) {
            setPageCount(Math.ceil(roomState.state.length / cityPerPage));
        }
    }, [roomState.state]);
    function toggleActiveElement(e, index) {
        setRoomState({ ...roomState, active: e.target.value });
        setMaphongchieu(e.target.value.maphongchieu);
    }

    return {
        maphongchieu,
        renderRoom: (
            <div>
                <div className="flex items-center mt-10">
                    <div className="w-1/3 ml-6 flex items-center mr-6">
                        <p className="text-white font-semibold text-3xl mr-6">
                            Phòng chiếu
                        </p>
                        <input
                            value={inputLoaiphong}
                            onChange={(e) => setInputLoaiphong(e.target.value)}
                            placeholder="Tìm kiếm loại phòng..."
                            className="border-textColor w-2/3 bg-bgthird rounded-xl px-4 py-2 text-white hover:border-none"
                        />
                    </div>
                    <p className="border border-mainColor w-2/3"></p>
                </div>
                <div className="flex w-full justify-center items-center">
                    <div className="border h-96 w-3/5 flex flex-col justify-center mt-10 border-mainColor rounded-xl bg-bgmain">
                        {roomState.state.length > 0 ? (
                            roomState.state
                                .slice(pageVisited, pageVisited + cityPerPage)
                                .map((room, index) => (
                                    <div
                                        className={`p-4 hover:text-white cursor-pointer flex justify-between items-center hover:bg-bgthird ${
                                            roomState.active === room
                                                ? 'text-white'
                                                : 'text-textColor'
                                        }`}
                                    >
                                        <div>
                                            <p className="text-2xl font-semibold">
                                                {room.tenphongchieu}
                                            </p>
                                            <p>{room.tenloaiphongchieu}</p>
                                            <p>
                                                Số lượng ghế: {room.soluongghe}
                                            </p>
                                        </div>
                                        <Radio.Group
                                            onChange={(e) =>
                                                toggleActiveElement(e, index)
                                            }
                                            value={roomState.active}
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Radio: {
                                                            colorPrimary:
                                                                '#b91c1c',
                                                            colorPrimaryHover:
                                                                '#b91c1c',
                                                            fontWeightStrong:
                                                                'medium',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Radio value={room}></Radio>
                                            </ConfigProvider>
                                        </Radio.Group>
                                    </div>
                                ))
                        ) : (
                            <p className="text-textColor">
                                Không có thông tin rạp chiếu phim
                            </p>
                        )}
                    </div>
                </div>
                {roomState.state.length > 0 && (
                    <div className="w-full flex justify-center mt-10 font-semibold ">
                        <ReactPaginate
                            previousLabel={
                                <FontAwesomeIcon icon={faChevronLeft} />
                            }
                            nextLabel={
                                <FontAwesomeIcon icon={faChevronRight} />
                            }
                            pageCount={pageCount}
                            onPageChange={changePage}
                            previousClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                            containerClassName="text-center text-white flex gap-6"
                            nextClassName="text-white px-6 bg-mainColor rounded-full hover:text-mainColor hover:bg-white"
                            activeClassName="text-mainColor "
                        />
                    </div>
                )}
            </div>
        ),
    };
}

export default RoomEdit;
