import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './SubMenu.module.scss';

const cx = classNames.bind(styles)

function SubMenu({ item }) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const location = useLocation()

    return (<>
        <Link onClick={item.subNav && showSubnav}>
            <li className={cx(location.pathname.startsWith(item.path) ? 'redirect' : '', 'sub-li')}>
                {item.icon}
                <span>{item.title}</span>
                {item.subNav && subnav
                    ? item.iconOpened
                    : item.subNav
                        ? item.iconClosed
                        : null}

            </li>
        </Link>
        {subnav && item.subNav.map((item, index) => (
            <Link to={item.path} key={index}>
                <li className={cx('sub_nav')}>
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            </Link>
        ))}
    </>);
}

export default SubMenu;