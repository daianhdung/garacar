import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';

import Tippy from '@tippyjs/react/headless';
import config from '~/config';
import Search from '~/layouts/components/Search/Search';
import styles from './HeaderAdmin.module.scss';
import useAuth from '~/hooks/useAuth';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';

const cx = classNames.bind(styles);

function HeaderAdmin(props) {
    const context = useAuth();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            {isMobile ? (
                <>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container container-sm">
                            <Link to={config.routes.adminHome}>
                                <span style={{ color: '#fff' }}>DASH BOARD</span>
                            </Link>
                            <span className="text-white">
                                Hi, {context.authProvider.username}
                            </span>
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
                            <div className="collapse navbar-collapse mt-3 bg-white rounded" id="navbarScroll">
                                <form className="d-flex search_input" role="search">
                                    <Search />
                                </form>
                                <ul
                                    className={cx('mx-5', 'navbar-nav', 'drop_down_content')}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <li className="">
                                        <Link className="nav-link" to={config.routes.adminProfile}>
                                            Sửa thông tin
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link className="nav-link" to={config.routes.adminChangePassword}>
                                            Đổi mật khẩu
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link onClick={context.logout} className="nav-link" to={config.routes.home}>
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
            ) : (
                <div className={cx('wrapper', 'f-spaceb-align')}>
                    <Link to={config.routes.adminHome}>
                        <h3 style={{ color: '#fff' }}>DASH BOARD</h3>
                    </Link>
                    <div className={cx('f-spaceb-align', 'right_header')}>
                        <Search />
                        <div className={cx('f-center-align')}>
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('drop_down_wrap')}>
                                        <div className={cx('drop_down_content')} tabIndex="-1">
                                            <NavLink to={config.routes.adminProfile} className={cx('block')}>
                                                Sửa thông tin
                                            </NavLink>
                                            <NavLink to={config.routes.adminChangePassword} className={cx('block')}>
                                                Đổi mật khẩu
                                            </NavLink>
                                            <NavLink
                                                onClick={context.logout}
                                                to={config.routes.home}
                                                className={cx('block')}
                                            >
                                                Đăng xuất
                                            </NavLink>
                                        </div>
                                    </div>
                                )}
                            >
                                <span className="f-center-align">
                                    <span style={{ minWidth: '150px' }} className="ms-5">
                                        Hi, {context.authProvider.username}
                                    </span>
                                    <div className={cx('avatar', 'f-center-align', 'ms-3')}>
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'} />
                                    </div>
                                </span>
                            </Tippy>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HeaderAdmin;
