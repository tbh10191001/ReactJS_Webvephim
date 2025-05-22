import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const logoWeb = require('~/images/logoWeb.png');

function Footer() {
    let navigator = useNavigate();

    return (
        <div className="bg-black p-10 flex">
            <div className="w-1/3 flex flex-col justify-center">
                <img className="w-1/3" src={logoWeb} alt="logo" />
                <p className="text-textColor text-start mt-10">
                    Cảm ơn bạn đã ghé thăm
                </p>
            </div>
            <div className="w-1/3">
                <p className="text-mainColor text-start font-semibold">
                    QUY ĐỊNH VÀ ĐIỀU KHOẢN
                </p>
                <p
                    className="text-textColor mt-4 text-start hover:text-mainColor hover:cursor-pointer"
                    onClick={() => navigator('/regulations')}
                >
                    Quy định & chính sách chung
                </p>
                <p
                    className="text-textColor mt-4 text-start hover:text-mainColor hover:cursor-pointer"
                    onClick={() => navigator('/rules')}
                >
                    Điều khoản sử dụng
                </p>
            </div>
            <div className="w-1/3">
                <p className="text-mainColor text-start font-semibold">
                    Liên hệ với chúng tôi
                </p>
                <div className="mt-10">
                    <FontAwesomeIcon
                        className="text-textColor text-5xl hover:text-mainColor hover:cursor-pointer mr-20"
                        icon={faInstagram}
                    />
                    <FontAwesomeIcon
                        className="text-textColor text-5xl hover:text-mainColor hover:cursor-pointer mr-20"
                        icon={faFacebook}
                    />
                    <FontAwesomeIcon
                        className="text-textColor text-5xl hover:text-mainColor hover:cursor-pointer"
                        icon={faEnvelope}
                    />
                </div>
            </div>
        </div>
    );
}

export default Footer;
