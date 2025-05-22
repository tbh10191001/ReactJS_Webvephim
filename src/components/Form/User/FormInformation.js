import {
    faAddressCard,
    faEnvelope,
    faPenNib,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider } from 'react-hook-form';
import InputRadio from '~/components/Input/InputRadio';
import ButtonSizeM from '../../Button/ButtonsizeM';
import InputText from '../../Input/InputText';

function FormInformation({ form, handleEdit }) {
    function onSubmit() {
        handleEdit();
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputText
                    name="hoten"
                    placeholderText="Nhập họ và tên..."
                    prefixedIcon={<FontAwesomeIcon icon={faPenNib} />}
                />
                <InputText
                    name="email"
                    placeholderText="Nhập email..."
                    prefixedIcon={<FontAwesomeIcon icon={faEnvelope} />}
                    disabled={true}
                />
                <InputText
                    name="sdt"
                    placeholderText="Nhập số điện thoại..."
                    prefixedIcon={<FontAwesomeIcon icon={faPhone} />}
                    disabled={true}
                />

                {form.getValues('gioitinh') ? (
                    <InputRadio
                        name="gioitinh"
                        labelText={'Giới tính'}
                        data={[
                            { value: 0, label: 'Nữ' },
                            { value: 1, label: 'Nam' },
                        ]}
                        defaultValue={form.getValues('gioitinh')}
                    />
                ) : (
                    <InputRadio
                        name="gioitinh"
                        labelText={'Giới tính'}
                        data={[
                            { value: 0, label: 'Nữ' },
                            { value: 1, label: 'Nam' },
                        ]}
                    />
                )}
                <InputText
                    name="cccd"
                    placeholderText="Nhập căn cước công dân..."
                    prefixedIcon={<FontAwesomeIcon icon={faAddressCard} />}
                />
                <div className="flex justify-around">
                    <ButtonSizeM
                        title="Lưu"
                        type="submit"
                        primaryColor="btGreen"
                    />
                </div>
            </form>
        </FormProvider>
    );
}

export default FormInformation;
