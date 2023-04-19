import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import styles from './Search.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { faCircle, faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ProductItem from '~/components/ProductItem/ProductItem';
import { searchProduct } from '~/services/getProductService';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const debounceValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if(!debounceValue.trim()){
            setSearchResult([])
            return;
        }

        const fetchApiSearchProduct = async () => {
            setLoading(true);
            const response = await searchProduct(debounceValue)
            setSearchResult(response)
            setLoading(false);
        }
        

        fetchApiSearchProduct()
        
    }, [debounceValue])

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    const [over, setOver] = useState(false);

    return (<div>
        <Tippy interactive
            visible={showResult}
            render={(attrs) => (
                <div onClick={handleHideResult} className={cx('wrapper')}>
                    <div className={cx('search_result')} tabIndex="-1" {...attrs}>
                        {searchResult && searchResult.map((item) => (
                            <ProductItem key={item.id} data={item} />
                        ))}
                        {!searchValue && <h2 align='center'>Nhập vào kết quả tìm kiếm</h2>}
                        {!searchResult.length > 0 && searchValue && <h2 align='center'>Không tìm thấy kết quả tìm kiếm</h2>}
                    </div>
                    
                </div>
            )} onClickOutside={handleHideResult}>
            <div className={cx('search_form')}>
                <input ref={inputRef}    type="text" placeholder="Tìm kiếm sản phẩm..." value={searchValue} spellCheck={false} onChange={handleChange}
                    onFocus={() => setShowResult(true)} />

                {searchValue && !loading && (
                    <button onClick={handleClear} className={cx('clear_input')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button onMouseOver={() => setOver(true)}
                    onMouseLeave={() => setOver(false)} className={cx('btn-search')} >
                    <FontAwesomeIcon style={over ? { color: "black" } : {}} icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    </div>);
}

export default Search;