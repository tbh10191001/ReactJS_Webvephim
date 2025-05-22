import QRCode from 'react-qr-code';

function QrCode({ data }) {
    return (
        <div className="w-1/3 ">
            <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={data}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
}

export default QrCode;
