import {
    LogoutOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Information from '~/components/Form/User/Information';
import ModalCom from '~/components/Modal/Modal';
import NotificationComp from '~/components/Notifications/Notification';
import { deleteAccessToken } from '~/cookies/cookies';
import customerSlice from '~/redux/customerSlice';
import Account from './Account';
import Header from '../Header';

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Information', '/customer/information', <UserOutlined />),
    getItem('Account', '/customer/account', <SafetyCertificateOutlined />),
    // getItem('Order', '/customer/order', <SolutionOutlined />),
    // getItem('Logout', '/', <LogoutOutlined />),
];
const LayoutCustomer = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [current, setCurrent] = useState('/customer/information');

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { renderModal, openModal } = ModalCom();
    const { openNotification, renderNotification } = NotificationComp();

    const handleAccept = () => {
        deleteAccessToken();
        localStorage.clear();
        dispatch(customerSlice.actions.clear());
        navigator('/');
    };
    let component = {
        header: '',
        sub: '',
        render: <></>,
    };

    switch (current) {
        case '/customer/information':
            component = {
                header: 'Information',
                sub: '',
                render: (
                    <Information
                        openNotification={openNotification}
                        renderNotification={renderNotification}
                    />
                ),
            };
            break;
        case '/customer/account':
            component = {
                header: 'Account',
                sub: '',
                render: (
                    <Account
                        renderModal={renderModal}
                        openModal={openModal}
                        openNotification={openNotification}
                        renderNotification={renderNotification}
                    />
                ),
            };
            break;
        // case '/customer/order':
        //     component = {
        //         header: 'Order',
        //         sub: '',
        //         render: <Orders openNotification={openNotification} />,
        //     };
        //     break;
        // case '/':
        //     handleAccept();
        //     break;
        default:
            return component;
    }

    console.log('LayoutCustomer');

    return (
        <div>
            <Header />
            <Layout
                style={{
                    position: 'absolute',
                    top: 60,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={current}
                        mode="inline"
                        items={items}
                        onClick={(e) => setCurrent(e.key)}
                    />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            {component && component.header !== '' && (
                                <Breadcrumb.Item>
                                    {component.header}
                                </Breadcrumb.Item>
                            )}
                            {component && component.sub !== '' && (
                                <Breadcrumb.Item>
                                    {component.sub}
                                </Breadcrumb.Item>
                            )}
                        </Breadcrumb>
                        <div
                            style={{
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {component && component.render}
                        </div>
                    </Content>
                    {/* {renderModal} */}
                    {/* {renderNotification} */}
                    {/* {notification.result === 0 ? (
                    openNotification(
                        'success',
                        'Successfully',
                        notification.message,
                    )
                ) : notification.result > 0 ? (
                    openNotification('error', 'Error', notification.message)
                ) : (
                    <></>
                )} */}

                    <Footer style={{ textAlign: 'center' }}>
                        <p className="text-pinkColor italic">
                            Filmax kính chúc quý khách một ngày tốt lành, một
                            đời an nhiên
                        </p>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};
export default LayoutCustomer;
