import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';


const cx = classNames.bind(styles)


function DefaultLayout() {

    return (
        <>
            {/* {isLoading && <LoaderModal isLoading={isLoading} />}
            <div >
                <Header />
                <div style={{ background: 'rgba(245, 245, 250, 1)' }} >
                    <div className={cx('container')}>
                        {(location.pathname == config.routes.product || location.pathname == config.routes.bookmark || location.pathname === '/search/' && location.search) ? <div className={cx('inner')}>
                            <Sidebar1 />
                            <div className={cx('content')}>
                                {React.cloneElement(children, { setIsLoading: setIsLoading })}
                                <Footer />
                            </div>
                        </div> : <div className={cx('inner_non_sideber')}>
                            <div className={cx('content_non_sideber')}>
                                {React.cloneElement(children, { setIsLoading: setIsLoading })}
                                <Footer />
                            </div>
                        </div>}
                    </div>
                </div>
            </div> */}
            <h1>Default</h1>
        </>
    );
}

export default DefaultLayout;
