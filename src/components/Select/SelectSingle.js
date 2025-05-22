import { ConfigProvider, Select } from 'antd';
import moment from 'moment';
import { useState } from 'react';

function SelectSingle({ placeholder, options, width, type, setType, date }) {
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
            {options && (
                <Select
                    allowClear
                    placeholder={placeholder}
                    onChange={(value) => setType(value)}
                    options={options}
                    label={
                        date === true
                            ? (label) => moment(label).format('DD-MM-YYYY')
                            : null
                    }
                    style={{ width: width }}
                />
            )}
        </ConfigProvider>
    );
}

export default SelectSingle;
