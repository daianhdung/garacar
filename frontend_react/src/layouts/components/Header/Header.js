import { Link } from 'react-router-dom';
import images from '~/assets';
import config from '~/config';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';

const cx = classNames.bind(styles);

function Header() {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            <div style={{ background: '#FFE880' }}>
                <div
                    className="container-fluid container container-sm"
                    style={isMobile ? {maxWidth: '100%'} : { maxWidth: '1300px', maxHeight: '40px' }}
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
                            <Search />
                        </form>
                        <ul style={{ display: 'flex', justifyContent: 'center' }} className="mx-5 navbar-nav">
                            <li className="nav-item navitem_hover">
                                <Link to={config.routes.home} className="nav-link" aria-current="page">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link to={config.routes.product} className="nav-link">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <a className="nav-link">Dịch vụ</a>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link to={config.routes.contact} className="nav-link">
                                    Liên hệ
                                </Link>
                            </li>
                            <li className="nav-item navitem_hover">
                                <Link className="nav-link">
                                    <FontAwesomeIcon style={{ color: '#4caf50' }} icon={faCartShopping} />
                                </Link>
                                {/* <span className={cx('logo_number', 'logo_number_orange')}>{localItems ? cartContext.getTotalQuantityCart() : 0}</span> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
