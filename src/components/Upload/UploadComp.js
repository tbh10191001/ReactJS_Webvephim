import { PlusOutlined } from '@ant-design/icons';
import { ConfigProvider, Form, Upload } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

function UploadComp({ name, labelText, setFileList, fileList, css }) {
    const { formState, control } = useFormContext();
    return (
        <ConfigProvider
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
                    render={({
                        field: { name, value, onChange, ref, onBlur },
                    }) => (
                        <Upload
                            action={'http://localhost:3000/staff/films/addfilm'}
                            listType="picture-card"
                            maxCount={1}
                            showUploadList={{ showRemoveIcon: true }}
                            accept=".jpeg, .jpg, .png"
                            beforeUpload={(file) => {
                                // setFileList(file.name);
                                return false;
                            }}
                            onChange={(file) => {
                                setFileList(file.fileList);
                                onChange(file.file.name);
                            }}
                            fileList={fileList}
                        >
                            <button
                                style={{ border: 0, background: 'none' }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    )}
                />
            </Form.Item>
        </ConfigProvider>
    );
}

export default UploadComp;
