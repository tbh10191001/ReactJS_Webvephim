import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider } from 'react-hook-form';
import { login } from '~/axiosAPI/accountApi';
import { decodeToken, setAccessToken } from '~/cookies/cookies';
import customerSlice from '~/redux/customerSlice';
import staffSlice from '~/redux/staffSlice';
import { YupLogin } from '~/yups/yupLogin';
import ButtonSizeM from '../../Button/ButtonsizeM';
import InputText from '../../Input/InputText';
import NotificationComp from '../../Notifications/Notification';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FormLogin() {
    const form = YupLogin();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { openNotification, renderNotification } = NotificationComp();

    const handleLogin = async () => {
        const response = await login({
            email: form.getValues('email'),
            matkhau: form.getValues('matkhau'),
        });
        if (response) {
            if (response.status === 200) {
                const accessToken = response.data.token;
                const decodedToken = decodeToken(accessToken);
                setAccessToken(accessToken, decodedToken.exp);
                if (decodedToken.role.idrole === 2) {
                    dispatch(customerSlice.actions.save(decodedToken));
                    localStorage.setItem('accessToken', accessToken);
                    navigator('/');
                } else {
                    dispatch(staffSlice.actions.save(decodedToken));
                    localStorage.setItem('accessToken', accessToken);
                    navigator('/staff/information');
                }
            } else {
                openNotification(
                    'error',
                    'Error',
                    response.response.data.message,
                );
            }
        } else {
            openNotification(
                'error',
                'Error',
                'Server đang xảy ra lỗi vui lòng thử lại.',
            );
        }
    };

    const onSubmit = () => {
        handleLogin();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputText
                    name="email"
                    placeholderText="Enter your email..."
                    prefixedIcon={<FontAwesomeIcon icon={faEnvelope} />}
                />
                <InputText
                    typeComponent="password"
                    name="matkhau"
                    placeholderText="Enter your password..."
                    prefixedIcon={<FontAwesomeIcon icon={faLock} />}
                />
                <div className=" text-center">
                    <ButtonSizeM title="Login" />
                </div>
            </form>
            {renderNotification}
        </FormProvider>
    );
}

export default FormLogin;
