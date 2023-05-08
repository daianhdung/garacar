import {
    faAngleDown,
    faAngleUp,
    faBagShopping,
    faBox,
    faFileCircleCheck,
    faHome,
    faKeyboard,
    faList,
    faRightFromBracket,
    faUser,
    faUsers,
    faTicket,
    faStar,
    faGift,
    faMailBulk,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import styles from './SidebarAdmin.module.scss';
import config from '~/config';

import SubMenu from '~/components/SubMenu/SubMenu';
import { useState } from 'react';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const SidebarData = [
    {
        title: 'Đơn hàng',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-warning')} icon={faFileCircleCheck} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminOrder,
                icon: <FontAwesomeIcon icon={faList} />,
            },
        ],
    },
    {
        title: 'Tài khoản',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-danger')} icon={faUsers} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminUser,
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                title: 'Tạo mới',
                path: config.routes.adminUserInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />,
            },
        ],
    },
    {
        title: 'Sản phẩm',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-info')} icon={faBagShopping} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminProduct,
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                title: 'Tạo mới',
                path: config.routes.adminProductInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />,
            },
        ],
    },
    {
        title: 'Coupon',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-info')} icon={faTicket} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminCoupon,
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                title: 'Tạo mới',
                path: config.routes.adminCouponInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />,
            },
        ],
    },
    {
        title: 'Thể loại',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-info')} icon={faGift} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminCategory,
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                title: 'Tạo mới',
                path: config.routes.adminCategoryInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />,
            },
        ],
    },
    {
        title: 'Thương hiệu',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-info')} icon={faStar} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminBrand,
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                title: 'Tạo mới',
                path: config.routes.adminBrandInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />,
            },
        ],
    },
    {
        title: 'Mail',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-info')} icon={faEnvelope} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'Danh sách',
                path: config.routes.adminMail,
                icon: <FontAwesomeIcon icon={faList} />,
            },
        ],
    },
];

function SidebarAdmin(props) {
    const location = useLocation();
    const context = useAuth();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            <div className={cx('wrapper')}>
                <Link to={config.routes.adminHome}>
                    <div className={cx('logo_wrap', 'f-center-align')}>
                        {isMobile ? (
                            <img width={40} height={40} src={process.env.PUBLIC_URL + '/logo192.png'} />
                        ) : (
                            <img width={80} height={80} src={process.env.PUBLIC_URL + '/logo192.png'} />
                        )}

                        <h1 className="fw-bold" style={{ color: '#11cdef' }}>
                            ADMIN
                        </h1>
                    </div>
                </Link>
                <div className={cx('nav_wrap')}>
                    <ul>
                        <Link to={config.routes.home}>
                            <li className={cx(location.pathname == config.routes.adminHome ? 'redirect' : '')}>
                                <FontAwesomeIcon className={cx('redirect_icon', 'text-primary')} icon={faHome} />
                                <span>Trang chủ chính</span>
                            </li>
                        </Link>
                        {SidebarData.map((item, index) => (
                            <SubMenu item={item} key={index} />
                        ))}
                        <Link>
                            <li>
                                <FontAwesomeIcon className={cx('redirect_icon', 'text-success')} icon={faBox} />
                                <span>Kho</span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <hr></hr>
                <div className={cx('auth_wrap')}>
                    <ul>
                        <Link to={config.routes.adminProfile}>
                            <li>
                                <FontAwesomeIcon className={cx('redirect_icon', 'text-muted')} icon={faUser} />
                                <span>Tài khoản</span>
                            </li>
                        </Link>
                        <Link to={config.routes.home}>
                            <li onClick={context.logout}>
                                <FontAwesomeIcon
                                    className={cx('redirect_icon', 'text-danger')}
                                    icon={faRightFromBracket}
                                />
                                <span>Đăng xuất</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SidebarAdmin;
