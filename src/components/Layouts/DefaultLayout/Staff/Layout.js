import {
    BarChartOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Information from '~/components/Form/User/Information';
import Room from '~/components/Layouts/DefaultLayout/Staff/Statistical/Room';
import ModalCom from '~/components/Modal/Modal';
import NotificationComp from '~/components/Notifications/Notification';
import { deleteAccessToken } from '~/cookies/cookies';
import staffSlice from '~/redux/staffSlice';
import Account from './Customer/Account';
import { InformationCustomer } from './Customer/Information';
import Type from './Statistical/Type';

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
    getItem('Information', '/staff/information', <UserOutlined />),
    getItem('Customer', 'sub1', <UnorderedListOutlined />, [
        getItem('Account', '/staff/customer/account'),
        // getItem('Information', '/staff/customer/information'),
    ]),
    // getItem('Films', '/staff/films', <PlayCircleOutlined />),
    getItem('Statistical', 'sub2', <BarChartOutlined />, [
        getItem('Room', '/staff/statistical/room'),
        getItem('Type', '/staff/statistical/type'),
    ]),
    getItem('Logout', '/', <LogoutOutlined />),
];
const LayoutStaff = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [current, setCurrent] = useState('/staff/customer/account');
    const [result, setResult] = useState(0);
    const [message, setMessage] = useState(false);
    const [render, setRender] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { renderModal, openModal } = ModalCom();
    const { openNotification, renderNotification } = NotificationComp();

    const handleAccept = async () => {
        await deleteAccessToken();
        localStorage.clear();
        dispatch(staffSlice.actions.clear());
        navigator('/');
    };
    let component = {
        header: '',
        sub: '',
        render: <></>,
    };
    switch (current) {
        case '/staff/information':
            component = {
                header: 'Information',
                sub: '',
                render: (
                    <Information
                        setMessage={setMessage}
                        setResult={setResult}
                    />
                ),
            };
            break;
        case '/staff/customer/account':
            component = {
                header: 'Account',
                sub: '',
                render: <Account />,
            };
            break;
        // case '/staff/customer/information':
        //     component = {
        //         header: 'Information',
        //         sub: '',
        //         render: (
        //             <InformationCustomer
        //                 openModal={openModal}
        //                 setResult={setResult}
        //                 setMessage={setMessage}
        //                 setRender={setRender}
        //             />
        //         ),
        //     };
        //     break;
        case '/staff/statistical/room':
            component = {
                header: 'Statistical',
                sub: 'Room',
                render: <Room />,
            };
            break;
        case '/staff/statistical/type':
            component = {
                header: 'Statistical',
                sub: 'Type',
                render: <Type />,
            };
            break;
        case '/':
            handleAccept();
            break;
        default:
            return component;
    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
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
                            <Breadcrumb.Item>{component.sub}</Breadcrumb.Item>
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
                <Footer style={{ textAlign: 'center' }}>
                    <p className="text-pinkColor italic">
                        Filmax kính chúc quý khách một ngày tốt lành, một đời an
                        nhiên
                    </p>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutStaff;
