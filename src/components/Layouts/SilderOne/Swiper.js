import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export const Swiper = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    function plusSlide(n) {
        setCurrentSlide((value) => {
            if (n > 0) {
                return value < children.length - 1 ? value + n : 0;
            }
            return value <= 0 ? children.length - 1 : value + n;
        });
    }

    return (
        <div className="w-full h-full relative bg-black">
            <div className="w-full h-full flex">{children[currentSlide]}</div>

            <FontAwesomeIcon
                className="py-4 px-5 rounded-full absolute top-1/2 left-16 -translate-y-1/2 text-black bg-white opacity-20 hover:bg-white hover:opacity-80 hover:text-black hover:cursor-pointer"
                icon={faChevronLeft}
                onClick={() => plusSlide(-1)}
            />
            <FontAwesomeIcon
                className="py-4 px-5 rounded-full absolute top-1/2 right-16 -translate-y-1/2 text-black bg-white opacity-20 hover:bg-white hover:opacity-80 hover:text-black hover:cursor-pointer"
                icon={faChevronRight}
                onClick={() => plusSlide(1)}
            />
            <div className="w-full h-10 absolute bottom-0 flex justify-center items-center gap-1.5 z-10">
                {children.map((child, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-5 h-5 rounded-full mx-3 bg-white opacity-30 hover:opacity-80 hover:cursor-pointer ${
                            index === currentSlide ? 'opacity-80' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
