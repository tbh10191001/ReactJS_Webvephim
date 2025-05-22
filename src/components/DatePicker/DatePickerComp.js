import { ConfigProvider, DatePicker, Form } from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import 'dayjs/locale/zh-cn';

dayjs.locale('vi_VN');

function DatePickerComp({ name, placeholder, labelText, css }) {
    const { formState, control, setValue } = useFormContext();

    const dateFormat = 'DD-MM-YYYY';

    return (
        <ConfigProvider
            locale={locale}
            theme={{
                token: {
                    colorPrimary: '#b91c1c',
                    fontFamily: 'Montserrat',
                },
            }}
        >
            <Form.Item
                label={<p className={`${css ? css : ''}`}>{labelText}</p>}
                colon={false}
                labelAlign="left"
                labelCol={{ style: { width: 140 } }}
                validateStatus={formState.errors[name] && 'error'}
                help={
                    formState &&
                    formState.errors &&
                    formState.errors[name] && (
                        <p className="text-sm">
                            {formState.errors[name].message}
                        </p>
                    )
                }
            >
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <DatePicker
                            format={'DD-MM-YYYY'}
                            placeholder={placeholder}
                            onChange={(date, dateString) => {
                                setValue('ngaybatdauchieu', dateString);
                            }}
                            defaultValue={
                                field.value ? dayjs(field.value) : null
                            }
                        />
                    )}
                />
            </Form.Item>
        </ConfigProvider>
    );
}

export default DatePickerComp;
