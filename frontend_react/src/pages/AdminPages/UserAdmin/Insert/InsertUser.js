import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { getAllRole } from "~/services/admin/adminRoleService";
import * as userService from "~/services/admin/adminUserServie";
import FormUser from "../Form/FormUser";

function InsertUser() {

    const [formUser, setFormUser] = useState()
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState()


    const handleInsert = (formUser, mainImage) => {
        const userDTO = {
            fullname : formUser.fullname,
            address : formUser.address,
            phone : formUser.phone,
            email : formUser.email,
            password : formUser.password,
            roleId : formUser.roleId,
            userName : formUser.userName,
        }
        
        const formData = new FormData();
        formData.append('userDTO', JSON.stringify(userDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }

        const fetchApiCreateUser = async () => {
            const response = await userService.createUser(formData);
            console.log(response);
            if (response.success) {
                
                successToast('Tạo tài khoản thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiCreateUser();
    }

    useEffect(() => {
        const fetchApiGetRole = async () => {
            const responRole = await getAllRole()
            setRole(responRole)
        }
        fetchApiGetRole()
    }, [])


    return (<>
        <FormUser user={formUser} roles={role} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertUser;