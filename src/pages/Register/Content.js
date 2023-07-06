import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Content() {
    const [email, setEmail] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [hoten, setHoten] = useState('');
    const [sdt, setSDT] = useState('');
    const [cccd, setCCCD] = useState('');
    const [gioitinh, setGioitinh] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    console.log(gioitinh);
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="h-auto flex justify-center bg-bgmain">
            <div className="w-1/2 mt-36 mb-12 p-10 rounded-xl bg-bgsecondary">
                <div className="text-white text-center mt-20 font-bold text-4xl">
                    ĐĂNG KÝ
                </div>
                <div className="mt-10 font-semibold text-white">Email</div>
                <input
                    className="w-full py-3 px-2 bg-bgthird mt-4 rounded-xl text-white hover:outline-none focus:outline-none"
                    type="text"
                    placeholder="Nhập email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mt-8 mb-4 font-semibold text-white">
                    Mật khẩu
                </div>
                <div className="flex items-center">
                    <input
                        className="w-11/12 py-3 px-2 bg-bgthird rounded-xl text-white hover:outline-none focus:outline-none"
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu..."
                        value={matkhau}
                        onChange={(e) => setMatkhau(e.target.value)}
                    />
                    <div className="w-1/12 flex justify-center items-center">
                        <FontAwesomeIcon
                            className="text-white hover:cursor-pointer text-3xl"
                            icon={isShowPassword === true ? faEye : faEyeSlash}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        />
                    </div>
                </div>
                <div className="mt-8 font-semibold text-white">Họ và tên</div>
                <input
                    className="w-full py-3 px-2 bg-bgthird mt-4 rounded-xl text-white hover:outline-none focus:outline-none"
                    type="text"
                    placeholder="Nhập họ và tên..."
                    value={hoten}
                    onChange={(e) => setHoten(e.target.value)}
                />
                <div className="mt-8 font-semibold text-white">
                    Số điện thoại
                </div>
                <input
                    className="w-full py-3 px-2 bg-bgthird mt-4 rounded-xl text-white hover:outline-none focus:outline-none"
                    type="text"
                    placeholder="Nhập số điện thoại..."
                    value={sdt}
                    onChange={(e) => setSDT(e.target.value)}
                />
                <div className="mt-8 font-semibold text-white">Giới tính</div>
                <div className="flex justify-around">
                    <div className="flex items-center">
                        <input
                            id="Nu"
                            type="radio"
                            value="0"
                            name="gioitinh"
                            className="w-7 h-7 bg-gray-100 border-mainColor focus:bg-mainColor"
                            defaultChecked
                            onClick={(e) => setGioitinh(e.target.value)}
                        />
                        <label
                            htmlFor="Nu"
                            className="pl-4 text-white dark:text-gray-300"
                        >
                            Nữ
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="Nam"
                            type="radio"
                            value="1"
                            name="gioitinh"
                            className="w-7 h-7 bg-gray-100 border-mainColor focus:bg-mainColor"
                            onClick={(e) => setGioitinh(e.target.value)}
                        />
                        <label
                            htmlFor="Nam"
                            className="pl-4 text-white dark:text-gray-300"
                        >
                            Nam
                        </label>
                    </div>
                </div>
                <div className="mt-8 font-semibold text-white">
                    Căn cước công dân
                </div>
                <input
                    className="w-full py-3 px-2 bg-bgthird mt-4 rounded-xl text-white hover:outline-none focus:outline-none"
                    type="text"
                    placeholder="Nhập căn cước công dân..."
                    value={cccd}
                    onChange={(e) => setCCCD(e.target.value)}
                />
                <div className="mt-10 flex items-center ">
                    <input
                        type="checkbox"
                        value="0"
                        className="w-8 h-8 bg-gray-100"
                        onClick={(e) => setIsChecked(!isChecked)}
                    />
                    <div className="flex relative items-center">
                        <p className="pl-4 text-white">
                            Tôi đã đọc, hiểu và đồng ý với các
                        </p>
                        <p className="pl-1 absolute top-0.5 -right-40 text-mainColor underline-offset-1 hover:cursor-pointer">
                            Điều khoản
                        </p>
                    </div>
                </div>
                <div className="w-full mb-20 flex justify-center mt-10">
                    <button
                        className={`w-1/2 rounded-xl text-white font-semibold py-4  ${
                            email &&
                            matkhau &&
                            hoten &&
                            sdt &&
                            cccd &&
                            isChecked
                                ? 'bg-mainColor hover:cursor-pointer'
                                : 'bg-bgmain hover:cursor-not-allowed'
                        }`}
                        disabled={
                            email &&
                            matkhau &&
                            hoten &&
                            sdt &&
                            cccd &&
                            isChecked
                                ? false
                                : true
                        }
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Content;
