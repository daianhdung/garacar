// import Swiper core and required modules
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Thumbs } from 'swiper';
import classNames from 'classnames/bind';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import config from '~/config';
import styles from './ShoesThumb.module.scss';
import { useState } from 'react';
// import '~/components/MySwiper/Swiper.scss';

const cx = classNames.bind(styles);

function ShoesThumb({ children }) {
    const [activeThumb, setActiveThumb] = useState();

    return (
        <>
            <Swiper
                spaceBetween={10}
                loop={true}
                navigation={true}
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: activeThumb }}
                className={cx('swiper-shoes')}
            >
                {children &&
                    children.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={cx('swiper-shoes-wrapper')}>
                                <img width={300} height={250} src={item} />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <Swiper
                onSwiper={setActiveThumb}
                spaceBetween={10}
                slidesPerView={4}
                modules={[Navigation, Thumbs]}
                className={cx('swiper-shoes-thumb')}
            >
                {children &&
                    children.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={cx('swiper-shoes-thumb-wrapper')}>
                                <img width={100} height={100} src={item} />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    );
}

export default ShoesThumb;
