// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classNames from 'classnames/bind';
import styles from './Swiper.scss';
import { formatNumber } from '~/utils/stringUtils';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function SwiperSlideBrand(prop) {
    const delay = prop.autoDelay;

    return (
        <div className={cx('wrapper_swiper')} style={prop.styleWrap}>
            <Swiper
                slidesPerView={prop.amount}
                spaceBetween={prop.spaceBetweenSlide}
                autoplay={{
                    delay: delay,
                    disableOnInteraction: true,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={prop.modules}
                className="mySwiper"
            >
                {prop.img &&
                    prop.img.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link to={config.routes.product}>
                                <img
                                    // onClick={() => prop.onClick(item.id)}
                                    style={prop.style}
                                    src={item.image}
                                    width={prop.width}
                                    height={prop.height}
                                    className=""
                                    alt=""
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                {prop.texts &&
                    prop.texts.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link onClick={() => prop.onClick(item.id)} to={config.routes.product}>
                                <div className={cx('text')} style={{ minWidth: prop.minWidth }}>
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                {prop.product &&
                    prop.product.map((item, index) => (
                        <SwiperSlide className="hover_boxShadow" key={index}>
                            <Link
                                className="f-center-align"
                                style={{ flexDirection: 'column' }}
                                to={`${config.routes.detail}/${item.id}`}
                            >
                                <img
                                    style={prop.style}
                                    height={prop.height}
                                    width={prop.width}
                                    src={item.mainImage}
                                    alt=""
                                />
                                <div className="fw-bolder font_roboto mt-2 px-2" style={{ minHeight: 40, fontSize: '14px' , maxWidth : '200px'}}>
                                    {item.name}
                                </div>
                                <div
                                    className=" mt-2"
                                    style={{ textAlign: 'center', color: 'rgb(153 217 80)', fontSize: '16px' }}
                                >
                                    <span className="fw-bolder font_roboto">
                                        {formatNumber(item.price)}
                                        <span style={{ position: 'absolute', top: '90%', fontSize: '14px' }}>₫</span>
                                    </span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default SwiperSlideBrand;
