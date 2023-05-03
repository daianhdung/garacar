import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import images from '~/assets';
import { Link } from 'react-router-dom';
import useFilter from '~/hooks/useFilter';
import * as productService from '~/services/productService';
import { getCookie } from '~/utils/utilsCookie';
import Sort from '~/components/Sort/sort';
import List from '~/components/List/List';
import Paging from '~/components/Paging/Paging';

import styles from './Product.module.scss';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';

const cx = classNames.bind(styles);

function Product() {
    const filterContext = useFilter();
    const [page, SetPage] = useState({ currentPage: 1 });
    const [sort, SetSort] = useState(filterContext.sortType ? filterContext.sortType : '');
    const [products, SetProducts] = useState();

    const handleNext = () => {
        if (page.currentPage < page.totalPage) {
            filterContext.handleNextPage();
        }
    };
    const handlePrev = () => {
        if (page.currentPage > 1) {
            filterContext.handlePrevPage();
        }
    };
    const handleSetCurrentPage = (page) => {
        filterContext.handleCurrentPage(page);
    };

    useEffect(() => {
        // setIsLoading(true);
        window.scrollTo(0, 140);

        const fetchApiProductFilter = async () => {
            const responseProduct = await productService.getAllProductFilter(filterContext.filter);
            SetProducts(responseProduct.productDTOList);
            SetPage({ ...page, totalPage: responseProduct.totalPage, currentPage: responseProduct.currentPage });
        };
        fetchApiProductFilter();
    }, [filterContext.filter]);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            <div id="wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Sort value={filterContext.filter.sortType} handleSort={(e) => filterContext.handleSort(e)} />

                        <div
                            className={`${isMobile ? '' : 'p-3'} mt-3`}
                            style={{ width: '100%', background: 'rgba(235, 237, 239, 1)' }}
                        >
                            <div style={isMobile ? { padding: 0 } : {}} className={cx('wrapper_product')}>
                                {products && products.length !== 0 && <List products={products} />}
                                <div className="row d-flex">
                                    <div className="col-md-2">
                                        {products && products.length !== 0 && (
                                            <Paging
                                                currentPage={page.currentPage}
                                                totalPage={page.totalPage}
                                                handleNext={handleNext}
                                                handlePrev={handlePrev}
                                                handleSetCurrentPage={handleSetCurrentPage}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {products && products.length === 0 && (
                            <div className=" justify-content-center bg-white p-5 rounded">
                                <h2>Sản phẩm bạn tìm kiếm hiện tại hết hàng</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
