import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { getAllRole } from "~/services/admin/adminRoleService";
import * as couponService from "~/services/admin/adminCouponService";
import FormCoupon from "../Form/FormCoupon";

function InsertCoupon() {

    const [formCoupon, setFormCoupon] = useState()
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState()


    const handleInsert = (formCoupon) => {
        const couponDTO = {
            name : formCoupon.name,
            rate : formCoupon.rate,
        }


        const fetchApiCreateCoupon = async () => {
            const response = await couponService.createCoupon(couponDTO);
            console.log(response);
            if (response.success) {
                
                successToast('Tạo coupon thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiCreateCoupon();
    }

    useEffect(() => {
        const fetchApiGetRole = async () => {
            const responRole = await getAllRole()
            setRole(responRole)
        }
        fetchApiGetRole()
    }, [])


    return (<>
        <FormCoupon coupon={formCoupon} roles={role} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertCoupon;