import "swiper/css/bundle";

import React from "react";
import SwiperSlideBrand from "~/components/swiper/swiperslide/SwiperSlideBrand";
import { useSelector } from "react-redux";
import images from "~/assets";


function Home() {

    const test = useSelector((state) => state.auth);
    console.log(test);

    return (<React.Fragment>
        <SwiperSlideBrand amount={1} width={'100%'} height={300} img={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'}/>
        
        <SwiperSlideBrand amount={4} width={100} height={80} img={images.logo1}/>
        
    </React.Fragment>);
}

export default Home;