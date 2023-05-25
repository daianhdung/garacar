import { useEffect, useState } from "react";
import * as adminOrderService from '~/services/admin/adminOrderService';
import Table from "./Table/Table";

function OrderAdmin({ setIsLoading }) {


    const [orders, setOrders] = useState(null)

    useEffect(() => {
        const fetchApiGetAllOrder = async () => {
            setIsLoading(true)
            const response = await adminOrderService.getOrders();
            setOrders(response);
            setIsLoading(false);
        };
        fetchApiGetAllOrder();
    }, [])
    return (
        <div>
            {orders && <Table orders={orders}  />}
        </div>
    )
}

export default OrderAdmin;