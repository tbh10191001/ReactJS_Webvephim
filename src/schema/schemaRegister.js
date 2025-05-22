import * as yup from 'yup';

export const SchemaRegister = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required('Email không được bỏ trống'),
        matkhau: yup
            .string()
            .matches(
                /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                'Mật khẩu Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự',
            )
            .required('Mật khẩu không được bỏ trống'),
        hoten: yup.string().required('Họ và tên không được bỏ trống'),
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
