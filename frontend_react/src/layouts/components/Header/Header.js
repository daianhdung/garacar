import { faAngleDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import images from '~/assets';
import config from '~/config';
import Search from '../../../components/Search/Search';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';
import CartModal from '~/components/Modal/CartModal/CartModal';
import useCart from '~/hooks/useCart';
import useViewport from '~/hooks/useViewport';
import { searchProduct } from '~/services/productService';
import constantObject from '~/utils/constant-var';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const location = useLocation();

    const [modalOpen, setModalOpen] = useState(false);

    const cartContext = useCart();
    const localItems = cartContext.items;

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    return (
        <>
            <div style={{ background: '#FFE880' }}>
                <div
                    className="container-fluid container container-sm"
                    style={isMobile ? { maxWidth: '100%' } : { maxWidth: '1300px', maxHeight: '40px' }}
                >
                    {isMobile ? (
                        <>
                            <div className="row">
                                <div className="nav-item col-6 offset-4">
                                    <a href="#" className={cx('text-success')}>
                                        <i className="bi bi-telephone-fill"></i> 0922 00 30 33
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="nav-item col-9 offset-3">
                                    <a href="#" className="text-success">
                                        <i className="bi bi-envelope"></i> sambuche@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="offset-3 col-8">
                                    {/* Facebook --> */}
                                    <Link
                                        to={config.routes.linkFB}
                                        target="_blank"
                                        type="button"
                                        className="text-primary mt-2 mx-3"
                                    >
                                        <i className="bi bi-facebook"></i>
                                    </Link>
                                    {/* Dribbble --> */}
                                    <Link
                                        to={config.routes.linkYT}
                                        target="_blank"
                                        type="button"
                                        className="text-danger mt-2 mx-3"
                                    >
                                        <i className="bi bi-youtube"></i>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-md-8 col-sm-8 col">
                                    <ul
                                        style={{ display: 'flex', justifyContent: 'flex-start' }}
                                        className="navbar text-dark"
                                    >
                                        <li className="nav-item">
                                            <a href="#" className={cx('text-success')}>
                                                <i className="bi bi-telephone-fill"></i> 0922 00 30 33
                                            </a>
                                        </li>
                                        <li className="ms-3 nav-item col">
                                            <a href="#" className="text-success">
                                                <i className="bi bi-envelope"></i> sambuche@gmail.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-4 col-sm-4 text-dark col">
                                    {/* Facebook --> */}
                                    <Link
                                        to={config.routes.linkFB}
                                        target="_blank"
                                        type="button"
                                        className="text-primary mt-2 mx-3"
                                    >
                                        <i className="bi bi-facebook"></i>
                                    </Link>
                                    {/* Dribbble --> */}
                                    <Link
                                        to={config.routes.linkYT}
                                        target="_blank"
                                        type="button"
                                        className="text-danger mt-2 mx-3"
                                    >
                                        <i className="bi bi-youtube"></i>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid container container-sm" style={{ maxWidth: '1300px' }}>
                    <Link to={config.routes.home} className="me-4">
                        <img style={{ objectFit: 'cover' }} width="120" height="55" src={images.logo} alt="" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <form className="d-flex search_input" role="search">
                            <Search service={searchProduct}/>
                        </form>
                        <ul style={{ display: 'flex', justifyContent: 'center' }} className="mx-5 navbar-nav">
                            <li className="nav-item navitem_hover">
                                <Link
                                    to={config.routes.home}
                                    className={cx(
                                        'nav-link',
                                        (location.pathname == config.routes.home ||
                                            location.pathname == config.routes.homePage) &&
                                            'active',
                                    )}
                                    aria-current="page"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link
                                    to={config.routes.product}
                                    className={cx('nav-link', location.pathname == config.routes.product && 'active')}
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Tippy
                                    interactive
                                    render={(attrs) => (
                                        <div className={cx('drop_down_wrap')}>
                                            <div className={cx('drop_down_content')} tabIndex="-1">
                                                <Link
                                                    to={config.routes.feature}
                                                    className={cx('block', 'border-bottom')}
                                                >
                                                    Sửa chữa
                                                </Link>
                                                <Link
                                                    to={config.routes.feature}
                                                    className={cx('block', 'border-bottom')}
                                                >
                                                    Lắp đặt
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Link to={config.routes.feature} className={cx('nav-link', location.pathname == config.routes.feature && 'active')}>
                                        Dịch vụ <FontAwesomeIcon style={{verticalAlign : '-0.2em'}} icon={faAngleDown} />
                                    </Link>
                                </Tippy>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link
                                    to={config.routes.contact}
                                    className={cx('nav-link', location.pathname == config.routes.contact && 'active')}
                                >
                                    Liên hệ
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link
                                    to={config.routes.news}
                                    className={cx('nav-link', location.pathname == config.routes.news && 'active')}
                                >
                                    Tin tức
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link onClick={() => setModalOpen(true)} className={cx('nav_link_logo', 'nav-link')}>
                                    <FontAwesomeIcon style={{ color: '#4caf50' }} icon={faCartShopping} />
                                    <span className={cx('logo_number', 'logo_number_orange')}>
                                        {localItems ? cartContext.getTotalQuantityCart() : 0}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {modalOpen && <CartModal closeModal={() => setModalOpen(false)} />}
        </>
    );
}

export default Header;
