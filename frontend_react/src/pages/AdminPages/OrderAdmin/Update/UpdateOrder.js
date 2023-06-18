import { getCookie } from '~/utils/utilsCookie';
import * as updateOrderService from '~/services/admin/adminOrderService';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { errorToast, successToast } from '~/components/Popups';
import { formatNumber } from '~/utils/stringUtils';

function UpdateOrder() {
    const [status, SetStatus] = useState(0);
    const [statuses, SetStatuses] = useState();
    const [order, SetOrder] = useState(null);

    const [productOrder, setProductOrder] = useState();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const handleUpdate = () => {
        const orderDTO = {
            id: id,
            statusId: status,
        };
        const fetchApiUpdateOrder = async () => {
            const response = await updateOrderService.updateOrderStatus(orderDTO);
            console.log(response);
            if (response.success) {
                successToast('Cập nhật thành công');
            } else {
                errorToast('Đã có lỗi xảy ra');
            }
        };
        fetchApiUpdateOrder();
    };
    useEffect(() => {
        const fetchApiGetOrder = async () => {
            const response = await updateOrderService.getOrderById(id);
            const responseStatus = await updateOrderService.getAllStatus();
            SetOrder(response.success ? response.data : null);
            setProductOrder(response.success ? response.data.productOrderDTOList : null);
            SetStatuses(responseStatus);
        };
        fetchApiGetOrder();
    }, []);
    return (
        <div>
            {order ? (
                <div className="row p-5 fs-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-4 fw-bold">
                            <label>Cập nhật trạng thái đơn hàng </label>
                        </div>
                    </div>
                    <table className="table table-hover table-content fs-5">
                        <thead>
                            <tr>
                                <th scope="col">Tên người đặt</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Địa chỉ giao hàng</th>
                                <th scope="col">Tổng đơn hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.nameCustomer}</td>
                                {productOrder &&
                                    productOrder.map((order) => (
                                        <React.Fragment key={order.name}>
                                            <td>{order.name}</td>
                                            <td>{order.amount}</td>
                                        </React.Fragment>
                                    ))}
                                <td>{order.deliveryAddress}</td>
                                <td>{formatNumber(order.total)}đ</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="status">Trạng thái</label>
                            <select
                                style={{ height: '40px' }}
                                className="form-control"
                                id="status"
                                value={status}
                                onChange={(e) => SetStatus(e.target.value)}
                            >
                                <option value={order.statusId}>
                                    Hiện tại: {order.status}
                                </option>
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-5">
                            <button
                                style={{ width: '100px' }}
                                className="me-4 btn btn-outline-info mb-2"
                                onClick={handleUpdate}
                            >
                                Xác nhận
                            </button>
                            <button
                                style={{ width: '100px' }}
                                className="btn btn-outline-danger mb-2"
                                onClick={() => navigate(-1)}
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Không tìm thấy đơn hàng để cập nhật </div>
            )}
        </div>
    );
}
export default UpdateOrder;
