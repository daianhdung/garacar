import "swiper/css/bundle";

import images from "~/assets";
import SwiperSlideBrand from "~/components/swiper/swiperslide/SwiperSlideBrand";


function Home() {


    return (<>
        <SwiperSlideBrand amount={1} width={'100%'} height={300} img={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'}/>
        
        <SwiperSlideBrand style={{border: '1px solid #000', padding: '5px 0'}} amount={4} width={80} height={60} img={images.logo1}/>

    </>);
}

export default Home;