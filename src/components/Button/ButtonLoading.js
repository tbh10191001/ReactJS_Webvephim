import { PoweroffOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { useState } from 'react';
function ButtonLoading({ onClick, title }) {
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
            onClick();
        }, 1000);
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {},
                },
                token: {
                    colorPrimary: '#b91c1c',
                },
            }}
        >
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                loading={loadings[1]}
                onClick={() => enterLoading(1)}
                className=" bg-mainColor opacity-100 hover:opacity-80 duration-300"
            >
                {title}
            </Button>
        </ConfigProvider>
    );
}

export default ButtonLoading;
