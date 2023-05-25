import { getCookie } from '~/utils/utilsCookie';
import * as updateOrderService from '~/services/admin/adminOrderService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

function UpdateOrder() {
    const [status, SetStatus] = useState(0);
    const [statuses, SetStatuses] = useState();
    const [order, SetOrder] = useState(null);
    const navigate = useNavigate();
    const handleUpdate = () => {
        const userDTO = {
            // id: formOrder.id,
            // status: formOrder.status,
        };
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        const fetchApiUpdateOrder = async () => {
            const response = await updateOrderService.updateOrderStatus(userDTO);
            SetOrder(response);
        };
        fetchApiUpdateOrder();
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        const fetchApiGetOrder = async () => {
            const response = await updateOrderService.getOrderById(id);
            SetOrder(response);
        };
        fetchApiGetOrder();
    }, []);
    return (
        <div>
            {order ? (
                <div className="row p-5 fs-2">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-4 fw-bold">
                            <label>Cập nhật trạng thái đơn hàng </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="status">Trạng thái</label>
                            <select
                                style={{ height: '40px' }}
                                className="form-control form-control-lg"
                                id="status"
                                value={status}
                                onChange={(e) => SetStatus(e.target.value)}
                            >
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <button
                            style={{ width: '100px' }}
                            className="me-4 btn btn-outline-info mb-2 btn-lg p-3"
                            onClick={handleUpdate}
                        >
                            Xác nhận
                        </button>
                        <button
                            style={{ width: '100px' }}
                            className="btn btn-outline-danger mb-2 btn-lg p-3"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            ) : (
                <div>Không tìm thấy đơn hàng để cập nhật </div>
            )}
        </div>
    );
}
export default UpdateOrder;
