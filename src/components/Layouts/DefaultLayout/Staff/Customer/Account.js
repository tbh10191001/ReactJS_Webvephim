import { Table, Space, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { deleteAccountByStaff } from '~/axiosAPI/accountApi';
import { getCustomerAccount } from '~/axiosAPI/customerApi';
import ButtonSizeM from '~/components/Button/ButtonsizeM';
import ModalCom from '~/components/Modal/Modal';
import NotificationComp from '~/components/Notifications/Notification';
function Account() {
    const [account, setAccount] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    const { renderNotification, openNotification } = NotificationComp();
    const { renderModal, closeModal, openModal } = ModalCom();
    const getCustomerAccountAPI = async () => {
        try {
            const response = await getCustomerAccount();
            if (response.status === 200) {
                setAccount(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deleteAccount = async (sdt) => {
        try {
            const response = await deleteAccountByStaff({ sdt });
            if (response.status === 200) {
                closeModal();
                openNotification(
                    'success',
                    'Delete account successfully',
                    response.data.message,
                );
                setIsDeleted(true);
            } else {
                openNotification(
                    'error',
                    'Delete account failed',
                    response.response.data.message,
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCustomerAccountAPI();
    }, [isDeleted]);
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Password',
            dataIndex: 'matkhau',
            key: 'matkhau',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'hoten',
            key: 'hoten',
            sorter: (a, b) => a.hoten.length - b.hoten.length,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button
                        className="hover:text-mainColor duration-400 hover:shadow-3xl"
                        onClick={() =>
                            openModal(
                                'warning',
                                'Thông báo',
                                'Ban có chắc chắn muốn xóa tài khoản này không?',
                                true,
                                <div className="mt-6 text-end">
                                    <ButtonSizeM
                                        title={'Xoá'}
                                        onClick={() =>
                                            deleteAccount(record.sdt)
                                        }
                                        css={'w-32 mr-8'}
                                    />
                                </div>,
                            )
                        }
                    >
                        Delete
                    </button>
                </Space>
            ),
        },
    ];
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#b91c1c',
                },
            }}
        >
            <Table columns={columns} dataSource={account} />
            {renderNotification}
            {renderModal}
        </ConfigProvider>
    );
}

export default Account;
