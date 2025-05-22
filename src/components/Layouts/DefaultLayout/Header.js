import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonSizeM from '~/components/Button/ButtonsizeM';
import ButtonText from '~/components/Button/ButtonText';
import ModalCom from '~/components/Modal/Modal';
import { deleteAccessToken } from '~/cookies/cookies';
import customerSlice from '~/redux/customerSlice';
const logoWeb = require('~/images/logoWeb.png');

function Header() {
    const customer = JSON.parse(localStorage.getItem('customer'));
    const [isLogout, setIsLogout] = useState(true);
    const { renderModal, openModal } = ModalCom();
    let navigator = useNavigate();
    const location = useLocation().pathname;
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        deleteAccessToken();
        dispatch(customerSlice.actions.clear());
        navigator('/');
        setIsLogout(false);
    };

    return (
        <header className="fixed z-20 w-full h-24 top-0 bg-black py-8 flex justify-between">
            <img
                src={logoWeb}
                alt="logo"
                className="ml-10 hover:cursor-pointer hover:opacity-70"
                onClick={() => navigator('/')}
            />
            <div className="absolute left-1/2 -translate-x-1/2 flex justify-around">
                <div
                    className={`font-semibold mr-10 hover:text-mainColor hover:cursor-pointer ${
                        location === '/' ? 'text-mainColor' : 'text-white'
                    }`}
                    onClick={() => navigator('/')}
                >
                    Home
                </div>
                <div
                    className={`font-semibold mr-10 hover:text-mainColor hover:cursor-pointer ${
                        location === '/cinema' ? 'text-mainColor' : 'text-white'
                    }`}
                    onClick={() => navigator('/cinema')}
                >
                    Rạp Filmax
                </div>
                <div
                    className={`font-semibold mr-10 hover:text-mainColor hover:cursor-pointer ${
                        location === '/films' ? 'text-mainColor' : 'text-white'
                    }`}
                    onClick={() => navigator('/films')}
                >
                    Phim
                </div>
            </div>
            <div className="mr-10 h-auto flex justify-around items-center">
                {customer && customer.user ? (
                    <>
                        <div className="flex items-center">
                            <p
                                onClick={() =>
                                    navigator('/customer/information')
                                }
                                className="text-white font-semibold hover:cursor-pointer hover:text-mainColor"
                            >
                                {customer.user.hoten}
                            </p>
                            <div
                                className="text-white flex items-center hover:text-mainColor hover:cursor-pointer"
                                onClick={() =>
                                    openModal(
                                        'warning',
                                        'Logout',
                                        'Bạn có chắc chắn đăng xuất tài khoản này',
                                        true,
                                        <div className="text-end">
                                            <button
                                                onClick={handleLogout}
                                                className="text-white bg-mainColor px-4 py-2 rounded-2xl mt-4 hover:opacity-70 duration-300 font-semibold"
                                            >
                                                Logout
                                            </button>
                                        </div>,
                                    )
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    className=" ml-10 mr-4 text-3xl"
                                />
                                <p>Logout</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <ButtonText
                            title={'Đăng ký'}
                            onClick={() => {
                                navigator('/register');
                            }}
                        />
                        <ButtonSizeM
                            title={'Đăng nhập'}
                            css={' !w-44 !rounded-full '}
                            onClick={() => navigator('/login')}
                        />
                    </>
                )}
                {isLogout && renderModal}
            </div>
        </header>
    );
}

export default Header;
