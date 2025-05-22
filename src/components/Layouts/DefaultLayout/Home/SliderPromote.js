import images from '~/images/imagesProtomo/imagesProtomo';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
function SilderPromote() {
    return (
        <div className="py-10 bg-black">
            <Swiper
                spaceBetween={30}
                slidesPerView={4}
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
                    <SwiperSlide key={index}>
                        <img
                            key={index}
                            className="w-[36rem] bg-contain pointer-events-none"
                            src={img}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SilderPromote;
