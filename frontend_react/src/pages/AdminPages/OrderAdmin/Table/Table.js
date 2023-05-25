import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paging from '~/components/Paging/Paging';
import config from '~/config';
import { formatNumber } from '~/utils/stringUtils';
import { getCookie } from '~/utils/utilsCookie';
import styles from './Table.module.scss';
import * as adminOrderService from '~/services/admin/adminOrderService';

const cx = classNames.bind(styles);

function Table({orders}) {
    const [mOrders, SetOrders] = useState([...orders])
    const [pageOrders, SetPageOrders] =  useState(() => mOrders.slice(0, 10))
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPage, SetTotalPage] = useState(() => {
        var totalOrders = mOrders.length
        if (totalOrders % 10 == 0) {
            return totalOrders / 10
        } else {
            return totalOrders / 10 + 1
        }
    })
    const handleNext = () => {
        if (currentPage < totalPage) {
            SetCurrentPage(prev => {
                handlePageOrder(prev + 1)
                return prev + 1
            })
        } 
    }
    const handlePrev = () => {
        if (currentPage > 1) {
            SetCurrentPage(prev => {
                handlePageOrder(prev - 1)
                return prev  - 1
            })
        }
    }
    const handleSetCurrentPage = (num) => {
        if (currentPage != num) {
            SetCurrentPage(prev => {
                handlePageOrder(num)
                return num
            })
        }
    }
    const handlePageOrder = (current) => {
        SetPageOrders(mOrders.slice((current - 1) * 10, current * 10))
    }
    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên người đặt</th>
                            <th scope="col">Sản phẩm</th>
                            {/* <th scope="col">Size</th> */}
                            <th scope="col">Số lượng</th>
                            <th scope="col">Địa chỉ giao hàng</th>
                            <th scope="col">Tổng đơn hàng</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageOrders.map((order,index) => {
                                return (
                                    <tr key={order.id}>
                                        <th scope="row">{ ((currentPage - 1) * 10) + index + 1 }</th>
                                        <td>{order.userDTO.fullname}</td>
                                        <td style={{maxWidth: '200px'}}>
                                            { order.products.map(product=> product.name) }
                                        </td>
                                        {/* <td>
                                            { order.products.map(product=> product.size) }
                                        </td> */}
                                        <td>
                                            { order.products.map(product=> product.amount) }
                                        </td>
                                        <td>{order.deliveryAddress}</td>
                                        <td>{formatNumber(order.total)}đ</td>
                                        <td>{order.status}</td>
                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminOrderUpdate}?id=${order.id}`}> <i className="bi bi-pencil-square text-info fs-4"></i> </Link>     
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='row'><div className='col-md-6 offset-md-5'><Paging totalPage={totalPage} currentPage={currentPage} handleNext={handleNext} handlePrev={handlePrev} handleSetCurrentPage={handleSetCurrentPage}/></div></div>
            </div>
        </div>
    )
}
export default Table 