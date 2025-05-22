import { ConfigProvider } from 'antd';
import Search from 'antd/es/input/Search';

function InputSearch({ placeholder, enterButton, size, setSearchValue }) {
    const onSearch = (value) => {
        setSearchValue(value);
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        activeBg: '#b91c1c',
                    },
                },
                token: {
                    colorPrimary: '#b91c1c',
                    colorBorder: '#b91c1c',
                    fontFamily: 'Montserrat',
                },
            }}
        >
            <Search
                placeholder={placeholder}
                allowClear
                enterButton={enterButton}
                size={size}
                onSearch={onSearch}
            />
        </ConfigProvider>
    );
}

export default InputSearch;
