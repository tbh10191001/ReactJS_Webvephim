import { ConfigProvider, Form, Radio } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

function InputRadio({ name, labelText, data, defaultValue, disabled }) {
    const { formState, control } = useFormContext();

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: 'Montserrat',
                        colorPrimary: '#b91c1c',
                    },
                }}
            >
                <Form.Item
                    label={labelText}
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
                            <Radio.Group
                                defaultValue={defaultValue ? defaultValue : 0}
                                {...field}
                                disabled={disabled ? disabled : false}
                            >
                                {data.map((item, index) => (
                                    <Radio key={index} value={item.value}>
                                        {' '}
                                        {item.label}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        )}
                    />
                </Form.Item>
            </ConfigProvider>
        </>
    );
}

export default InputRadio;
