import { faUps } from '@fortawesome/free-brands-svg-icons';
import {
    faBox,
    faFileCircleCheck,
    faFileLines,
    faUpLong,
    faDownLong,
    faUsers,
    faXmark,
    faMinus,
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { Children, useEffect, useState } from 'react';

import styles from './Admin.module.scss';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';
import SidebarAdmin from './SidebarAdmin/SidebarAdmin';
import * as AdminHomeService from '~/services/admin/adminHomeService';
import { getCookie } from '~/utils/utilsCookie';
import LoaderModal from '~/components/Modal/LoaderModal/LoaderModal';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';
import useChat from '~/hooks/useChat';
import images from '~/assets';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, SetData] = useState({});
    const chatSection = useChat();

    const [canvasVisible, setCanvasVisible] = useState(false);

    const toggleCanvas = () => {
        setCanvasVisible(!canvasVisible);
    };

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    return (
        <>
            {isLoading && <LoaderModal isLoading={isLoading} />}
            <div className={cx('wrapper')}>
                <div className={cx('wrapper_sidebar', canvasVisible ? 'toggler-sidebar' : '')}>
                    {isMobile ? (
                        <div className={cx('button-hide')} onClick={toggleCanvas}>
                            <button className="btn btn-outline-danger">
                                <i className="bi bi-chevron-double-left"></i>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
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
                                        {data.diffBillOrdered >= 0 ? (
                                            <span>
                                                <FontAwesomeIcon icon={faUpLong} />
                                            </span>
                                        ) : (
                                            <span>
                                                <FontAwesomeIcon icon={faDownLong} />
                                            </span>
                                        )}
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
                                        {data.diffNewCustomer >= 0 ? (
                                            <span>
                                                <FontAwesomeIcon icon={faUpLong} />
                                            </span>
                                        ) : (
                                            <span>
                                                <FontAwesomeIcon icon={faDownLong} />
                                            </span>
                                        )}
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
                                        {data.diffBillSold >= 0 ? (
                                            <span>
                                                <FontAwesomeIcon icon={faUpLong} />
                                            </span>
                                        ) : (
                                            <span>
                                                <FontAwesomeIcon icon={faDownLong} />
                                            </span>
                                        )}
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
                    <div className={cx('chat_section')}>
                        {[...chatSection.section.values()].map((item) => (
                            <div key={item} className={cx('each_section')}>
                                <div className={cx('top_section')}>
                                    <div className={cx('identity', 'd-flex')}>
                                        <img
                                            className="mx-2 my-2 rounded-circle"
                                            width={40}
                                            height={40}
                                            src={images.avatarAno}
                                            alt=""
                                        />
                                        <span className="ms-1">{item.name}</span>
                                    </div>
                                    <div className={cx('button_option')}>
                                        <div className={cx('wrap_but', 'f-center-align ')}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </div>
                                        <div className={cx('wrap_but', 'f-center-align ')}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('mid_section')}></div>
                                <div className={cx('bot_section', 'f-center-align')}>
                                    <div className={cx('chat_form')}>
                                        <input
                                            // ref={inputRef}
                                            type="text"
                                            placeholder="Aa"
                                            // value={searchValue}
                                            // spellCheck={false}
                                            // onChange={handleChange}
                                            // onFocus={() => setShowResult(true)}
                                        />

                                        {/* {searchValue && !loading && (
                                            <button 
                                            // onClick={handleClear} 
                                            className={cx('clear_input')}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </button>
                                        )} */}

                                        {/* {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />} */}
                                    </div>
                                    <div className={cx('button_send')}>
                                        <button
                                            type="button"
                                            // onMouseOver={() => setOver(true)}
                                            // onMouseLeave={() => setOver(false)}
                                            className={cx('btn-search')}
                                        >
                                            <FontAwesomeIcon
                                                // style={over ? { color: 'black' } : {}}
                                                icon={faPaperPlane}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
