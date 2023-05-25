import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import config from '~/config';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import React, { useState } from 'react';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';
import LoaderModal from '~/components/Modal/LoaderModal/LoaderModal';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const location = useLocation();

    const [canvasVisible, setCanvasVisible] = useState(false);

    const toggleCanvas = () => {
        setCanvasVisible(!canvasVisible);
    };

    const [isLoading, setIsLoading] = useState(false);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            {isLoading && <LoaderModal isLoading={isLoading} />}
            <div>
                <Header />
                <div style={{ background: '#f5f5fa' }}>
                    {location.pathname == config.routes.product ? (
                        <div style={{ maxWidth: '1500px' }} className={cx('container-fluid', 'py-4')}>
                            {isMobile ? (
                                <>
                                    <div className={cx('sidebar-mobile', canvasVisible ? 'toggler-sidebar' : '')}>
                                        <div className={cx('button-hide')} onClick={toggleCanvas}>
                                            <button className="btn btn-outline-info">
                                                <i class="bi bi-chevron-double-left"></i>
                                            </button>
                                        </div>
                                        <Sidebar />
                                    </div>
                                    <div className={cx('content-mobile')}>{React.cloneElement(children, { setIsLoading: setIsLoading })}</div>
                                </>
                            ) : (
                                <>
                                    <Sidebar />
                                    <div className={cx('content')}>{React.cloneElement(children, { setIsLoading: setIsLoading })}</div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <div style={{ maxWidth: '1300px' }} className="container-fluid">
                                <div className="py-4">{React.cloneElement(children, { setIsLoading: setIsLoading })}</div>
                            </div>
                        </>
                    )}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
