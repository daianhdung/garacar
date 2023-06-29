import { useState } from 'react';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import { createMail } from '~/services/mailService';
import useViewport from '~/hooks/useViewport';
import constantObject from '~/utils/constant-var';

const cx = classNames.bind(styles);

function Contact() {
    const [mail, setMail] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});

    const [success, setSuccesss] = useState('');

    const onSubmitMail = () => {
        let newErrors = {};
        if (!mail.firstName) {
            newErrors.fullName = 'Họ tên bắt buộc';
        } else if (!mail.lastName) {
            newErrors.fullName = 'Họ tên bắt buộc';
        }
        if (!mail.email) {
            newErrors.email = 'Email bắt buộc';
        }
        if (!mail.phone) {
            newErrors.phone = 'Điện thoại bắt buộc';
        }
        if (!mail.message) {
            newErrors.message = 'Tin nhắn bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setMail({ ...mail, fullName: mail.firstName + ' ' + mail.lastName });
            const fetchApiCreateMail = async () => {
                const response = await createMail(mail);
                setSuccesss(true);
            };
            fetchApiCreateMail();
        }
    };

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    return (
        <>
            <div className={cx('container-contact', 'rounded', isMobile ? 'p-2' : 'p-5')}>
                {!success ? (
                    <div className={cx('wrap-contact')}>
                        <form className={cx('contact-form', 'validate-form')}>
                            <span className={cx('contact100-form-title')}> Liên hệ với chúng tôi </span>
                            <label className={cx('label-input100')} htmlFor="first-name">
                                Nhập vào tên của bạn *
                            </label>
                            <div className={cx('wrap-input100', 'rs1-wrap-input100', 'validate-input')}>
                                <input
                                    id="first-name"
                                    className={cx('input100')}
                                    type="text"
                                    name="first-name"
                                    placeholder="First name"
                                    onChange={(e) => setMail({ ...mail, firstName: e.target.value })}
                                />
                            </div>
                            <div className={cx('wrap-input100', 'rs1-wrap-input100', 'validate-input')}>
                                <input
                                    className={cx('input100')}
                                    type="text"
                                    name="last-name"
                                    placeholder="Last name"
                                    onChange={(e) => setMail({ ...mail, lastName: e.target.value })}
                                />
                            </div>
                            {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
                            <label className={cx('label-input100')} htmlFor="email">
                                Nhập vào email *
                            </label>
                            <div className={cx('wrap-input100', 'validate-input')}>
                                <input
                                    required
                                    id="email"
                                    className={cx('input100')}
                                    type="email"
                                    name="email"
                                    placeholder="Eg. example@email.com"
                                    onChange={(e) => setMail({ ...mail, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                            <label className={cx('label-input100')} htmlFor="phone">
                                Nhập vào số điện thoại *
                            </label>
                            <div className={cx('wrap-input100')}>
                                <input
                                    id="phone"
                                    className={cx('input100')}
                                    type="text"
                                    name="phone"
                                    placeholder="Eg. +1 800 000000"
                                    onChange={(e) => setMail({ ...mail, phone: e.target.value })}
                                />
                            </div>
                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                            <label className={cx('label-input100')} htmlFor="message">
                                Tin nhắn *
                            </label>
                            <div className={cx('wrap-input100', 'validate-input')}>
                                <textarea
                                    required=""
                                    id="message"
                                    className={cx('input100')}
                                    name="message"
                                    placeholder="Write us a message"
                                    onChange={(e) => setMail({ ...mail, message: e.target.value })}
                                ></textarea>
                            </div>
                            {errors.message && <span className="text-danger">{errors.message}</span>}
                            <div className={cx('container-contact100-form-btn')}>
                                <button onClick={onSubmitMail} type="button" className={cx('contact100-form-btn')}>
                                    Gửi tin nhắn
                                </button>
                            </div>
                        </form>

                        {/* Contact */}
                        <div className={cx('left_contact', 'flex-col-c-m')}>
                            <div className={`w-100 ${isMobile ? 'px-2' : 'px-5'} pt-5`}>
                                <div
                                    className={cx('contact-more')}
                                    style={{
                                        backgroundImage:
                                            'url(https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80)',
                                    }}
                                >
                                    <div className={cx('dis-flex', 'size1', 'p-b-47')}>
                                        <div className={cx('txt1', 'p-r-25')}>
                                            <span className={cx('lnr', 'bi bi-geo-alt', 'text-info', 'fs-3')}></span>
                                        </div>
                                        <div className={cx('flex-col', 'size2')}>
                                            <span className={cx('txt1', 'p-b-20')}> Address </span>
                                            <span className={cx('txt2')}>
                                                199 Đường Gò Dưa, Tam Bình, Thủ Đức, Thành phố Hồ Chí Minh
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('dis-flex', 'size1', 'p-b-47')}>
                                        <div className={cx('txt1', 'p-r-25')}>
                                            <span
                                                className={cx('lnr', 'bi bi-telephone-fill', 'text-info', 'fs-3')}
                                            ></span>
                                        </div>
                                        <div className={cx('flex-col', 'size2')}>
                                            <span className={cx('txt1', 'p-b-20')}> Liên hệ </span>
                                            <span className={cx('txt3')}> + 0922 00 30 33 </span>
                                        </div>
                                    </div>
                                    <div className={cx('dis-flex', 'size1', 'p-b-47')}>
                                        <div className={cx('txt1', 'p-r-25')}>
                                            <span className={cx('lnr', 'bi bi-envelope', 'text-info', 'fs-3')}></span>
                                        </div>
                                        <div className={cx('flex-col', 'size2')}>
                                            <span className={cx('txt1', 'p-b-20')}> Hỗ trợ </span>
                                            <span className={cx('txt3')}> sambuche@gmail.com </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${isMobile ? 'mb-3' : 'p-5'}`}>
                                <iframe
                                    src={
                                        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2179568337347!2d106.73837157475312!3d10.871020389283537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175271257199eed%3A0x928fbd5a62d81bf6!2zWEFOSCBBdXRvIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1682592821807!5m2!1svi!2s'
                                    }
                                    width={isMobile ? '100%' : 500}
                                    height={isMobile ? 350 : 450}
                                    style={{ border: 0 }}
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Section */}
                        <link
                            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                            rel="stylesheet"
                        />
                        <section className={cx('mail-seccess', 'section', 'p-5')}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3 col-12">
                                        {/* Error Inner */}
                                        <div className={cx('success-inner')}>
                                            <h1>
                                                <i className="fa fa-envelope"></i>
                                                <span>Your Mail Sent Successfully!</span>
                                            </h1>
                                            <p>
                                                Aenean eget sollicitudin lorem, et pretium felis. Nullam euismod diam
                                                libero, sed dapibus leo laoreet ut. Suspendisse potenti. Phasellus urna
                                                lacus
                                            </p>
                                            <a routerLink="/home" className="btn btn-primary btn-lg">
                                                Go Home
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
}

export default Contact;
