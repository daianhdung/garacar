import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import images from '~/assets';
import Paging from '~/components/Paging/Paging';
import SwiperSlideBrand from '~/components/swiper/swiperslide/SwiperSlideBrand';
import config from '~/config';
import useFilter from '~/hooks/useFilter';
import useViewport from '~/hooks/useViewport';
import * as brandService from '~/services/brandService';
import * as categoryService from '~/services/categoryService';
import * as productService from '~/services/productService';
import { formatNumber } from '~/utils/stringUtils';
import styles from './Home.module.scss';
import constantObject from '~/utils/constant-var';

const imageSlider = [
    { image: images.slide1 },
    { image: images.slide2 },
    { image: images.slide3 },
    { image: images.slide4 },
];

const cx = classNames.bind(styles);

function Home() {
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [product, setProduct] = useState();
    const filterContext = useFilter();

    const [page, SetPage] = useState({ currentPage: 1 });

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    useEffect(() => {
        const getAllHomeAPI = async () => {
            const responseBrand = await brandService.getAllBrand();
            setBrand(responseBrand);
            const responseCategory = await categoryService.getAllCategory();
            setCategory(responseCategory);
        };
        getAllHomeAPI();
    }, []);

    useEffect(() => {
        const getAllProductApi = async () => {
            const responseProduct = await productService.getAllProductFilter({
                searchKeyword: '',
                totalItemEachPage: '24',
                currentPage: page.currentPage,
                sortType: '',
                brandIds: [],
                categoryIds: [],
            });
            setProduct(responseProduct.productDTOList);
            SetPage({ ...page, totalPage: responseProduct.totalPage, currentPage: responseProduct.currentPage });
        };
        getAllProductApi();
    }, [page.currentPage]);

    return (
        <>
            <div className={cx('row', 'block_slide')}>
                <div className="col-md-8 col-sm-8" style={{ paddingLeft: '0' }}>
                    <SwiperSlideBrand
                        style={{ borderRadius: '10px', overFlow: 'hidden' }}
                        amount={1}
                        width={'100%'}
                        height={isMobile ? 200 : 300}
                        img={imageSlider}
                        autoDelay={3000}
                        modules={[Navigation, Pagination, Autoplay]}
                        styleWrap={{ paddingLeft: '0', paddingRight: '0' }}
                        spaceBetweenSlide={30}
                    />
                </div>
                <div
                    style={
                        isMobile
                            ? { borderRadius: '10px', paddingLeft: '0' }
                            : { borderRadius: '10px', paddingRight: '0' }
                    }
                    className="col-md-4 col-sm-4"
                >
                    <img
                        style={{ borderRadius: '10px' }}
                        width={'100%'}
                        height={isMobile ? 200 : 300}
                        src={images.saleBanner}
                        alt=""
                    />
                </div>
            </div>

            {/* 2nd Block */}
            <div className={cx('row', 'my-4', 'block_slide')} style={{ paddingLeft: '0', paddingRight: '0' }}>
                <SwiperSlideBrand
                    style={{ border: '1px solid #000', padding: '5px 0', borderRadius: '5px' }}
                    amount={isMobile ? 3 : 10}
                    width={80}
                    height={60}
                    onClick={(id) => filterContext.handleCheckBrand(id)}
                    img={brand}
                    modules={[Navigation]}
                    styleWrap={{ paddingLeft: '0', paddingRight: '0' }}
                    spaceBetweenSlide={30}
                />
            </div>

            {/* 3rd Block */}
            <div className={cx('row', 'my-4', 'block_slide')}>
                <SwiperSlideBrand
                    styleWrap={{ paddingLeft: '0', paddingRight: '0' }}
                    amount={isMobile ? 2 : 6}
                    texts={category}
                    onClick={(id) => filterContext.handleClickCate(id)}
                    modules={[Navigation]}
                    spaceBetweenSlide={30}
                    minWidth={isMobile ? 50 : 200}
                />
            </div>

            {/* 4th Block */}
            <div
                style={
                    isMobile
                        ? { height: 300, borderRadius: '10px', overFlow: 'hidden' }
                        : { height: 350, borderRadius: '10px', overFlow: 'hidden' }
                }
                className={cx('row', 'block_slide', 'p-1', 'blue_gradient')}
            >
                <div style={{ fontWeight: '700', fontSize: '20px' }}>Sản phẩm nổi bật</div>
                <SwiperSlideBrand
                    style={{ borderRadius: '10px', overFlow: 'hidden', marginLeft: '10px' }}
                    amount={isMobile ? 2 : 6}
                    product={product}
                    autoDelay={2900}
                    modules={[Navigation, Autoplay]}
                    // styleWrap={}
                    spaceBetweenSlide={1}
                    height={isMobile ? 190 : 210}
                    width={isMobile ? 150 : 190}
                />
            </div>

            {/* 5th Block */}
            <div
                className={cx('block_slide', 'blue_gradient', 'my-4', 'row')}
                style={{ borderRadius: '10px', overFlow: 'hidden' }}
            >
                <div style={{ borderRadius: '10px', overFlow: 'hidden' }} className={cx('row')}>
                    {product &&
                        product.map((item) => (
                            <Link
                                key={item.id}
                                to={`${config.routes.detail}/${item.id}`}
                                className="col-md-2 hover_boxShadow col-6 justify-content-center"
                            >
                                <div
                                    className="w-100 mt-3 f-center-align"
                                    style={{ minHeight: 300, flexDirection: 'column' }}
                                >
                                    <img height={180} width={isMobile ? 150 : 180} src={item.mainImage} alt="" />
                                    <div
                                        className="fw-bolder font_roboto mt-3"
                                        style={{ minHeight: 50, fontSize: '14px' }}
                                    >
                                        {item.name}
                                    </div>
                                    <div style={{ textAlign: 'center', color: 'rgb(255, 66, 78)', fontSize: '16px' }}>
                                        <span className="fw-bolder font_roboto">
                                            {formatNumber(item.price)}
                                            <span style={{ fontSize: '16px' }}> ₫</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    <div className="row">
                        <div className="offset-md-6 col-md-3 offset-4 col-3">
                            <Paging currentPage={page.currentPage} totalPage={page.totalPage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
