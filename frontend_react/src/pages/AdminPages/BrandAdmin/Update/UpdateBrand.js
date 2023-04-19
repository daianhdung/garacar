import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";

import FormBrand from "../Form/FormBrand";

function UpdateBrand() {
    const [formBrand, setFormBrand] = useState()

    const handleUpdate = (formBrand) => {
        // const fetchApiUpdateRoleUser = async () => {
        //     console.log(1);
        //     console.log(formBrand);
        //     const response = await updateUserRole(formBrand)
        //     if(response.success){
        //         successToast('Thay đổi thành công')
        //     }else{
        //         errorToast('Thất bại, vui lòng kiểm tra lại')
        //     }
        // }
        // fetchApiUpdateRoleUser()
    }

    // useEffect(() => {
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const id = queryParams.get('id')
    //     const fetchApiGetUser = async () => {
    //         const response = await getUser(id)
    //         setFormUser(response.data)
    //     }
    //     const fetchApiGetRole = async () => {
    //         const response = await getAllRole()
    //         setRole(response.data)
    //     }
    //     fetchApiGetRole()
    //     fetchApiGetUser()
    // }, [])

    return (<div>
        {
            formBrand ?
                <FormBrand brand={formBrand} handleUpdate={handleUpdate} />
                :
                <div>Không tìm thấy người dùng để cập nhật </div>
        }

    </div>);
}

export default UpdateBrand;