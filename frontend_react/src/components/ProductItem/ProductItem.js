import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';
import { formatNumber } from '~/utils/stringUtils';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ProductItem({ data }) {

    return (<Link to={config.routes.detail + '/'+ data.id}>
        <div className={cx('wrapper')}>
            <img src={process.env.REACT_APP_IMG_URL + data.mainImage} className={cx('image')} alt="Product" />
            <div className={cx('info')}>
                <p className={cx('name')}>{data.name}</p>
                <span className={cx('price')}>{formatNumber(data.price)}₫</span>
            </div>
        </div>
    </Link>);
}

export default ProductItem;