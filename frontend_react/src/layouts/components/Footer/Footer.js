import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';

const cx = classNames.bind(styles);

function Footer() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [clockSubscription, setClockSubscription] = useState();

    useEffect(() => {
        const clock = interval(1000).pipe(map(() => new Date()));
        const subscription = clock.subscribe((currentTime) => {
            setTime(currentTime.toLocaleTimeString());
            const dateObject = new Date(currentTime.toLocaleDateString());
            const formattedDate = dateObject.toLocaleDateString('en-GB');
            setDate(formattedDate);
        });
        setClockSubscription(subscription);
        return () => subscription.unsubscribe();
    }, []);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            <footer style={{ background: '#23242a' }}>
                <div className="container mt-5" style={{ marginBottom: '29px' }}>
                    <footer className="text-white text-center text-lg-start">
                        {/* Grid container --> */}
                        <div className="container p-4">
                            {/* Grid row--> */}
                            <div className="row mt-4">
                                {/* Grid column--> */}
                                <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                                    <h5 className="text-uppercase mb-4">Về chúng tôi</h5>

                                    <p>
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                                        praesentium voluptatum deleniti atque corrupti.
                                    </p>

                                    <p>
                                        Blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas
                                        molestias.
                                    </p>

                                    <div className="mt-4">
                                        {/* Facebook --> */}
                                        <a type="button" className="btn btn-floating btn-warning me-2">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                        {/* Dribbble --> */}
                                        <a type="button" className="btn btn-floating btn-warning me-2">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                        {/* Twitter --> */}
                                        <a type="button" className="btn btn-floating btn-warning me-2">
                                            <i className="bi bi-twitter"></i>
                                        </a>
                                        {/* Google + --> */}
                                        <a type="button" className="btn btn-floating btn-warning me-2">
                                            <i className="bi bi-google"></i>
                                        </a>
                                        {/* Linkedin --> */}
                                    </div>
                                </div>
                                {/* Grid column--> */}

                                {/* Grid column--> */}
                                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase mb-4 pb-1">Địa chỉ</h5>

                                    <ul className="fa-ul" style={{ marginLeft: '1.65em' }}>
                                        <li className="mb-3">
                                            <span className="fa-li">
                                                <i className="fas fa-home"></i>
                                            </span>
                                            <span className="ms-2">
                                                199 Đ. Gò Dưa, Bình Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
                                            </span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fa-li">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                            <span className="ms-2">sambuche@gmail.com</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fa-li">
                                                <i className="fas fa-phone"></i>
                                            </span>
                                            <span className="ms-2">+ 0922 00 30 33</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* Grid column--> */}

                                {/* Grid column--> */}
                                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase mb-4">Thời gian mở cửa</h5>

                                    <table className="table text-center text-white">
                                        <tbody className="font-weight-normal">
                                            <tr>
                                                <td>Mon - Thu:</td>
                                                <td>8am - 9pm</td>
                                            </tr>
                                            <tr>
                                                <td>Fri - Sat:</td>
                                                <td>8am - 1am</td>
                                            </tr>
                                            <tr>
                                                <td>Sunday:</td>
                                                <td>9am - 10pm</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Grid column--> */}
                            </div>
                            {/* Grid row--> */}
                        </div>
                        {/* Grid container --> */}
                    </footer>
                </div>
                <span>
                    <div style={{ zIndex: '999' }} className={cx('scroll-text-container')}>
                        <p className={cx('scroll-text')}>
                            {isMobile ? '' : `Ngày giờ hiện tại: ${time} ${date} `}
                            Đia chỉ: 199 Đ. Gò Dưa,
                            Tam Bình, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
                        </p>
                    </div>
                </span>
            </footer>
        </>
    );
}

export default Footer;
