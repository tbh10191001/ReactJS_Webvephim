import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SchemaRegister } from '../schema/schemaRegister';

export const YupRegister = () => {
    const schema = SchemaRegister();

    const form = useForm({
        defaultValues: {
            email: '',
            matkhau: '',
            hoten: '',
            sdt: '',
            gioitinh: 0,
            cccd: '',
        },
        resolver: yupResolver(schema),
    });
    return form;
};
