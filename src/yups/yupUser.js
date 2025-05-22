import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    SchemaUserChangePassword,
    SchemaUserInformation,
} from '../schema/schemaUser';

export const YupUserChangePassword = () => {
    const schema = SchemaUserChangePassword();

    const form = useForm({
        defaultValues: {
            matkhau: '',
            matkhaumoi: '',
            xacnhanmatkhau: '',
        },
        resolver: yupResolver(schema),
    });
    return form;
};

export const YupUserInformation = () => {
    const schema = SchemaUserInformation();
    const form = useForm({
        defaultValues: {
            hoten: '',
            email: '',
            sdt: '',
            gioitinh: 0,
            cccd: '',
        },
        resolver: yupResolver(schema),
    });
    return form;
};

export const YupCustomerInformation = () => {
    const schema = SchemaUserInformation();
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            hoten: '',
            email: '',
            sdt: '',
            gioitinh: 0,
            cccd: '',
        },
        resolver: yupResolver(schema),
    });
    return form;
};
