function Content() {
    return (
        <div className="flex justify-center mb-8">
            <div className="w-3/4">
                <p className="font-bold text-center my-6 text-4xl">
                    Xin chào bạn đến với rạp chiếu phim Filmax
                </p>
                <p className="font-semibold text-center mb-6 text-2xl">
                    Filmax hân hạnh phục vụ bạn những thước phim chất lượng
                </p>
                <div className="flex justify-around">
                    <button className="mb-2 hover:text-mainColor">
                        Phim đang chiếu
                    </button>
                    <button className="mb-2 hover:text-mainColor">
                        Phim sắp chiếu
                    </button>
                </div>
                <p className="border-2 text-mainColor"></p>
                <div className="flex ">
                    <div className="w-1/4 mr-2 last:mr-0">
                        <img src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002696?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500" />
                        <div className="flex justify-between">
                            <button className="w-1/2 bg-mainColor text-white py-2 hover:opacity-70 relative after:absolute after:w-1 after:h-full after:top-0 after:-right-0.5 after:bg-black">
                                Chi tiết
                            </button>
                            <button className="w-1/2 bg-mainColor text-white py-2 hover:opacity-70">
                                Mua vé
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
