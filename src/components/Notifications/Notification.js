import { notification } from 'antd';

function NotificationComp() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description ? description : '',
        });
    };
    return {
        openNotification: openNotificationWithIcon,
        renderNotification: <div>{contextHolder}</div>,
    };
}

export default NotificationComp;
