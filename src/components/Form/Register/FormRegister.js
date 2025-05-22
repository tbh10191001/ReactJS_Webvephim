import {
    faAddressCard,
    faEnvelope,
    faLock,
    faPenNib,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from '~/axiosAPI/accountApi';
import ButtonLoading from '~/components/Button/ButtonLoading';
import InputRadio from '~/components/Input/InputRadio';
import ModalCom from '~/components/Modal/Modal';
import { YupRegister } from '~/yups/yupRegister';
import ButtonSizeM from '../../Button/ButtonsizeM';
import InputText from '../../Input/InputText';
import NotificationComp from '../../Notifications/Notification';

function FormRegister() {
    const form = YupRegister();
    const navigator = useNavigate();
    const { openNotification, renderNotification } = NotificationComp();
    const { openModal, renderModal } = ModalCom();

    const handleSingup = async () => {
        try {
            const response = await signup({
                email: form.getValues('email'),
                matkhau: form.getValues('matkhau'),
                hoten: form.getValues('hoten'),
                sdt: form.getValues('sdt'),
                gioitinh: form.getValues('gioitinh'),
                cccd: form.getValues('cccd'),
            });
            if (response) {
                if (response.status === 200) {
                    openModal(
                        'success',
                        'Successfully',
                        response.data.message,
                        true,
                        <div className="mt-6 text-end">
                            <ButtonLoading
                                onClick={() => {
                                    navigator('/');
                                }}
                                title={'Chuyển đến trang đăng nhập'}
                            />
                        </div>,
                    );
                } else {
                    openNotification(
                        'error',
                        'Error',
                        response.response.data.message,
                    );
                }
            } else {
                openNotification(
                    'error',
                    'Error',
                    'Server đang xảy ra lỗi vui lòng thử lại.',
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    console.log('form', form);

    const onSubmit = () => {
        handleSingup();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputText
                    name="email"
                    placeholderText="Nhập email..."
                    prefixedIcon={<FontAwesomeIcon icon={faEnvelope} />}
                />
                <InputText
                    typeComponent="password"
                    name="matkhau"
                    placeholderText="Nhập password..."
                    prefixedIcon={<FontAwesomeIcon icon={faLock} />}
                />
                <InputText
                    name="hoten"
                    placeholderText="Nhập họ và tên..."
                    prefixedIcon={<FontAwesomeIcon icon={faPenNib} />}
                />
                <InputText
                    name="sdt"
                    placeholderText="Nhập số điện thoại..."
                    prefixedIcon={<FontAwesomeIcon icon={faPhone} />}
                />
                <InputRadio
                    name="gioitinh"
                    labelText={'Giới tính'}
                    data={[
                        { value: 0, label: 'Nữ' },
                        { value: 1, label: 'Nam' },
                    ]}
                />
                <InputText
                    name="cccd"
                    placeholderText="Nhập căn cước công dân..."
                    prefixedIcon={<FontAwesomeIcon icon={faAddressCard} />}
                />
                <div className=" text-center">
                    <ButtonSizeM title="Đăng ký" />
                </div>
            </form>
            {renderNotification}
            {renderModal}
        </FormProvider>
    );
}

export default FormRegister;
