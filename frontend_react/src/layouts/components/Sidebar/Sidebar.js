import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './Sidebar.module.scss';
import { getAllBrand } from '~/services/brandService';
import { getAllCategory } from '~/services/categoryService';
import { Link, Route, useLocation } from 'react-router-dom';
import useFilter from '~/hooks/useFilter';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function Sidebar() {
    const filterContext = useFilter();
    const [allCategory, setAllCategory] = useState();
    const [allBrand, setAllBrand] = useState();

    const [keyword, setKeyword] = useState('');

    const debounceValue = useDebounce(keyword, 500);

    const onChangeKeyword = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setKeyword(searchValue);
        }
    };

    useEffect(() => {
        if (debounceValue) {
            if (!debounceValue.trim()) {
                setKeyword([]);
                return;
            }
        }

        filterContext.handleKeyword(debounceValue);
    }, [debounceValue]);

    useEffect(() => {
        const fetchApiGetFilterBar = async () => {
            const responseBrand = await getAllBrand();
            setAllBrand(responseBrand);
            const responseCategory = await getAllCategory();
            setAllCategory(responseCategory);
        };
        fetchApiGetFilterBar();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('first_wrapper')}>
                <div className={cx('filter_div')}>Name</div>
                <div className="d-flex align-content-start flex-wrap">
                    <div>
                        <input
                            value={keyword}
                            type="search"
                            placeholder="Search"
                            className="form-control me-2 search_input"
                            aria-label="Search"
                            onChange={onChangeKeyword}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('first_wrapper')}>
                <div className={cx('filter_div')}>Thương hiệu</div>
                <div className="d-flex align-content-start flex-wrap">
                    {allBrand &&
                        allBrand.map((item) => (
                            <div key={item.id}>
                                <input
                                    type="checkbox"
                                    id={`${item.id}-category`}
                                    checked={filterContext.filter.brandIds.includes(item.id)}
                                    onChange={() => filterContext.handleCheckBrand(item.id)}
                                    className="btn-check"
                                />
                                <label
                                    className="btn btn-outline-dark btn-sm my-1 mx-1"
                                    htmlFor={`${item.id}-category`}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
            <div className={cx('first_wrapper')}>
                <div className={cx('filter_div')}>Thể loại</div>
                <div className="d-flex align-content-start flex-wrap">
                    {allCategory &&
                        allCategory.map((item) => (
                            <div key={item.id}>
                                <input
                                    type="checkbox"
                                    id={`${item.id}-brand`}
                                    checked={filterContext.filter.categoryIds.includes(item.id)}
                                    onChange={() => filterContext.handleCheckCategory(item.id)}
                                    className="btn-check"
                                />
                                <label className="btn btn-outline-dark btn-sm my-1 mx-1" htmlFor={`${item.id}-brand`}>
                                    {item.name}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
