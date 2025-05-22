import { SmileOutlined } from '@ant-design/icons';
import { Alert, Space } from 'antd';
import { useEffect, useState } from 'react';
const AlertNoti = ({ type, desc }) => {
    let component = null;
    const [isHidden, setIsHidden] = useState(true);
    switch (type) {
        case 'warning':
            component = (
                <Alert
                    message="Warning"
                    description={desc}
                    type="warning"
                    showIcon
                    closable
                />
            );
            break;
        case 'error':
            component = (
                <Alert
                    message="Error"
                    description={desc}
                    type="error"
                    showIcon
                    closable
                />
            );
            break;

        case 'info':
            component = (
                <Alert
                    message="Information"
                    description={desc}
                    type="info"
                    showIcon
                    closable
                />
            );
            break;

        case 'success':
            component = (
                <Alert
                    message="Success"
                    description={desc}
                    type="success"
                    showIcon
                    closable
                />
            );
            break;

        default:
            component = <></>;
            break;
    }
    useEffect(() => {
        setIsHidden(true);
    }, [type, desc]);
    useEffect(() => {
        const id = setTimeout(() => {
            setIsHidden(false);
        }, 3000);
        return () => {
            clearTimeout(id);
        };
    }, [type, desc]);
    return <div className="">{isHidden && component}</div>;
};
export default AlertNoti;
