import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './FeaturePage.module.scss';
import useAuth from '~/hooks/useAuth';
import useViewport from '~/hooks/useViewport';
import constantObject from '~/utils/constant-var';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function FeaturePage() {
    const contextAuth = useAuth();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    useEffect(() => {
        if (isMobile) {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <section id={cx('wrapper')} className={cx('error-page')}>
            <div
                className={cx('error-box')}
                style={{
                    background: `url(${process.env.PUBLIC_URL}/image/error-bg.jpg) center center no-repeat #fff!important`,
                }}
            >
                <div className="error-body text-center">
                    <h3 className={cx('h3')}>Tính năng đang phát triển, quý khách vui lòng quay lại sau</h3>
                    <p className="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
                    {contextAuth.authProvider.isAdmin ? (
                        <Link
                            to={config.routes.adminHome}
                            id={cx('hover_button')}
                            className="p-3 fs-3 btn btn-info btn-rounded waves-effect waves-light m-b-40"
                        >
                            Về trang admin
                        </Link>
                    ) : (
                        <Link
                            to={config.routes.home}
                            id={cx('hover_button')}
                            className="p-3 fs-3 btn btn-info btn-rounded waves-effect waves-light m-b-40"
                        >
                            Về trang chủ
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default FeaturePage;
