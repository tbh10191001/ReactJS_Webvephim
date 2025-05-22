// import { Swiper } from '~/components/Layouts/DefaultLayout/Silder/Swiper';
// import SwiperSlide from '~/components/Layouts/DefaultLayout/Silder/SwiperSlider';
import images from '~/images/imagesPR/imagesPR';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function SliderPR() {
    return (
        <div className="bg-black">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="!flex !justify-center">
                        <img
                            key={index}
                            className="pointer-events-none"
                            src={img}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SliderPR;
