import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgetPassword } from '~/axiosAPI/accountApi';
import FormForgetPassword from '~/components/Form/Login/FormForgetPassword';
import FormLogin from '~/components/Form/Login/FormLogin';
import ModalCom from '~/components/Modal/Modal';
import NotificationComp from '~/components/Notifications/Notification';
import { YupLoginForgetPassword } from '~/yups/yupLogin';

function Login() {
    const { openNotification, renderNotification } = NotificationComp();
    const { openModal, closeModal, renderModal } = ModalCom();
    const [result, setResult] = useState(0);
    const [message, setMessage] = useState(false);

    return (
        <div className="h-screen flex justify-center items-center bg-bgmain">
            <div className="w-1/3 h-fit p-10 rounded-xl bg-bgsecondary">
                <div className="text-white text-center mt-20 font-bold text-4xl mb-20">
                    ĐĂNG NHẬP
                </div>
                <FormLogin />
                <div className="text-center text-white mt-8 italic">
                    <Link
                        to={'/register'}
                        className="hover:text-mainColor hover:underline hover:font-semibold duration-700"
                    >
                        Đăng ký tài khoản
                    </Link>
                </div>
                <div className="text-end mt-6">
                    <span
                        onClick={() => {
                            openModal(
                                'info',
                                'Thông tin email',
                                <FormForgetPassword
                                    setMessage={setMessage}
                                    setResult={setResult}
                                    closeModal={closeModal}
                                />,
                                true,
                                null,
                            );
                        }}
                        className="mt-10 w-full text-end text-white hover:cursor-pointer hover:text-mainColor"
                    >
                        Quên mật khẩu?
                    </span>
                </div>
            </div>
            {renderNotification}
            {renderModal}
            {result === 1 ? (
                openNotification('success', 'Successfully', message)
            ) : result === 2 ? (
                openNotification('error', 'Error', message)
            ) : (
                <></>
            )}
        </div>
    );
}

export default Login;
