import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { forgetPassword } from '~/axiosAPI/accountApi';
import ButtonSizeM from '~/components/Button/ButtonsizeM';
import { YupLogin, YupLoginForgetPassword } from '~/yups/yupLogin';
import InputText from '../../Input/InputText';

function FormForgetPassword({ setMessage, setResult, closeModal }) {
    const form = YupLoginForgetPassword();
    async function handleAccept() {
        try {
            const response = await forgetPassword({
                email: form.getValues('email'),
            });
            if (response) {
                if (response.status === 200) {
                    closeModal();
                    setResult(1);
                    setMessage(response.data.message);
                } else {
                    setResult(2);
                    setMessage(response.response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const onSubmit = () => {
        handleAccept();
    };
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InputText
                    name="email"
                    placeholderText="Enter your email..."
                    prefixedIcon={<FontAwesomeIcon icon={faEnvelope} />}
                />
                <div className="text-end">
                    <ButtonSizeM title={'Gửi'} type="submit" />
                </div>
            </form>
        </FormProvider>
    );
}

export default FormForgetPassword;
