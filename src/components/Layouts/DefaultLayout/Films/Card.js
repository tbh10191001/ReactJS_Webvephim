import { useNavigate } from 'react-router-dom';
import ImageCom from '~/components/ImageCom/ImageCom';

function Card({ films, current, pageSize }) {
    const navigator = useNavigate();
    return (
        <div className=" contents">
            {films &&
                Array.from(films).map((item, index) => {
                    if (
                        (current - 1) * pageSize <= index &&
                        index <= current * pageSize - 1
                    )
                        return (
                            <div
                                key={index}
                                className="border border-mainColor last:mr-0 hover:shadow-2xl bg-bgthird "
                            >
                                <div className="w-[236px] h-[352px]">
                                    <ImageCom src={item.src} css={' !h-auto'} />
                                </div>
                                <button
                                    onClick={() =>
                                        navigator(`/film/${item.film.maphim}`)
                                    }
                                    className="z-10 w-full bg-mainColor text-white py-2 hover:opacity-70"
                                >
                                    Mua vé
                                </button>
                                <div className="p-2">
                                    <p className="text-white line-clamp-2 text-2xl font-semibold">
                                        {item.film.tenphim}
                                    </p>
                                    <p className="text-textColor line-clamp-2 text-xl">
                                        {item.type}
                                    </p>
                                </div>
                            </div>
                        );
                })}
        </div>
    );
}

export default Card;
