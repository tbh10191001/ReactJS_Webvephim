import { ConfigProvider, Pagination } from 'antd';

function PaginationComp({ total, current, setCurrent, pageSize }) {
    return (
        <>
            {total && (
                <ConfigProvider
                    theme={{
                        components: {
                            Pagination: {
                                /* here is your component tokens */
                            },
                        },
                        token: {
                            colorText: '#fff',
                            colorPrimary: '#b91c1c',
                        },
                    }}
                >
                    <Pagination
                        defaultCurrent={1}
                        total={total.size ? total.size : total.length}
                        pageSize={pageSize}
                        current={current}
                        onChange={(page) => {
                            setCurrent(page);
                        }}
                    />
                </ConfigProvider>
            )}
        </>
    );
}

export default PaginationComp;
