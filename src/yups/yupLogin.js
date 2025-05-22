import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SchemaLogin, SchemaLoginForgetPassword } from '../schema/schemaLogin';

export const YupLogin = () => {
    const schema = SchemaLogin();

    const form = useForm({
        defaultValues: {
            email: 'gdragonkingvip@gmail.com',
            password: '123456',
        },
        resolver: yupResolver(schema),
    });
    return form;
};

export const YupLoginForgetPassword = () => {
    const schema = SchemaLoginForgetPassword();

    const form = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    });
    return form;
};
