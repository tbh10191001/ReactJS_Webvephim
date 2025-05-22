function FilmInfo({ filmInfo }) {
    return (
        <>
            {filmInfo && (
                <div>
                    {filmInfo.length !== 0 ? (
                        <div className="text-white">
                            <p className="text-btGreen font-semibold text-3xl truncate ...">
                                {filmInfo.tenphim}
                            </p>
                            <p className="text-white mt-6 text-2xl truncate ...">
                                Thời lượng phim: {filmInfo.thoiluongchieu} phút
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </>
    );
}

export default FilmInfo;
