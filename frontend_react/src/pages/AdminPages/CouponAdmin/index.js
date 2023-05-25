import { useEffect, useState } from 'react';
import * as couponService from '~/services/admin/adminCouponService';
import { errorToast, successToast } from '~/components/Popups';
import ListCoupon from './List/ListCoupon';

function CouponAdmin({ setIsLoading }) {
    const [coupon, setCoupon] = useState();

    const handleDelete = (id, name) => {
        if (window.confirm('Are you sure to delete ' + name)) {
            const fetchApiDeleteCoupon = async () => {
                const response = await couponService.deleteCouponById(id);
                if (response.success) {
                    setCoupon(coupon.filter((item) => item.id !== id))
                    successToast('Xóa coupon thành công');
                } else {
                    errorToast('Thất bại, vui lòng kiểm tra lại');
                }
            };
            fetchApiDeleteCoupon();
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllCoupon = async () => {
            const response = await couponService.getAllCoupon();
            setCoupon(response);
            setIsLoading(false);
        };
        fetchApiGetAllCoupon();
    }, []);

    return <div>{coupon ? <ListCoupon coupons={coupon} handleDelete={handleDelete}/> : <div>Không có dữ liệu</div>}</div>;
}

export default CouponAdmin;
