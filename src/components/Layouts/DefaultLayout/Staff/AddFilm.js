import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTypeOfFilm } from '~/axiosAPI/filmsApi';
import ButtonText from '~/components/Button/ButtonText';
import { UploadImageFirebase } from '~/components/FirebaseIMG';
import FormAdd from '~/components/Form/Film/FormAdd';
import NotificationComp from '~/components/Notifications/Notification';

function AddFilm() {
    const { renderNotification, openNotification } = NotificationComp();
    const [result, setResult] = useState();
    const [message, setMessage] = useState('');
    const [types, setTypes] = useState();
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

    return (
        <div
            className="w-full py-10 px-20 bg-bgthird"
            style={{ marginTop: 50 }}
        >
            <ButtonText
                title={'Trở về'}
                onClick={() => navigator('/staff/films')}
            />
            <div className="text-white text-center font-semibold pt-10 text-6xl ml-10 mb-10">
                Thêm phim
            </div>
            <div className="bg-white pt-10 rounded-3xl shadow-3xl">
                {types && (
                    <FormAdd
                        types={types}
                        setResult={setResult}
                        setMessage={setMessage}
                        handlerUploadImage={handlerUploadImage}
                        navigator={navigator}
                    />
                )}
            </div>
            {result === 1 ? (
                openNotification('success', 'Successfully', message)
            ) : result === 2 ? (
                openNotification('error', 'Error', message)
            ) : result === 3 ? (
                openNotification(
                    'error',
                    'Error',
                    'Server đang xảy ra lỗi, vui lòng thử lại.',
                )
            ) : (
                <></>
            )}
            {renderNotification}
        </div>
    );
}

export default AddFilm;
