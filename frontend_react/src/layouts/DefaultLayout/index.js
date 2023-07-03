import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import config from '~/config';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import React, { useEffect, useState } from 'react';
import useViewport from '~/hooks/useViewport';
import constantObject from '~/utils/constant-var';
import LoaderModal from '~/components/Modal/LoaderModal/LoaderModal';
import Chatbox from '~/components/Chatbox/Chatbox';
import images from '~/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as vitsitorService from '~/services/visitorService';
import * as thirdPartyService from '~/services/thirdApi';
import useScrollY from '~/hooks/useScrollY';

const cx = classNames.bind(styles);

const newVisitorKey = '$2a$10$rIGqLQIOCHWHh95Kvs4te.Q4drx4H5Nmunakg9MDL5zYA1IYhb2NG';

function DefaultLayout({ children }) {
    const location = useLocation();

    const [chatActive, setChatActive] = useState(false);

    const handleActive = () => {
        setChatActive(true);
    };

    const [canvasVisible, setCanvasVisible] = useState(false);

    const toggleCanvas = () => {
        setCanvasVisible(!canvasVisible);
    };

    const [isLoading, setIsLoading] = useState(false);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    useEffect(() => {
        if (isMobile) {
            window.scrollTo(0, 0);
        }
        checkIfNewVisitor();
        const handleBeforeUnload = () => {
            const ipVisitor = sessionStorage.getItem('ip');
            const visitorDTO = {
                ipAddress: ipVisitor,
            };
            vitsitorService.endVisitor(visitorDTO);
        };
        window.onbeforeunload = handleBeforeUnload;
        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    const checkIfNewVisitor = () => {
        const sessionStorageVisitor = sessionStorage.getItem('visitor');
        if (!sessionStorageVisitor || sessionStorageVisitor !== newVisitorKey) {
            const newVisitorFetch = async () => {
                const reponse = await thirdPartyService.getIpUser();
                sessionStorage.setItem('visitor', newVisitorKey);
                sessionStorage.setItem('ip', reponse.ipString);
                const visitorDTO = {
                    ipAddress: reponse.ipString,
                };
                const reponseVisitor = await vitsitorService.newVisitor(visitorDTO);
            };
            newVisitorFetch();
        }
    };

    const scrollY = useScrollY();

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            {isLoading && <LoaderModal isLoading={isLoading} />}
            <div className={cx('wrap_chat', !chatActive && 'hide')}>
                <Chatbox chatActive={chatActive} handleActive={handleActive} />
            </div>
            <div style={{ width: '80%' }} className={cx('chat-container')}>
                {chatActive ? (
                    <>
                        <div className="f-justify-end">
                            <div className={cx('contain_icon_chat')}>
                                <a href={config.routes.linkZalo} target="_blank">
                                    <img
                                        style={{ objectFit: 'cover' }}
                                        width={isMobile ? 40 : 70}
                                        height={isMobile ? 40 : 70}
                                        src={images.zaloLogo}
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className={cx('contain_icon_chat')}>Mess</div>
                            <div onClick={() => setChatActive(false)} className={cx('contain_icon_chat')}>
                                <FontAwesomeIcon
                                    style={{ fontSize: isMobile ? '20px' : '30px', color: 'white' }}
                                    icon={faXmark}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div onClick={() => setChatActive(true)} className={cx('contain_icon_chat')}>
                            <img
                                style={{ objectFit: 'cover' }}
                                width={isMobile ? 20 : 35}
                                height={isMobile ? 20 : 35}
                                src={images.chatIcon}
                                alt=""
                            />
                            <span className={cx('number_red_message')}>1</span>
                            <div className={cx('notifi_message')}>
                                <span>Bạn cần hỗ trợ ? Chat với chúng tôi ngay nhé!</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
                                                <i class={!canvasVisible ? 'bi bi-chevron-double-left' : 'bi bi-chevron-double-right'}></i>
                                            </button>
                                        </div>
                                        <Sidebar />
                                    </div>
                                    <div className={cx('content-mobile')}>
                                        {React.cloneElement(children, { setIsLoading: setIsLoading })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Sidebar />
                                    <div className={cx('content')}>
                                        {React.cloneElement(children, { setIsLoading: setIsLoading })}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <div style={{ maxWidth: '1300px' }} className="container-fluid">
                                <div className="py-4">
                                    {React.cloneElement(children, { setIsLoading: setIsLoading })}
                                </div>
                            </div>
                        </>
                    )}
                    <Footer />
                </div>
                <div
                    onClick={scrollToTop}
                    className={cx('scroll_top_btn', 'f-center-align', scrollY.scrollY > 500 && 'active')}
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
