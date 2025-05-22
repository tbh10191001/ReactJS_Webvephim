import { Button, Modal, Space } from 'antd';
import { createContext, useState } from 'react';
const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const ModalNoti = ({ title, show, content }) => {
    const [isDisplay, setIsDisplay] = useState(false);
    setIsDisplay(show);
    const displayModal = () => {
        setIsDisplay(true);
    };

    const handleAccept = () => {
        setIsDisplay(false);
        // window.localStorage.clear();
        // deleteAccessToken();
        // dispatch(customerSlice.actions.clear());
        // navigator('/');
        // window.location.reload();
    };
    const handleCancel = () => {
        setIsDisplay(false);
    };

    return (
        <div className="">
            <Modal
                title={title}
                visible={isDisplay}
                onOk={handleAccept}
                onCancel={handleCancel}
            >
                {content}
            </Modal>
        </div>
    );
};
export default ModalNoti;
