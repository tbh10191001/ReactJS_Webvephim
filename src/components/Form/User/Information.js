import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo, updateInfo } from '~/axiosAPI/customerApi';
import FormInformation from '~/components/Form/User/FormInformation';
import customerSlice from '~/redux/customerSlice';
import staffSlice from '~/redux/staffSlice';
import { YupUserInformation } from '~/yups/yupUser';

function Information({ openNotification, renderNotification }) {
    const form = YupUserInformation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();
    const handleGetInformation = async () => {
        try {
            setIsLoading(true);
            const response = await getInfo();
            if (response) {
                if (response.status === 200) {
                    if (response.data.data.role.idrole === 1) {
                        dispatch(staffSlice.actions.save(response.data.data));
                    } else {
                        dispatch(
                            customerSlice.actions.save(response.data.data),
                        );
                    }
                    form.reset({
                        hoten: response.data.data.user.hoten,
                        email: response.data.data.email,
                        sdt: response.data.data.user.sdt,
                        gioitinh: response.data.data.user.gioitinh.data[0],
                        cccd: response.data.data.user.cccd,
                    });
                    setIsLoading(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        handleGetInformation();
    }, []);
    const handleEdit = async () => {
        try {
            const response = await updateInfo({
                hoten: form.getValues('hoten'),
                email: form.getValues('email'),
                sdt: form.getValues('sdt'),
                gioitinh: form.getValues('gioitinh'),
                cccd: form.getValues('cccd'),
            });
            if (response) {
                if (response.status === 200) {
                    if (response.data.data.role.idrole === 1) {
                        dispatch(staffSlice.actions.save(response.data.data));
                    } else {
                        dispatch(
                            customerSlice.actions.save(response.data.data),
                        );
                    }
                    openNotification(
                        'success',
                        'Successfully',
                        response.data.message,
                    );
                } else {
                    openNotification(
                        'error',
                        'Error',
                        response.response.data.message,
                    );
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="p-10 rounded-2xl">
            {isLoading === true ? (
                <Spin />
            ) : (
                <>
                    {form && (
                        <FormInformation form={form} handleEdit={handleEdit} />
                    )}
                </>
            )}
            {renderNotification}
        </div>
    );
}

export default Information;
