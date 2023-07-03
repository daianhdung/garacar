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

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useViewport from '~/hooks/useViewport';
import constantObject from '~/utils/constant-var';

const cx = classNames.bind(styles);

function ShoesThumb({ children, news }) {
    const [activeThumb, setActiveThumb] = useState();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    return (
        <>
            {!news ? (
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
                                        <img width={100} height={80} src={item} />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </>
            ) : (
                <div className="wrapper_news_slide">
                    <Swiper
                        spaceBetween={10}
                        loop={true}
                        navigation={true}
                        modules={[Navigation, Thumbs]}
                        thumbs={{ swiper: activeThumb }}
                        autoplay={{ delay: 2500 }}
                        className={cx('swiper-shoes')}
                    >
                        {news &&
                            news.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Link className={isMobile && 'f-center-align'} key={item.title} to={item.link} target="_blank">
                                        <div className={cx('new_wrapper')}>
                                            <div dangerouslySetInnerHTML={{ __html: item.imgTag }}></div>
                                            <div className={cx('title_wrap')}>
                                                <h4
                                                    className="fw-bold"
                                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                                ></h4>
                                                <div dangerouslySetInnerHTML={{ __html: item.remainText }}></div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    <hr></hr>
                    <Swiper
                        onSwiper={setActiveThumb}
                        spaceBetween={10}
                        slidesPerView={isMobile ? 1.3 : 3}
                        loop={true}
                        autoplay={{ delay: 2500 }}
                        modules={[Navigation, Thumbs]}
                        className={cx('news-thumb')}
                    >
                        {news &&
                            news.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={cx('wrap_link')}>
                                        <Link to={item.link} target="_blank">
                                            <div className={cx('news-thumb-wrapper')}>
                                                <div dangerouslySetInnerHTML={{ __html: item.imgTag }}></div>
                                            </div>
                                            <div style={{ maxWidth: '240px' }}>
                                                <h6
                                                    className="fw-bold"
                                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                                ></h6>
                                                <div dangerouslySetInnerHTML={{ __html: item.remainText }}></div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}

export default ShoesThumb;
