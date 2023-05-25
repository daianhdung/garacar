import { useEffect, useState } from 'react';
import { errorToast, successToast } from '~/components/Popups';

import * as CouponService from '~/services/admin/adminCouponService';
import FormCoupon from '../Form/FormCoupon';
import { getAllRole } from '~/services/admin/adminRoleService';

function UpdateCoupon() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const [formCoupon, setFormCoupon] = useState();
    const [role, setRole] = useState()

    const handleUpdate = (formCoupon, mainImage) => {
        const couponDTO = {
            name : formCoupon.name,
            rate : formCoupon.rate,
        }

        const fetchApiUpdateCoupon = async () => {
            const response = await CouponService.updateCouponById(couponDTO);
            if (response.success) {
                successToast('Thay đổi thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiUpdateCoupon();
    };

    useEffect(() => {
        const fetchApiGetCoupon = async () => {
            const response = await CouponService.getCouponId(id);
            setFormCoupon(response);
            const responRole = await getAllRole()
            setRole(responRole)
        };
        fetchApiGetCoupon();
    }, []);

    return (
        <div>
            {formCoupon ? (
                <FormCoupon coupon={formCoupon} handleUpdate={handleUpdate} />
            ) : (
                <div>Không tìm thấy người dùng để cập nhật </div>
            )}
        </div>
    );
}

export default UpdateCoupon;
