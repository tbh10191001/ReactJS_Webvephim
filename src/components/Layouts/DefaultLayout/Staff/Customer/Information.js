import { ConfigProvider, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCustomerInformation,
    getInfoCustomerBySDT,
    updateInfoCustomer,
} from '~/axiosAPI/customerApi';
import FormInformation from '~/components/Form/User/FormInformation';
import NotificationComp from '~/components/Notifications/Notification';
import { YupCustomerInformation } from '~/yups/yupUser';

function Information({ openModal, setResult, setMessage, setRender }) {
    const form = YupCustomerInformation();
    const [information, setInformation] = useState();
    const [sdt, setSdt] = useState();
    const [isClick, setIsClick] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = async () => {
        try {
            const response = await updateInfoCustomer({
                hoten: form.getValues('hoten'),
                email: form.getValues('email'),
                sdt: form.getValues('sdt'),
                gioitinh: form.getValues('gioitinh'),
                cccd: form.getValues('cccd'),
            });
            if (response) {
                if (response.status === 200) {
                    setResult(1);
                    setMessage(response.data.message);
                } else {
                    setResult(2);
                    setMessage(response.response.data.message);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getCustomerAccountAPI = async () => {
        try {
            const response = await getCustomerInformation();
            if (response.status === 200) {
                setInformation(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getCustomerInformationAPI = async () => {
        try {
            const response = await getInfoCustomerBySDT(sdt);
            if (response.status === 200) {
                form.reset({
                    hoten: response.data.data.user.hoten,
                    email: response.data.data.email,
                    sdt: response.data.data.user.sdt,
                    gioitinh: response.data.data.user.gioitinh.data[0],
                    cccd: response.data.data.user.cccd,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCustomerAccountAPI();
    }, []);
    useEffect(() => {
        if (sdt !== undefined) {
            getCustomerInformationAPI();
            openModal(
                'info',
                'Information',
                <div>
                    {form && (
                        <FormInformation
                            form={form}
                            handleEdit={handleEdit}
                            setRender={setRender}
                        />
                    )}
                </div>,
                true,
                <></>,
            );
        }
    }, [sdt, isClick]);

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'hoten',
            key: 'hoten',
            sorter: (a, b) => a.hoten.length - b.hoten.length,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
            render: (text) => <p>{text === 1 ? 'Nam' : 'Nữ'}</p>,
        },
        {
            title: 'Căn cước công dân',
            dataIndex: 'cccd',
            key: 'cccd',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button
                        className="hover:text-mainColor duration-400 hover:shadow-3xl"
                        onClick={() => {
                            setSdt(record.sdt);
                            setIsClick(!isClick);
                        }}
                    >
                        Edit
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
            <Table columns={columns} dataSource={information} />
        </ConfigProvider>
    );
}

export { Information as InformationCustomer };
