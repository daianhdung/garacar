// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function SwiperSlideBrand( prop ) {


    return (
        <Swiper
            slidesPerView={prop.amount}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide><img style={prop.style} src={prop.img} width={prop.width} height={prop.height} className="" alt=""/></SwiperSlide>
            <SwiperSlide><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png" width={prop.width} height={prop.height} className="" alt=""/></SwiperSlide>
            <SwiperSlide><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png" width={prop.width} height={prop.height} className="" alt=""/></SwiperSlide>
            <SwiperSlide><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png" width={prop.width} height={prop.height} className="" alt=""/></SwiperSlide>
        </Swiper>
    );
}

export default SwiperSlideBrand;
