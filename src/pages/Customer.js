import { useNavigate } from 'react-router-dom';
import Account from '~/components/Layouts/DefaultLayout/Customer/Account';
import Orders from '~/components/Layouts/DefaultLayout/Customer/Orders';
import Footer from '~/components/Layouts/DefaultLayout/Footer';
import Header from '~/components/Layouts/DefaultLayout/Header';
import Information from '~/components/Form/User/Information';

function Customer() {
    const local = window.location.pathname;
    const navigator = useNavigate();
    let pageInfo = null;
    let component;
    switch (local) {
        case '/':
            break;
        case '/customer/info':
            component = <Information />;
            break;
        case '/customer/account':
            component = <Account />;
            break;
        case '/customer/orders':
            component = <Orders />;
            break;
        default:
            component = <></>;
    }
    return (
        <div>
            <Header />
            <div className=" h-screen flex" style={{ marginTop: 60 }}>
                <div className="bg-bgmain px-4 w-1/4 shadow-3xl text-white border-r-2 border-r-mainColor">
                    <p
                        onClick={() => navigator('/customer/info')}
                        className={`py-6 relative font-semibold hover:text-mainColor hover:cursor-pointer ${
                            local.includes('/customer/info')
                                ? 'text-mainColor border-b-2 border-mainColor'
                                : ''
                        }`}
                    >
                        Thông tin cá nhân
                    </p>

                    <p
                        onClick={() => navigator('/customer/account')}
                        className={`py-6 relative font-semibold hover:text-mainColor hover:cursor-pointer ${
                            local.includes('/customer/account')
                                ? 'text-mainColor border-b-2 border-mainColor'
                                : ''
                        }`}
                    >
                        Quản lý tài khoản
                    </p>
                    <p
                        onClick={() => navigator('/customer/orders')}
                        className={`py-6 relative font-semibold hover:text-mainColor hover:cursor-pointer ${
                            local.includes('/customer/orders')
                                ? 'text-mainColor border-b-2 border-mainColor'
                                : ''
                        }`}
                    >
                        Quản lý đơn hàng
                    </p>
                </div>
                <div className="w-full">
                    {pageInfo === null ? (
                        <div>{component}</div>
                    ) : (
                        <div>{pageInfo}</div>
                    )}{' '}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Customer;
