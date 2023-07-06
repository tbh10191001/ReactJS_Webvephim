import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Content() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="h-screen flex justify-center bg-bgmain">
            <div className="w-1/2 mt-36 mb-12 p-10 rounded-xl bg-bgsecondary">
                <div className="text-white text-center mt-20 font-bold text-4xl">
                    ĐĂNG NHẬP
                </div>
                <div className="mt-20 font-semibold text-white">Email</div>
                <input
                    className="w-full py-3 px-2 bg-bgthird mt-4 rounded-xl text-white hover:outline-none focus:outline-none"
                    type="text"
                    placeholder="Nhập email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mt-16 mb-4 font-semibold text-white">
                    Mật khẩu
                </div>
                <div className="flex items-center">
                    <input
                        className="w-11/12 py-3 px-2 bg-bgthird rounded-xl text-white hover:outline-none focus:outline-none"
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="w-1/12 flex justify-center items-center">
                        <FontAwesomeIcon
                            className="text-white hover:cursor-pointer text-3xl"
                            icon={isShowPassword === true ? faEye : faEyeSlash}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        />
                    </div>
                </div>
                <div className="mt-10 w-full text-end text-white hover:cursor-pointer hover:text-mainColor">
                    Quên mật khẩu?
                </div>
                <div className="w-full flex justify-center mt-20">
                    <button
                        className={`w-1/2 rounded-xl text-white font-semibold py-4  ${
                            email && password
                                ? 'bg-mainColor hover:cursor-pointer'
                                : 'bg-bgmain hover:cursor-not-allowed'
                        }`}
                        disabled={email && password ? false : true}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Content;
