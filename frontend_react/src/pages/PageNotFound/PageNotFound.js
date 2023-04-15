import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';


import styles from './PageNotFound.module.scss';

const cx = classNames.bind(styles);

function PageNotFound() {
    // const contextAuth = useAuth()

    return (<section id={cx('wrapper')} className={cx('error-page')}>
        <div className={cx('error-box')} style={{ background: `url(${process.env.PUBLIC_URL}/image/error-bg.jpg) center center no-repeat #fff!important` }}>
            <div className="error-body text-center">
                <h1 className={cx('not-found')}>404</h1>
                <h3 className={cx('h3')}>Trang bạn tìm kiếm không tồn tại !</h3>
                <p className="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
                {/* {contextAuth.authProvider.isAdmin ?
                    <Link to={config.routes.adminHome} id={cx('hover_button')} className="p-3 fs-3 btn btn-info btn-rounded waves-effect waves-light m-b-40">Về trang admin</Link> :
                    <Link to={config.routes.home} id={cx('hover_button')} className="p-3 fs-3 btn btn-info btn-rounded waves-effect waves-light m-b-40">Về trang chủ</Link>} */}
            </div>
        </div>
    </section>);
}

export default PageNotFound;