import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { changePassword } from '~/axiosAPI/accountApi';
import { YupUserChangePassword } from '~/yups/yupUser';
import ButtonSizeM from '../../Button/ButtonsizeM';
import InputText from '../../Input/InputText';

function FormChangePassword({ form, handleChangePassword }) {
    const onSubmit = () => {
        handleChangePassword();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputText
                    typeComponent="password"
                    name="matkhau"
                    placeholderText="Nhập mật khẩu cũ..."
                    prefixedIcon={<FontAwesomeIcon icon={faLock} />}
                />
                <InputText
                    typeComponent="password"
                    name="matkhaumoi"
                    placeholderText="Nhập mật khẩu mới..."
                    prefixedIcon={<FontAwesomeIcon icon={faLock} />}
                />
                <InputText
                    typeComponent="password"
                    name="xacnhanmatkhau"
                    placeholderText="Xác nhận mật khẩu..."
                    prefixedIcon={<FontAwesomeIcon icon={faLock} />}
                />
                <div className=" text-center">
                    <ButtonSizeM title="Đổi mật khẩu" type="submit" />
                </div>
            </form>
        </FormProvider>
    );
}

export default FormChangePassword;
