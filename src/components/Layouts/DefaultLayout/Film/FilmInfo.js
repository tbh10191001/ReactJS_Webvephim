import moment from 'moment';
import { useEffect } from 'react';
import ButtonSizeM from '~/components/Button/ButtonsizeM';
import ImageCom from '~/components/ImageCom/ImageCom';
import Trailer from './Trailer';

function FilmInfo({ filmInfo, filmType, src, id, resultRef }) {
    const { isTrailer, setIsTrailer, renderTrailer } = Trailer();
    useEffect(() => {
        window.scrollTo(0, 200);
    }, []);
    const handleMoveShowtime = (e) => {
        e.preventDefault();
        console.log('ref', resultRef);

        resultRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return {
        resultRef: resultRef,
        renderFilmInfo: (
            <div>
                {filmInfo && filmType && src && (
                    <>
                        <div className="flex p-20 pb-0 mt-24">
                            <div className="w-3/5">
                                <ImageCom src={filmInfo.anhtitle && src} />
                            </div>
                            <div className="text-white ml-20 pb-12">
                                <p className="text-4xl font-bold">
                                    {filmInfo.tenphim}
                                </p>
                                <p className="mt-10 text-textColor">
                                    {filmInfo.mota}
                                </p>
                                <div className="mt-10 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Độ tuổi xem</p>
                                    <p className=" text-mainColor col-span-4 font-semibold">
                                        {filmInfo.dotuoixem}
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Đạo diễn</p>
                                    <p className="col-span-4">
                                        {filmInfo.daodien}
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Diễn viên</p>
                                    <p className="col-span-4">
                                        {filmInfo.dienvien}
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Thể loại</p>
                                    <div className="col-span-4">{filmType}</div>
                                </div>
                                <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Khởi chiếu</p>
                                    <p className="col-span-4">
                                        {moment(
                                            filmInfo.ngaybatdauchieu,
                                        ).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Thời lượng</p>
                                    <p className="col-span-4">
                                        {filmInfo.thoiluongchieu} phút
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Ngôn ngữ</p>
                                    <p className="col-span-4">
                                        {filmInfo.ngonngu}
                                    </p>
                                </div>
                                {/* <div className="mt-6 grid grid-cols-5 gap-3">
                                    <p className="font-semibold">Đánh giá</p>
                                    {id && (
                                        <div className="col-span-4">
                                            <Rating id={id} />
                                        </div>
                                    )}
                                </div> */}
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-10">
                            <ButtonSizeM
                                onClick={() => {
                                    console.log(1);
                                    setIsTrailer(!isTrailer);
                                }}
                                title={'Xem trailer'}
                            />
                            <ButtonSizeM
                                title={'Mua vé'}
                                primaryColor={'btGreen'}
                                onClick={(e) => handleMoveShowtime(e)}
                            />
                        </div>
                    </>
                )}
                {filmInfo && renderTrailer(filmInfo.trailer)}
            </div>
        ),
    };
}

export default FilmInfo;
