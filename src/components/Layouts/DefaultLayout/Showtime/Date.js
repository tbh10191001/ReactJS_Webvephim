import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';

import moment from 'moment';
import { EffectCreative, Navigation, Pagination } from 'swiper/modules';
import ButtonSwiperNavigation from '~/components/Button/ButtonSwiperNavigation';

function Date({ date }) {
    const [datePick, setDatePick] = useState();

    return {
        datePick: datePick,
        renderDate: (
            <>
                {date && (
                    <div className="relative">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            modules={[EffectCreative, Pagination, Navigation]}
                            pagination={{
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return `<span class="${className}"></span>`;
                                },
                            }}
                            style={{
                                '--swiper-pagination-color': '#b91c1c',
                            }}
                            className="w-5/6"
                        >
                            {date.map((item, index) => (
                                <SwiperSlide
                                    className={`text-white text-center py-6 px-4 cursor-pointer hover:bg-mainColor ${
                                        datePick ===
                                        moment(item.ngaychieu).format(
                                            'YYYY-MM-DD',
                                        )
                                            ? 'bg-mainColor'
                                            : ''
                                    }`}
                                    onClick={(e) => {
                                        setDatePick(
                                            moment(item.ngaychieu).format(
                                                'YYYY-MM-DD',
                                            ),
                                        );
                                    }}
                                    key={index}
                                >
                                    {moment(item.ngaychieu).format(
                                        'DD-MM-YYYY',
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <ButtonSwiperNavigation />
                    </div>
                )}
            </>
        ),
    };
}

export default Date;
