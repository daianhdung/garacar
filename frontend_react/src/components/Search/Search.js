import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from '~/components/ProductItem/ProductItem';
import config from '~/config';
import useDebounce from '~/hooks/useDebounce';
import useViewport from '~/hooks/useViewport';
import constantObject from '~/utils/constant-var';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search(prop) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApiSearchProduct = async () => {
            setLoading(true);
            const response = await prop.service(debounceValue);
            setSearchResult(response);
            setLoading(false);
        };
        fetchApiSearchProduct();
    }, [debounceValue]);

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

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    return (
        <div className="w-100">
            <Tippy
                maxWidth={'450px'}
                placement="bottom"
                interactive
                visible={showResult}
                render={(attrs) => (
                    <div onClick={handleHideResult} className={cx('wrapper')}>
                        <div className={cx('search_result')} tabIndex="-1" {...attrs}>
                            {searchResult && searchResult.map((item) => <ProductItem key={item.id} data={item} />)}
                            {!searchValue ? (
                                <h5 align="center">Nhập vào kết quả tìm kiếm</h5>
                            ) : loading ? (
                                <h5 align="center">Tìm kiếm kết quả ....</h5>
                            ) : searchResult.length > 0 ? (
                                ''
                            ) : (
                                <h5 align="center">Không có sản phẩm</h5>
                            )}
                        </div>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search_form')}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchValue}
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {searchValue && !loading && (
                        <button onClick={handleClear} className={cx('clear_input')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <Link to={config.routes.product}>
                        <button
                            type="button"
                            onMouseOver={() => setOver(true)}
                            onMouseLeave={() => setOver(false)}
                            className={cx('btn-search')}
                        >
                            <FontAwesomeIcon style={over ? { color: 'black' } : {}} icon={faMagnifyingGlass} />
                        </button>
                    </Link>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
