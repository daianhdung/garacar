import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './ListCoupon.module.scss';
import { formatNumber } from '~/utils/stringUtils';



const cx = classNames.bind(styles);

function ListCoupon({coupons , handleDelete}) {


    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên coupon</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons.map((coupon,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{coupon.name}</td>

                                        <td>{coupon.rate}</td>

                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminCouponUpdate}?id=${coupon.id}`}> <i className="bi bi-pencil-square text-info"></i> </Link>
                                            <Link to={config.routes.adminCoupon} onClick={() => handleDelete(coupon.id, coupon.name)}> <i className="bi bi-trash text-danger ms-3"></i> </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListCoupon