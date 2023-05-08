import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import useViewport from '~/hooks/useViewport';
import { useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { getDetailProduct } from '~/services/productService';
import { formatNumber } from '~/utils/stringUtils';
import ShoesThumb from '~/components/swiper/SlideThumb/ShoesThumb';

const cx = classNames.bind(styles);

function Detail() {
    const [product, setProduct] = useState('');
    const { id } = useParams();

    useEffect(() => {
        // setIsLoading(true);
        window.scrollTo(0, 0);

        const fetchApiDetailProduct = async () => {
            const response = await getDetailProduct(id);
            response.images.push(response.mainImage);
            setProduct(response);
        };
        fetchApiDetailProduct();
        // setIsLoading(false);
    }, [id]);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 500;

    return (
        <>
            <div className={`bg-white p-2 rounded`} style={{ position: 'relative' }}>
                <div className={cx('wrapper')}>
                    {isMobile ? (
                        <>
                            <div className={cx('header-detail-mobile')}>
                                <Link to={config.routes.home} className={cx('link-header')}>
                                    Trang chủ
                                </Link>
                                <i className="bi bi-caret-right-fill"></i>
                                <Link to={config.routes.product}>Sản phẩm</Link>
                                <i className="bi bi-caret-right-fill"></i>
                                <span>Product</span>
                                {/* <span className="compare_icon"
          ><i className="bi bi-plus-circle"></i> Compare</span> */}
                            </div>
                            {product && (
                                <>
                                    <div className={cx('description-mobile', 'mt-2')}>
                                        <h6 className="fw-bold">Tên sản phẩm: {product.name}</h6>
                                        <div className={cx('description_detail-mobile')}>
                                            <h6 className="my-2">
                                                {product.brandName && (
                                                    <>
                                                        Thương hiệu: <span>{product.brandName}</span>
                                                    </>
                                                )}
                                            </h6>

                                            <h6 className={cx('price', 'my-2')}>
                                                Giá: <span>{formatNumber(product.price)} VND</span>
                                            </h6>
                                            <h6 className="my-2">
                                                {product.categoryName && (
                                                    <>
                                                        Thể loại: <span>{product.categoryName}</span>
                                                    </>
                                                )}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className={cx('left-detail', 'p-2')}>
                                        <ShoesThumb children={product.images} />
                                    </div>
                                    <div
                                        className={cx('detail_description-mobile')}
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    ></div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div className={cx('header-detail')}>
                                <Link to={config.routes.home} className={cx('link-header')}>
                                    Trang chủ
                                </Link>
                                <i className="bi bi-caret-right-fill"></i>
                                <Link to={config.routes.product}>Sản phẩm</Link>
                                <i className="bi bi-caret-right-fill"></i>
                                <span>Product</span>
                                {/* <span className="compare_icon"
          ><i className="bi bi-plus-circle"></i> Compare</span> */}
                            </div>
                            {product && (
                                <>
                                    <div className={cx('mid-detail')}>
                                        <div>
                                            <div className={cx('left-detail', 'p-2')}>
                                                <ShoesThumb children={product.images} />
                                            </div>
                                        </div>
                                        <div className={cx('right-detail')}>
                                            <div className={cx('description')}>
                                                <h5 className="fw-bold">Tên sản phẩm: {product.name}</h5>
                                                <div className={cx('description_detail')}>
                                                    <h5 className="my-2">
                                                        {product.brandName && (
                                                            <>
                                                                Thương hiệu: <span>{product.brandName}</span>
                                                            </>
                                                        )}
                                                    </h5>

                                                    <h5 className={cx('price', 'my-2')}>
                                                        Giá: <span>{formatNumber(product.price)} VND</span>
                                                    </h5>
                                                    <h5 className="my-2">
                                                        {product.categoryName && (
                                                            <>
                                                                Thể loại: <span>{product.categoryName}</span>
                                                            </>
                                                        )}
                                                    </h5>
                                                </div>
                                                {product.specification && (
                                                    <div
                                                        style={{
                                                            width: '350px ',
                                                        }}
                                                        className="border-theme"
                                                    >
                                                        <div className="w-100 p-1 ps-2 text-light bg-theme">
                                                            THÔNG SỐ KỸ THUẬT
                                                        </div>
                                                        <div
                                                            style={{ listStyleType: 'initial !important' }}
                                                            className="py-2 px-4 div_ul_init ul_no_margin_bot"
                                                            dangerouslySetInnerHTML={{ __html: product.specification }}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    width: '270px ',
                                                }}
                                                className="border-theme mt-3 ul_no_margin_bot"
                                            >
                                                <ul className="py-3 px-3" style={{ borderBottom: '1px solid #4caf50' }}>
                                                    <li>
                                                        <strong>CHÍNH SÁCH BÁN HÀNG</strong>
                                                    </li>
                                                    <li>- FREE Ship HCM bán kính 10 Km</li>
                                                    <li>- Đổi trả hàng trong 7 ngày. Bảo hành 12 tháng.</li>
                                                </ul>
                                                <ul className="py-3 px-3">
                                                    <li>
                                                        <strong>CHÍNH SÁCH ĐỔI TRẢ</strong>
                                                    </li>
                                                    <li>- Đổi trả theo nhu cầu khách hàng</li>
                                                    <li>- Đổi trả theo yếu tố khách quan</li>
                                                    <li>- Hàng giao bị bể vỡ, sai nội dung hoặc bị thiếu</li>
                                                    <li>- Hàng giao bị lỗi kỹ thuật</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="row mb-4">
                    <ul className="nav nav-pills col-md-6 offset-md-5" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className="btn btn-outline-info rounded-pill ms-3 active"
                                href="#content1"
                                data-bs-toggle="pill"
                                role="tab"
                                aria-controls="content1"
                                aria-selected="true"
                            >
                                Description
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="btn btn-outline-info rounded-pill ms-3"
                                href="#content2"
                                data-bs-toggle="pill"
                                role="tab"
                                aria-controls="content2"
                                aria-selected="false"
                            >
                                Comment
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="btn btn-outline-info rounded-pill ms-3"
                                href="#content3"
                                data-bs-toggle="pill"
                                role="tab"
                                aria-controls="content3"
                                aria-selected="false"
                            >
                                Rating
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content px-4 py-2">
                    <div
                        id="content1"
                        className="tab-pane fade show active"
                        role="tabpanel"
                        aria-labelledby="content1-tab"
                    >
                        <div
                            // style={{
                            //     maxWidth: '450px ',
                            //     maxHeight: '1110px',
                            //     textOverflow: 'ellipsis',
                            //     wordWrap: 'break-word',
                            //     overflow: 'hidden',
                            // }}
                            className={cx('detail_description')}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        ></div>
                    </div>
                    <div id="content2" className="tab-pane fade" role="tabpanel" aria-labelledby="content2-tab">
                        Comment
                    </div>
                    <div id="content3" className="tab-pane fade" role="tabpanel" aria-labelledby="content3-tab">
                        Rating
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
