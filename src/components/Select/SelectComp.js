import { ConfigProvider, Select } from 'antd';
import { useState } from 'react';

function SelectComp({ placeholder, options, maxTagCount }) {
    const [type, setType] = useState([]);
    const handleChange = (value) => {
        setType(value);
    };

    return {
        type: type,
        renderSelectComp: (
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
                {options && (
                    <Select
                        mode={'multiple'}
                        maxTagCount={maxTagCount}
                        allowClear
                        placeholder={placeholder}
                        onChange={handleChange}
                        options={options}
                        optionRender={(option) => (
                            <p className="text-bgmain capitalize">{option}</p>
                        )}
                        style={{ width: '80%' }}
                    />
                )}
            </ConfigProvider>
        ),
    };
}

export default SelectComp;
