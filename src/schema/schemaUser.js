import * as yup from 'yup';

export const SchemaUserChangePassword = () => {
    const schema = yup.object().shape({
        matkhau: yup.string().required('Mật khẩu cũ không được bỏ trống'),
        matkhaumoi: yup
            .string()
            .matches(
                /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                'Mật khẩu mới bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự',
            )
            .required('Mật khẩu không được bỏ trống'),
        xacnhanmatkhau: yup
            .string()
            .oneOf([yup.ref('matkhaumoi')], 'Mật khẩu nhập lại chưa chính xác')
            .required('Mật khẩu xác nhận không được bỏ trống'),
    });
    return schema;
};

export const SchemaUserInformation = () => {
    const schema = yup.object().shape({
        hoten: yup.string().required('Họ và tên không được bỏ trống'),
        email: yup.string().email().required('Email không được bỏ trống'),
        sdt: yup
            .string()
            .matches(
                /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                'Số điện thoại không chính xác',
            )
            .required('Số điện thoại không được bỏ trống'),
        gioitinh: yup.number().required('Giới tính không được bỏ trống'),
        cccd: yup.string().required('Căn cước công dân không được bỏ trống'),
    });
    return schema;
};
