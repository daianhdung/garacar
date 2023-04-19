import classNames from 'classnames/bind';

import styles from './CartModal.module.scss';
import React, { useEffect, useState } from "react";
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNumber } from '~/utils/stringUtils';
import useCart from '~/hooks/useCart';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function CartModal({ closeModal }) {


    const cart = useCart()
    const localItems = cart.items

    return (<React.Fragment>
        <div className={cx('modal-overlay')} onClick={closeModal}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={closeModal}>
                    <div className={cx('modal-header')}>
                        <img src='//bizweb.dktcdn.net/100/347/064/themes/717243/assets/add_to_cart.svg?1671644724927' />
                        <div>
                            <h3>Bạn đã thêm sản phẩm ... vào giỏ hàng</h3>
                            <h4>Giỏ hàng của bạn ({localItems && localItems.length} sản phẩm )</h4>
                        </div>
                        <span className={cx('modal-close')} onClick={closeModal}>&times;</span>
                    </div>
                    <div className={cx('modal-body')}>
                        <table className='table-bordered'>
                            <thead>
                                <tr>
                                    <th>SẢN PHẨM</th>
                                    <th>ĐƠN GIÁ</th>
                                    <th>SỐ LƯỢNG</th>
                                    <th>THÀNH TIỀN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localItems ? <>
                                    {localItems && localItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className={cx('wrap_td')}>
                                                    <img width={140} height={140} src={process.env.REACT_APP_IMG_URL + item.image} />
                                                    <div className={cx('descrip-product')}>
                                                        <p>{item.name}</p>
                                                        <span>Size: {item.size}</span>
                                                        <div onClick={() => cart.onDelete(item.id)} className={cx('modal-close', 'text-danger')}>&times; Xóa sản phẩm</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{formatNumber(item.price)} VND</td>
                                            <td>
                                                <div className={cx('quantity_setup')}>
                                                    <button onClick={() => cart.onReduce(item.id)} className={cx('btn-reduce', 'btn')} type="button">
                                                        -
                                                    </button>
                                                    <input value={item.quantity} type="text" title="Số lượng" maxLength="2" id="qty" name="quantity" onChange={(e) => cart.handleChange(e, item.id)} />
                                                    <button onClick={() => cart.onIncrease(item.id)} className={cx('btn-increase', 'btn')} type="button">+</button>
                                                </div>
                                            </td>
                                            <td>{formatNumber(item.price * item.quantity)} VND</td>
                                        </tr>
                                    ))}
                                    <tr><td style={{ padding: '5px' }} colSpan={6} align='right'>Tổng tiền: {cart.getTotalCart && formatNumber(cart.getTotalCart())} VND</td></tr>
                                </> :
                                    <tr><td colSpan={6}><h2>Chưa có sản phẩm trong giỏ hàng</h2></td></tr>
                                }

                            </tbody>

                        </table>
                    </div>
                    <div className={cx('modal-footer')}>
                        <Link to={config.routes.order}><button className={cx('grow_spin')} type="submit">Tiến hành đặt hàng <FontAwesomeIcon icon={faLongArrowRight} /></button></Link>
                    </div>
                </form>
            </div>
        </div>
    </React.Fragment>);
}

export default CartModal;