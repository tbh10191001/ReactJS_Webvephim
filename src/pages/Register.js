import FormRegister from '~/components/Form/Register/FormRegister';

function Register() {
    return (
        <div className="h-auto flex justify-center bg-bgmain">
            <div className="w-1/2 mt-36 mb-12 p-10 rounded-xl bg-sliderButton">
                <div className="text-mainColor text-center my-20 font-bold text-4xl">
                    ĐĂNG KÝ
                </div>
                <FormRegister />
            </div>
        </div>
    );
}

export default Register;
