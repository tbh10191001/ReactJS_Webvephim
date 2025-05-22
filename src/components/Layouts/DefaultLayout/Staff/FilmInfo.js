import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTypeOfFilm } from '~/axiosAPI/filmsApi';
import { UploadImageFirebase } from '~/components/FirebaseIMG';
import FormInformation from '~/components/Form/Film/FormInformation';

function FilmInfo() {
    let { maphim } = useParams();
    const [result, setResult] = useState();
    const [message, setMessage] = useState('');
    const [types, setTypes] = useState([]);
    const [fileList, setFileList] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        const dataTypes = async () => {
            try {
                const response = await getTypeOfFilm();
                if (response) {
                    if (response.status === 200) {
                        setTypes(response.data.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        dataTypes();
    }, []);

    const handlerUploadImage = (file) => {
        try {
            UploadImageFirebase(file);
        } catch (err) {
            console.log(err);
        }
    };
    // async function handleEditFilm(e) {
    //     if (validate() === true) {
    //         const theloaiphim = typeFilm;
    //         console.log(anhtitle);
    //         try {
    //             const token = getAccessToken();
    //             const response = await updateFilm({
    //                 token,
    //                 maphim,
    //                 tenphim,
    //                 thoiluongchieu: thoiluongchieu,
    //                 ngaybatdauchieu:
    //                     Moment(ngaybatdauchieu).format('YYYY/MM/DD'),
    //                 ngonngu,
    //                 daodien,
    //                 dienvien,
    //                 mota,
    //                 anhtitle,
    //                 dotuoixem,
    //                 trailer,
    //                 theloaiphim,
    //             });
    //             if (response) {
    //                 if (response.status === 200) {
    //                     console.log(response.data.message);
    //                     if (changeImg === true) {
    //                         deleteImg(anhtitle);
    //                         handlerUpload(e);
    //                     }
    //                     setIsModal(true);
    //                 } else {
    //                     setDesc(response.response.data.message);
    //                     setType('error');
    //                     setIsSuccess(true);
    //                 }
    //             }
    //         } catch (err) {
    //             console.log(err);
    //             setDesc('Server đang xảy ra lỗi vui lòng thử lại.');
    //             setType('error');
    //             setIsSuccess(true);
    //         }
    //     } else {
    //         return;
    //     }
    // }
    return (
        <div className="w-full bg-bgsecondary py-10" style={{ marginTop: 50 }}>
            <div className="text-white text-center font-semibold pt-10 text-6xl ml-10 mb-10">
                Thông tin phim
                <FontAwesomeIcon
                    icon={faClapperboard}
                    className="ml-6 text-mainColor"
                />
            </div>
            {maphim && (
                <FormInformation
                    maphim={maphim}
                    setResult={setResult}
                    setMessage={setMessage}
                    types={types}
                    handlerUploadImage={handlerUploadImage}
                    fileList={fileList}
                    setFileList={setFileList}
                />
            )}
        </div>
    );
}

export default FilmInfo;
