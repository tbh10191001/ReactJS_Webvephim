import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '~/axiosAPI/accountApi';
import ButtonLoading from '~/components/Button/ButtonLoading';
import FormChangePassword from '~/components/Form/User/FormChangePassword';
import { deleteAccessToken } from '~/cookies/cookies';
import customerSlice from '~/redux/customerSlice';
import { YupUserChangePassword } from '~/yups/yupUser';

function Account({
    renderModal,
    openModal,
    openNotification,
    renderNotification,
}) {
    const form = YupUserChangePassword();

    const handleChangePassword = async () => {
        try {
            const response = await changePassword({
                matkhau: form.getValues('matkhau'),
                matkhaumoi: form.getValues('matkhaumoi'),
            });
            if (response) {
                if (response.status === 200) {
                    openModal(
                        'success',
                        'Successfully',
                        response.data.message,
                        false,
                        <div className="mt-6 text-end">
                            <ButtonLoading
                                onClick={handleAccept}
                                title={'Chuyển đến trang đăng nhập'}
                            />
                        </div>,
                    );
                } else {
                    openNotification(
                        'error',
                        'Error',
                        response.response.data.message,
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleAccept = () => {
        deleteAccessToken();
        dispatch(customerSlice.actions.clear());
        navigator('/login');
    };

    return (
        <div className="flex items-center justify-center p-10 rounded-2xl">
            <div className="w-2/3">
                <FormChangePassword
                    form={form}
                    handleChangePassword={handleChangePassword}
                />
            </div>
            {renderNotification}
            {renderModal}
        </div>
    );
}

export default Account;
