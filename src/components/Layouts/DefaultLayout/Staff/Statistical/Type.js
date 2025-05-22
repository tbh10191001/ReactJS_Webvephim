import { useEffect, useState } from 'react';
import { getTypeOfFilm } from '~/axiosAPI/filmsApi';
import { getStatisticalTicket } from '~/axiosAPI/typeAPI';
import SelectSingle from '~/components/Select/SelectSingle';
import BarChart from '../../Chart/BarChart';

function Type() {
    const [types, setTypes] = useState();
    const [typeID, setTypeID] = useState();
    const [statisticalData, setStatisticalData] = useState([]);
    const getTypesAPI = async () => {
        try {
            const response = await getTypeOfFilm();
            if (response) {
                if (response.status === 200) {
                    setTypes(response.data.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getStatistical = async () => {
        try {
            const response = await getStatisticalTicket({
                matheloaiphim: typeID,
            });
            if (response) {
                if (response.status === 200) {
                    setStatisticalData(() => [response.data.data]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTypesAPI();
    }, []);
    useEffect(() => {
        if (typeID) {
            getStatistical();
        }
    }, [typeID]);

    return (
        <div className="w-full p-10 grid grid-rows-[80px_1fr]">
            <div className="">
                <div className="flex justify-between gap-5">
                    {types && (
                        <SelectSingle
                            placeholder={'Chọn thể loại phim'}
                            options={types}
                            width={'40%'}
                            setType={setTypeID}
                            date={false}
                        />
                    )}
                </div>
            </div>
            <div className="h-full flex items-center justify-center">
                <div className="w-2/3">
                    {statisticalData && (
                        <BarChart
                            labels={'Số lượng vé'}
                            dataInput={statisticalData}
                            title={'Số vé bán được'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Type;
