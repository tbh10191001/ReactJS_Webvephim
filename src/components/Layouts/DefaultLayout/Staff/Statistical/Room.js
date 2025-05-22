import { useEffect, useState } from 'react';
import { getCinemas } from '~/axiosAPI/cinemaApi';
import { getRoomByStaff, getStatisticalTicket } from '~/axiosAPI/roomApi';
import SelectSingle from '~/components/Select/SelectSingle';
import BarChart from '../../Chart/BarChart';
import moment from 'moment';
import { Empty } from 'antd';

function Room() {
    const [cinemas, setCinemas] = useState([]);
    const [cinemaID, setCinemaID] = useState();
    const [rooms, setRooms] = useState([]);
    const [roomID, setRoomID] = useState();
    const [statisticalLabels, setStatisticalLabes] = useState();
    const [statisticalData, setStatisticalData] = useState();
    const getCinemasAPI = async () => {
        try {
            const response = await getCinemas();
            if (response) {
                if (response.status === 200) {
                    const convert = response.data.data.map((item) => {
                        return {
                            label: `${item.diachi} ${item.tinhthanh}`,
                            value: item.marapchieu,
                        };
                    });
                    setCinemas(convert);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getRoomAPI = async () => {
        try {
            const response = await getRoomByStaff({ marapchieu: cinemaID });
            if (response) {
                if (response.status === 200) {
                    setRooms(response.data.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getStatistical = async () => {
        try {
            const response = await getStatisticalTicket({
                maphongchieu: roomID,
            });
            if (response) {
                if (response.status === 200) {
                    if (response.data.data.length > 0) {
                        const labels = response.data.data.map((item) =>
                            moment(item.ngaychieu).format('DD-MM-YYYY'),
                        );
                        const data = response.data.data.map(
                            (item) => item.soluongve,
                        );
                        setStatisticalLabes(labels);
                        setStatisticalData(data);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCinemasAPI();
    }, []);

    useEffect(() => {
        if (cinemaID) {
            getRoomAPI();
        }
    }, [cinemaID]);

    useEffect(() => {
        if (cinemaID) {
            setRooms();
        }
    }, [cinemaID]);

    useEffect(() => {
        if (roomID) {
            getStatistical();
        }
    }, [roomID]);
    useEffect(() => {
        if (roomID) {
            setStatisticalData();
            setStatisticalLabes();
        }
    }, [roomID]);

    return (
        <div className="w-full p-10 grid grid-rows-[80px_1fr]">
            <div className="">
                <div className="flex justify-between gap-5">
                    {cinemas && (
                        <SelectSingle
                            placeholder={'Chọn rạp chiếu'}
                            options={cinemas}
                            width={'40%'}
                            setType={setCinemaID}
                            date={false}
                        />
                    )}
                    {rooms && (
                        <SelectSingle
                            placeholder={'Chọn phòng chiếu'}
                            options={rooms}
                            width={'30%'}
                            setType={setRoomID}
                            date={false}
                        />
                    )}
                </div>
            </div>
            <div className="h-full">
                {statisticalLabels !== undefined &&
                statisticalData !== undefined ? (
                    <BarChart
                        labels={statisticalLabels}
                        dataInput={statisticalData}
                        title={'Số vé bán được'}
                    />
                ) : (
                    <div className=" flex items-center justify-center h-full">
                        <Empty
                            description={
                                <p className=" text-textColor font-semibold text-3xl">
                                    Không có kết quả
                                </p>
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Room;
