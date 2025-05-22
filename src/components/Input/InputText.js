import { ConfigProvider, Form, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

function InputText({
    typeComponent,
    name,
    labelText,
    placeholderText,
    typeText,
    prefixedIcon,
    disabled,
    css,
}) {
    function component(field) {
        if (typeComponent === 'password') {
            return (
                <Input.Password
                    type={typeText ? typeText : ''}
                    prefix={prefixedIcon}
                    placeholder={placeholderText}
                    disabled={disabled ? disabled : false}
                    className={`${disabled ? ' bg-white' : ''}`}
                    {...field}
                />
            );
        }
        if (typeComponent === 'textarea') {
            return (
                <Input.TextArea
                    placeholder={placeholderText}
                    rows={6}
                    disabled={disabled ? disabled : false}
                    className={`${disabled ? ' bg-white' : ''}`}
                    {...field}
                />
            );
        }
        return (
            <Input
                type={typeText}
                prefix={prefixedIcon}
                placeholder={placeholderText}
                disabled={disabled}
                className={`${disabled ? ' bg-white' : ''}`}
                {...field}
            />
        );
    }
    const { formState, control } = useFormContext();
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {},
                    token: {
                        colorPrimary: '#b91c1c',
                        fontFamily: 'Montserrat',
                    },
                }}
            >
                <Form.Item
                    label={
                        labelText ? (
                            <p className={`${css !== undefined ? css : ''}`}>
                                {labelText}
                            </p>
                        ) : (
                            ''
                        )
                    }
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
                        render={({ field }) => component(field)}
                    />
                </Form.Item>
            </ConfigProvider>
        </>
    );
}

export default InputText;
