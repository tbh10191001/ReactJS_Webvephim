import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSwiper } from 'swiper/react';

function ButtonSwiperNavigation() {
    const swiper = useSwiper();
    return (
        <div className=" absolute w-full -translate-y-1/2 top-1/2 flex justify-between">
            <FontAwesomeIcon
                className=" text-white py-3 px-4 rounded-full shadow-3xl bg-bgthird hover:bg-bgmain hover:cursor-pointer"
                icon={faChevronLeft}
                onClick={(e) => {
                    e.stopPropagation();

                    console.log(1);
                    swiper.slidePrev();
                }}
            />

            <FontAwesomeIcon
                className=" text-white py-3 px-4 rounded-full shadow-3xl bg-bgthird hover:bg-bgmain hover:cursor-pointer"
                icon={faChevronRight}
                onClick={(e) => {
                    e.stopPropagation();

                    console.log(2);
                    swiper.slideNext();
                }}
            />
        </div>
    );
}

export default ButtonSwiperNavigation;
