import * as yup from 'yup';

export const SchemaLogin = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required('Email không được bỏ trống'),
        matkhau: yup.string().required('Mật khẩu không được bỏ trống'),
    });
    return schema;
};
export const SchemaLoginForgetPassword = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required('Email không được bỏ trống'),
    });
    return schema;
};
