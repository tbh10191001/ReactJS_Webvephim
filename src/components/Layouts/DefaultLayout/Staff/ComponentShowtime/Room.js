import { useEffect, useState } from 'react';
import { getRoomByCinema } from '~/axiosAPI/roomApi';
import { getAccessToken } from '~/cookies/cookies';
import ReactPaginate from 'react-paginate';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Room(marapchieu) {
    const [check, setCheck] = useState(false);
    const [maphongchieu, setMaphongchieu] = useState('');
    const [rooms, setRooms] = useState([]);
    let [type, setType] = useState('');
    let [desc, setDesc] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [valType, setValType] = useState('');
    useEffect(() => {
        const dataRoom = async () => {
            try {
                const token = getAccessToken();
                const response = await getRoomByCinema({ token, marapchieu });
                if (response) {
                    if (response.status === 200) {
                        setRooms(response.data.data);
                        setCheck(true);
                    } else {
                        setDesc(response.data.message);
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
    }, [marapchieu]);
    const [typeRooms, setTypeRooms] = useState([]);
    useEffect(() => {
        const unique = rooms.reduce((groups, room) => {
            const type = room.tenloaiphongchieu;
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(room);
            return groups;
        }, {});
        const uniqueTypeObj = Object.keys(unique).map((type) => {
            return {
                type,
                types: unique[type],
            };
        });
        setTypeRooms(uniqueTypeObj);
    }, [check, rooms]);
    const [uniqueRoom, setUniqueRoom] = useState({
        active: null,
        state: [],
    });
    useEffect(() => {
        if (typeRooms !== undefined) {
            let filter = typeRooms.filter((room) => room.type === valType);
            if (filter[0] !== undefined) {
                setUniqueRoom({ state: filter[0].types });
            }
        }
    }, [valType]);

    function toggleActiveElement(i) {
        setUniqueRoom({ ...uniqueRoom, active: uniqueRoom.state[i] });
    }
    useEffect(() => {
        if (uniqueRoom.active !== null && uniqueRoom.active !== undefined) {
            setMaphongchieu(uniqueRoom.active.maphongchieu);
        }
    }, [uniqueRoom.active]);
    const [pageNumber, setPageNumber] = useState(0);
    const roomPerPage = 7;
    const pageVisited = pageNumber * roomPerPage;
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        if (uniqueRoom !== undefined) {
            setPageCount(Math.ceil(uniqueRoom.state.length / roomPerPage));
        }
    }, [uniqueRoom.state]);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return {
        maphongchieu: maphongchieu,
        renderRoom: (
            <>
                {marapchieu !== '' ? (
                    <>
                        <div>
                            {typeRooms.length !== 0 ? (
                                <div className="relative">
                                    <select
                                        onChange={(e) =>
                                            setValType(e.target.value)
                                        }
                                        className="ml-8 w-1/4 py-2 pl-2 shadow-3xl bg-bgmain border border-mainColor rounded-xl font-semibold text-white focus:outline-none"
                                    >
                                        <option value={''}>
                                            Chọn loại phòng
                                        </option>
                                        {typeRooms.map((item, index) => (
                                            <option value={item.type}>
                                                {item.type}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="absolute w-2/3 top-1/2 -translate-y-1/2 right-0 border-t-2 border-mainColor"></p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <span className="text-mainColor font-semibold text-3xl ml-8">
                                        Hiện tại rạp phim này chưa có phòng
                                    </span>
                                    <p className="absolute w-2/3 top-1/2 -translate-y-1/2 right-0 border-t-2 border-mainColor"></p>
                                </div>
                            )}
                        </div>
                        <div
                            className={`w-fit place-items-center ml-2 grid grid-cols-${roomPerPage} gap-4 mt-6`}
                        >
                            {uniqueRoom.state.map((room, i) => (
                                <div
                                    key={i}
                                    className={`text-textColor place-content-center p-10 rounded-xl hover:cursor-pointer ${
                                        uniqueRoom.active !== undefined &&
                                        uniqueRoom.active.maphongchieu ===
                                            uniqueRoom.state[i].maphongchieu
                                            ? 'bg-mainColor text-white'
                                            : 'bg-bgmain'
                                    }`}
                                    onClick={() => toggleActiveElement(i)}
                                >
                                    <p className=" font-semibold text-3xl">
                                        {room.tenphongchieu}
                                    </p>
                                    <p className="mt-4">
                                        {room.tenloaiphongchieu}
                                    </p>
                                    <p className="mt-4">
                                        SL ghế: {room.soluongghe}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {uniqueRoom.state.length > 0 && (
                            <div className="w-full flex justify-center mt-10 font-semibold ">
                                <ReactPaginate
                                    previousLabel={
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    }
                                    nextLabel={
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
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
                    </>
                ) : (
                    <></>
                )}
            </>
        ),
    };
}

export default Room;
