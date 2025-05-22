import { ConfigProvider, Form, Select } from 'antd';
import { get } from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';

function SelectCompHookForm({ labelText, name, placeholder, options, css }) {
    const { formState, control, getValues } = useFormContext();
    const handleChange = (value, onChange) => {
        onChange(value);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        multipleItemBorderColor: '#b91c1c',
                        optionActiveBg: '#b91c1c',
                    },
                },
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
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder={placeholder}
                            // onChange={(type) => {
                            //     console.log('type', type);
                            //     const arr = type.reduce((arr, current) => {
                            //         return [...arr, current.matheloaiphim];
                            //     }, []);
                            //     console.log('arr', arr);
                            //     // onChange(type);
                            // }}
                            onChange={(value) =>
                                handleChange(value, field.onChange)
                            }
                            options={options}
                            optionRender={(option) => (
                                <p className="text-bgmain capitalize">
                                    {option}
                                </p>
                            )}
                            style={{ width: '80%' }}
                            defaultValue={() => {
                                if (getValues(name)) {
                                    return getValues(name).reduce(
                                        (arr, current) => {
                                            return [
                                                ...arr,
                                                current.matheloaiphim,
                                            ];
                                        },
                                        [],
                                    );
                                }
                            }}
                        />
                    )}
                />
            </Form.Item>
        </ConfigProvider>
    );
}

export default SelectCompHookForm;
