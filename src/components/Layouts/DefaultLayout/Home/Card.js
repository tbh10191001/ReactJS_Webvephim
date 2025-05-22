import { useNavigate } from 'react-router-dom';
import ImageCom from '~/components/ImageCom/ImageCom';

function Card({ film, index }) {
    const navigator = useNavigate();
    return (
        <>
            {film && (
                <div
                    key={index}
                    className="border border-mainColor last:mr-0 hover:shadow-2xl bg-bgthird w-fit"
                >
                    <div className="w-[236px] h-[352px]">
                        <ImageCom src={film.src} css={' !h-auto'} />
                    </div>
                    <button
                        onClick={() => navigator(`/film/${film.film.maphim}`)}
                        className="w-full bg-mainColor text-white py-2 hover:opacity-70"
                    >
                        Mua vé
                    </button>
                </div>
            )}
        </>
    );
}

export default Card;
