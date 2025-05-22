import { Image, Spin } from 'antd';

function ImageCom({ src, css }) {
    return (
        <>
            {src && (
                <div
                    className={`w-full h-full flex items-center justify-center ${
                        css ? css : ''
                    }`}
                >
                    <Image src={`${src}`} placeholder={<Spin />} />
                </div>
            )}
        </>
    );
}

export default ImageCom;
