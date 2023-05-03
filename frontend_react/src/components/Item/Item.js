import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { formatNumber } from '~/utils/stringUtils';
import { getCookie } from '~/utils/utilsCookie';
import styles from './Item.module.scss';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';
// import * as bookmarkService from '~/service/bookmarkService';

const cx = classNames.bind(styles);

function Item({ product }) {
    // const [bookmark, SetBookmark] = useState(product.bookmark)
    // const navigate = useNavigate();
    // const handleBookmark = () => {
    //     const token = getCookie('tokenJwt')
    //     if (token == null) {
    //         // login page

    //     }
    //     else if (!bookmark) {

    //         bookmarkService.insertBookmark(product.id, getCookie('tokenJwt'))
    //             .then(response => {
    //                 if (response.success) {

    //                     SetBookmark(true)

    //                 }
    //             })
    //     } else {
    //         bookmarkService.deleteBookmark(product.id, getCookie('tokenJwt'))
    //         .then(response => {
    //             if (!response.success) {

    //                 SetBookmark(false)
    //             }
    //         })
    //     }
    // }

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            <div className={cx(isMobile ? 'card-mobile' : 'card')}>
                <Link to={`${config.routes.detail}/${product.id}`}>
                    <div className={cx('card-img')}>
                        <img src={product.mainImage} />
                    </div>
                    <div className={cx('card-title')} style={isMobile ? {minHeight: 25, fontSize: '15px', maxHeight: '25px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'} : {minHeight: 65, fontSize: '18px'}}>
                        <span>{product.name}</span>
                    </div>
                    <div className={cx('card-price', 'p-1', 'fw-bold')}
                    style={isMobile ? {minHeight: 45, fontSize: '15px'} : {minHeight: 65, fontSize: '18px'}}>
                        <span>{formatNumber(product.price)}₫</span>
                    </div>
                </Link>
            </div>
        </>
    );
}
export default Item;
