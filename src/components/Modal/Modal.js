import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { Modal } from 'antd';

function ModalCom() {
    const [modal, contextHolder] = Modal.useModal();

    const openModal = (type, title, content, closable, footer) => {
        modal[type]({
            title: title,
            content: content,
            closable: closable,
            footer: footer,
            keyboard: false,
        });
    };
    function closeModal() {
        Modal.destroyAll();
    }
    return {
        openModal: openModal,
        closeModal: closeModal,
        renderModal: contextHolder,
    };
}

export default ModalCom;
