import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import Card from './Card';

function SwiperAuto({ films, current, pageSize }) {
    return (
        <>
            {films && (
                <Swiper
                    spaceBetween={30}
                    slidesPerView={pageSize}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                >
                    {Array.from(films).map((film, index) => {
                        return (
                            <SwiperSlide>
                                <Card film={film} index={index} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </>
    );
}

export default SwiperAuto;
