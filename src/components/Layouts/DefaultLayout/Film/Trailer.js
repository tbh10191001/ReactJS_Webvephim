import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Trailer() {
    const [isTrailer, setIsTrailer] = useState(false);

    return {
        isTrailer: isTrailer,
        setIsTrailer: setIsTrailer,
        renderTrailer: (trailer) => (
            <>
                {isTrailer && (
                    <div className="fixed z-10 flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-bgModal">
                        {trailer ? (
                            <>
                                <iframe
                                    className="w-2/3 h-2/3 z-20"
                                    src={trailer}
                                    title="YouTube video player"
                                    frameBorder={0}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                ></iframe>
                            </>
                        ) : (
                            <div className="bg-bgmain p-20 rounded-2xl shadow-3xl ">
                                <p className="text-white cursor-default">
                                    Xin thứ lỗi, hiện tại phim chưa có trailer.
                                    {trailer}
                                </p>
                            </div>
                        )}
                        <FontAwesomeIcon
                            icon={faClose}
                            className="absolute z-10 bottom-16 text-white py-5 px-6 rounded-full bg-bgmain hover:bg-white hover:text-black hover:cursor-pointer"
                            onClick={() => {
                                console.log(2);
                                setIsTrailer(!isTrailer);
                            }}
                        />
                    </div>
                )}
            </>
        ),
    };
}

export default Trailer;
