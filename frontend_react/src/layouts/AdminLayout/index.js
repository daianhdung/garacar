import { faUps } from '@fortawesome/free-brands-svg-icons';
import { faBox, faFileCircleCheck, faFileLines, faUpLong, faDownLong, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { Children, useEffect, useState } from 'react';

import styles from './Admin.module.scss';
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import * as AdminHomeService from "~/services/admin/adminHomeService"
import { getCookie } from '~/utils/utilsCookie';
import LoaderModal from '~/components/Modal/LoaderModal/LoaderModal';

const cx = classNames.bind(styles)

function AdminLayout({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, SetData] = useState({})

    useEffect(() => {
        // const token = getCookie('tokenJwt')
        // AdminHomeService.getStat(token)
        //     .then(response => {
        //         // SetData(response)
        //     })
    }, [])

    return (
        <>
            {isLoading && <LoaderModal isLoading={isLoading} />}
            <div className={cx('wrapper')}>
                <div className={cx('wrapper_sidebar')}>
                    <SidebarAdmin />
                </div>
                <div className={cx('content')}>
                    <div className={cx('wrap_header')}>
                        <div className={cx('inner_header')}>

                            <HeaderAdmin />
                        </div>
                    </div>
                    <div className={cx('up_content')}>
                        <div className={cx('wrap_data_dashboard')}>
                            <div className={cx('data_dashboard')}>
                                <div className={cx('data_card')}>
                                    <div className={cx('data_separate', 'f-spaceb')}>
                                        <div>
                                            <h4 className={cx('color-disabled')}>Hóa đơn đặt hàng</h4>
                                            <span className={cx('number_card')}>{data.billOrdered}</span>
                                        </div>
                                        <div className={cx('logo', 'f-center-align', 'color1')}>
                                            <FontAwesomeIcon icon={faFileLines} />
                                        </div>
                                    </div>
                                    <div className={cx('data_separate')}>
                                        {data.diffBillOrdered >= 0 ? <span><FontAwesomeIcon icon={faUpLong} /></span> : <span><FontAwesomeIcon icon={faDownLong} /></span>}
                                        <span>{Math.abs(data.diffBillOrdered)}%</span>
                                        <span>Since last month</span>
                                    </div>
                                </div>
                                <div className={cx('data_card')}>
                                    <div className={cx('data_separate', 'f-spaceb')}>
                                        <div>
                                            <h4 className={cx('color-disabled')}>Khách hàng mới</h4>
                                            <span className={cx('number_card')}>{data.newCustomer}</span>
                                        </div>
                                        <div className={cx('logo', 'f-center-align', 'color2')}>
                                            <FontAwesomeIcon icon={faUsers} />
                                        </div>
                                    </div>
                                    <div className={cx('data_separate')}>
                                        {data.diffNewCustomer >= 0 ? <span><FontAwesomeIcon icon={faUpLong} /></span> : <span><FontAwesomeIcon icon={faDownLong} /></span>}
                                        <span>{Math.abs(data.diffNewCustomer)}%</span>
                                        <span>Since last month</span>
                                    </div>
                                </div>
                                <div className={cx('data_card')}>
                                    <div className={cx('data_separate', 'f-spaceb')}>
                                        <div>
                                            <h4 className={cx('color-disabled')}>Đơn đã bán</h4>
                                            <span className={cx('number_card')}>{data.billSold}</span>
                                        </div>
                                        <div className={cx('logo', 'f-center-align', 'color3')}>
                                            <FontAwesomeIcon icon={faFileCircleCheck} />
                                        </div>
                                    </div>
                                    <div className={cx('data_separate')}>
                                        {data.diffBillSold >= 0 ? <span><FontAwesomeIcon icon={faUpLong} /></span> : <span><FontAwesomeIcon icon={faDownLong} /></span>}
                                        <span>{Math.abs(data.diffBillSold)}%</span>
                                        <span>Since last month</span>
                                    </div>
                                </div>
                                <div className={cx('data_card')}>
                                    <div className={cx('data_separate', 'f-spaceb')}>
                                        <div>
                                            <h4 className={cx('color-disabled')}>Hàng tồn kho</h4>
                                            <span className={cx('number_card')}>{data.remainProduct}</span>
                                        </div>
                                        <div className={cx('logo', 'f-center-align', 'color4')}>
                                            <FontAwesomeIcon icon={faBox} />
                                        </div>
                                    </div>
                                    {/* <div className={cx('data_separate')}>
                                        <span><FontAwesomeIcon icon={faUpLong} /></span>
                                        <span>3.94%</span>
                                        <span>Since last month</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('bot_content')}>
                        <div className={cx('wrap_children')}>
                            {React.cloneElement(children, { setIsLoading: setIsLoading })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;