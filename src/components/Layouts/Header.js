function Header() {
    return (
        <header className="fixed z-10 w-full h-24 top-0 bg-black py-8 flex justify-between items-center">
            <img
                src="https://filmax.themerex.net/wp-content/uploads/2017/12/logo-1x.png"
                className="ml-10"
            />
            <div className="flex justify-around">
                <div className="text-white mr-10 active:text-mainColor">
                    Home
                </div>
                <div className="text-white mr-10">Rạp Filmax</div>
                <div className="text-white">Liên hệ</div>
            </div>
            <div className="mr-10 h-auto flex justify-around">
                <button className="text-white mr-10 hover:text-mainColor">
                    Đăng ký
                </button>
                <button className="text-black px-3 py-4 bg-white font-semibold rounded-full hover:text-mainColor hover:animate-pulse">
                    Đăng nhập
                </button>
            </div>
        </header>
    );
}

export default Header;
