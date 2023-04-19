import classNames from 'classnames/bind';
import React, { useState } from 'react';
import LoaderModal from '~/components/Modal/LoaderModal/LoaderModal';

import styles from './Authen.module.scss';



const cx = classNames.bind(styles)

function AuthenLayout({ children }) {

    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
            {isLoading && <LoaderModal isLoading={isLoading} />}
            <div className={cx('wrapper')}>
                {React.cloneElement(children, { setIsLoading: setIsLoading })}
            </div>
        </>
    );
}

export default AuthenLayout;