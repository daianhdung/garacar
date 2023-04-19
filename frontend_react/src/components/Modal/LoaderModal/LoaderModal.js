import { Puff } from "react-loader-spinner";
import classNames from 'classnames/bind';

import styles from './LoaderModal.module.scss';

const cx = classNames.bind(styles);

function LoaderModal( {isLoading} ) {


    return ( <>
        <div className={cx('wrapper')} >
            <Puff className={cx('icon')}  height={50} width={50} color="#0dcaf0" ariaLabel="Loading"/>
        </div>
    </> );
}

export default LoaderModal;




