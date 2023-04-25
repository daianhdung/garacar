import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import images from '~/assets';
import config from '~/config';
import * as loginService from '~/services/loginService';
import styles from './Login.module.scss';

import { decodeToken } from 'react-jwt';
import { validPassword } from '~/utils/regex';
import useAuth from '~/hooks/useAuth';
import { saveCookie } from '~/utils/utilsCookie';

const cx = classNames.bind(styles);

function Login({ setIsLoading }) {
    const navigate = useNavigate();
    const location = useLocation();

    const contextAuth = useAuth()

    const from = location.state?.from?.pathname || '/';

    const [state, setState] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    //built-in validate
    const handleChange = (event) => {
        const { name, value } = event.target;
        let newErrors = { ...errors };
        if (name === 'email') {
            if (!value) {
                newErrors.email = 'Username bắt buộc';
            } else {
                newErrors.email = null;
            }
        }
        if (name === 'password') {
            if (!value) {
                newErrors.password = 'Mật khẩu bắt buộc';
            } else if (!validPassword.test(value)) {
                newErrors.password = 'Mật khẩu không hợp lệ';
            } else {
                newErrors.password = null;
            }
        }
        setState({
            ...state,
            [name]: value,
        });
        setErrors(newErrors);
    };

    const handleClick = () => {
        let newErrors = {};
        if (!state.email) {
            newErrors.email = 'Username bắt buộc';
        }
        if (!state.password) {
            newErrors.password = 'Mật khẩu bắt buộc';
        } else if (!validPassword.test(state.password)) {
            newErrors.password = 'Mật khẩu không hợp lệ';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const fetchApi = async () => {
                setIsLoading(true)
                try {
                    const result = await loginService.login(state.email, state.password);
                    const myDecodedToken = decodeToken(result.data.token);
                    const myDecodedRefreshToken = decodeToken(result.data.freshToken);
                    const expiredToken = myDecodedToken.exp - myDecodedToken.iat
                    const expiredRefreshToken = myDecodedRefreshToken.exp - myDecodedRefreshToken.iat
                    const tokenDecoded = JSON.parse(myDecodedToken.sub)

                    if (result.success) {
                        saveCookie('tokenJwt', result.data.token, expiredToken)
                        saveCookie('tokenJwtRefresh', result.data.freshToken, expiredRefreshToken)
                        contextAuth.authProvider.username = tokenDecoded.username
                        contextAuth.authProvider.isLogin = true
                        if (result.data.role === 'ROLE_ADMIN') {
                            contextAuth.authProvider.isAdmin = true
                            navigate('/admin-home', { replace: true })
                        } else {
                            navigate(from, { replace: true })
                        }
                    }
                } catch (errors) {
                    setIsLoading(false)

                }
                setIsLoading(false)
            };

            fetchApi();
        }
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img
                            width="60"
                            height="60"
                            style={{ background: '#fff', borderRadius: '50%' }}
                            src={images.logo}
                            alt="logo"
                        />
                    </Link>
                    <h4>Đăng nhập vào Xanh Auto</h4>
                </div>
                <div className={cx('body')}>
                    <div className={cx('form_body')}>
                        <div className={cx('wrapper-form')}>
                            <div className={cx('wrapper_input')}>
                                <div className={cx('input_wrap')}>
                                    <input
                                        placeholder="Địa chỉ email"
                                        name="email"
                                        maxLength="50"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('wrapper-form')}>
                            <div className={cx('wrapper_input')}>
                                <div className={cx('input_wrap')}>
                                    <input
                                        name="password"
                                        placeholder="Mật khẩu"
                                        type="password"
                                        autoComplete="password"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 style={{ textShadow: '0 5px 5px red' }} className="fs-5 mt-3 text-warning">
                            {errors.email && errors.email}
                        </h3>
                        <h3 style={{ textShadow: '0 5px 5px red' }} className="fs-5 mt-3 text-warning">
                            {errors.password && errors.password}
                        </h3>
                        <button onClick={handleClick} className={cx('button_form')} type="button">
                            <div>
                                <span className={cx('wrapper_input')}>Đăng nhập</span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className={cx('footer')}>Footer</div>
            </div>
        </div>
    );
}

export default Login;
