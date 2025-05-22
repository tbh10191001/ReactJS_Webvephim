import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export const Swiper = ({ children, sliderPerView, auto }) => {
    children = React.Children.toArray(children);

    const [currentSlide, setCurrentSlide] = useState(0);

    let numOfDots = children.length - (sliderPerView - 1);
    let duration = 3000;
    function plusSlide(n) {
        setCurrentSlide((value) => {
            if (n > 0) {
                return value < numOfDots - 1 ? value + n : 0;
            }
            return value <= 0 ? numOfDots - 1 : value + n;
        });
    }

    const [isDragStart, setIsDragStart] = useState(false);
    const [start, setStart] = useState(0);
    const [change, setChange] = useState(0);
    const [stopAuto, setStopAuto] = useState(false);

    function dragStart(e) {
        setIsDragStart(!isDragStart);
        let prevPagrX = e.pageX || e.touches[0].pageX;
        setStart(prevPagrX);
        setChange(0);
    }
    function dragging(e) {
        if (!isDragStart) {
            return;
        }
        let positionDiff = (e.pageX || e.touches[0].pageX) - start;
        setChange(positionDiff);
    }
    function dragStop() {
        setIsDragStart(false);
        setStart(0);
        if (change < 0) {
            plusSlide(1);
        } else if (change > 0) {
            plusSlide(-1);
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (auto) {
                setCurrentSlide((value) =>
                    value < numOfDots - 1 ? value + 1 : 0,
                );
            }
        }, duration);
        if (stopAuto) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [auto, duration, numOfDots]);

    return (
        <div
            className="w-full h-full relative"
            onMouseDown={dragStart}
            onMouseMove={dragging}
            onMouseUp={dragStop}
            onTouchStart={dragStart}
            onTouchMove={dragging}
            onTouchEnd={dragStop}
            onMouseOver={() => setStopAuto(true)}
            onMouseLeave={() => setStopAuto(false)}
        >
            <div className="w-full h-full flex items-center justify-center">
                {children.slice(currentSlide, currentSlide + sliderPerView)}
            </div>

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
                {[...Array(numOfDots).keys()].map((child, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-5 h-5 rounded-full mx-3 bg-mainColor opacity-30 hover:opacity-80 hover:cursor-pointer ${
                            index === currentSlide ? 'opacity-80' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
