import classNames from 'classnames/bind';
import styles from './News.module.scss';
import useViewport from '~/hooks/useViewport';
import React, { useEffect, useState } from 'react';
import config from '~/config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShoesThumb from '~/components/swiper/SlideThumb/ShoesThumb';
import Paging from '~/components/Paging/Paging';
import constantObject from '~/utils/constant-var';

const cx = classNames.bind(styles);

const currentPage = [
    {
        page: 1,
        data: [],
    },
];

function News() {
    const [dataSwiper, setDataSwiper] = useState([]);
    const [dataColumn, setDataColumn] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);

    const [dataCurrentPage, setDataCurrentPage] = useState({ currentPage: 1, totalPage: '' });

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    useEffect(() => {
        if (isMobile) {
            window.scrollTo(0, 0);
        }
        const fetchExpressvn = () => {
            axios
                .get(
                    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Foto-xe-may.rss&api_key=mpki39ctzknhmlig7m7fgo9jmgqs72k0zohjtwl3&count=100',
                    {
                        'Content-Type': 'application/xml; charset=utf8',
                    },
                )
                .then(function (response) {
                    const array = response.data.items.map((item) => {
                        const regex = /(<a[^>]+>)([\s\S]*?)(<\/a>)(.+)/;
                        const matches = item.content.match(regex);
                        if (matches) {
                            const imgTag = matches[2]; // Nội dung bên trong thẻ <a>
                            const remainText = matches[4]; // Phần còn lại sau thẻ <a>
                            return {
                                ...item,
                                imgTag,
                                remainText,
                            };
                        } else {
                            return null; // Nếu không tìm thấy phần tử <a> trong chuỗi
                        }
                    });
                    setDataSwiper(array.slice(0, 11));
                    setDataColumn(array.slice(11, 19));
                    setDataPagination([
                        {
                            page: 1,
                            data: array.slice(19, 29),
                        },
                        {
                            page: 2,
                            data: array.slice(29, 39),
                        },
                        {
                            page: 3,
                            data: array.slice(39, 49),
                        },
                        {
                            page: 4,
                            data: array.slice(49, -1),
                        },
                    ]);
                    setDataCurrentPage({ ...dataCurrentPage, totalPage: 4, data: array.slice(18, 28) });
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchExpressvn();
    }, []);

    useEffect(() => {
        isMobile ? window.scrollTo(0, 780) : window.scrollTo(0, 830);
    }, [dataCurrentPage.currentPage]);

    const handleCurrentPage = (page) => {
        setDataCurrentPage({
            ...dataCurrentPage,
            currentPage: dataPagination[page - 1].page,
            data: dataPagination[page - 1].data,
        });
    };

    const handleNextPage = () => {
        if (dataCurrentPage.currentPage < 4) {
            setDataCurrentPage({ ...dataCurrentPage, data: dataPagination[dataCurrentPage.data.page + 1].data });
        }
    };

    const handlePrevPage = () => {
        if (dataCurrentPage.currentPage > 1) {
            setDataCurrentPage({ ...dataCurrentPage, data: dataPagination[dataCurrentPage.data.page - 1].data });
        }
    };

    return (
        <>
            <div>
                <div className={cx('mid-detail')}>
                    <div className='f-center-align'>
                        <div className={cx('left-detail', 'p-2')}>
                            <ShoesThumb news={dataSwiper} />
                            <div className={cx('pagination_section')}>
                                {dataCurrentPage.data &&
                                    dataCurrentPage.data.map((item) => (
                                        <Link
                                            key={item.title}
                                            to={item.link}
                                            target="_blank"
                                            className={cx('new_wrapper', 'f-center-align')}
                                        >
                                            {isMobile ? (
                                                <>
                                                    <div className={cx('title_wrap')}>
                                                        <h4
                                                            className="fw-bold"
                                                            dangerouslySetInnerHTML={{ __html: item.title }}
                                                        ></h4>
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: item.remainText }}
                                                        ></div>
                                                    </div>
                                                    <div className={cx('wrap_img')} dangerouslySetInnerHTML={{ __html: item.imgTag }}></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div dangerouslySetInnerHTML={{ __html: item.imgTag }}></div>
                                                    <div className={cx('title_wrap')}>
                                                        <h4
                                                            className="fw-bold"
                                                            dangerouslySetInnerHTML={{ __html: item.title }}
                                                        ></h4>
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: item.remainText }}
                                                        ></div>
                                                    </div>
                                                </>
                                            )}
                                        </Link>
                                    ))}
                                {dataPagination && (
                                    <div className="row">
                                        <div
                                            className={`${
                                                isMobile
                                                    ? `mt-3 col-md-2 offset-2 col-2`
                                                    : `offset-md-5 col-md-3 offset-2 col-5`
                                            }`}
                                        >
                                            <Paging
                                                currentPage={dataCurrentPage.currentPage}
                                                totalPage={dataCurrentPage.totalPage}
                                                handleSetCurrentPage={handleCurrentPage}
                                                handleNext={handleNextPage}
                                                handlePrev={handlePrevPage}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {!isMobile && (
                        <div className={cx('right-detail')}>
                            <div>
                                {dataColumn &&
                                    dataColumn.map((item) => (
                                        <div className="mb-4">
                                            <a
                                                className={cx('wrap_link')}
                                                key={item.title}
                                                href={item.link}
                                                target="_blank"
                                            >
                                                <div className={cx('news-thumb-wrapper')}>
                                                    <div dangerouslySetInnerHTML={{ __html: item.imgTag }}></div>
                                                </div>
                                                <div>
                                                    <h6
                                                        className="fw-bold"
                                                        dangerouslySetInnerHTML={{ __html: item.title }}
                                                    ></h6>
                                                    <div dangerouslySetInnerHTML={{ __html: item.remainText }}></div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default News;
