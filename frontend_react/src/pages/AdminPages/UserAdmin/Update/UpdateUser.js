import { useEffect, useState } from 'react';
import { errorToast, successToast } from '~/components/Popups';

import * as userService from '~/services/admin/adminUserServie';
import FormUser from '../Form/FormUser';
import { getAllRole } from '~/services/admin/adminRoleService';

function UpdateUser() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const [formUser, setFormUser] = useState();
    const [role, setRole] = useState()

    const handleUpdate = (formUser, mainImage) => {
        const userDTO = {
            fullname : formUser.fullname,
            email : formUser.email,
            password : formUser.password,
            roleId : formUser.roleId,
            address : formUser.address,
            phone : formUser.phone,
        }
        
        const formData = new FormData();
        formData.append('userDTO', JSON.stringify(userDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }

        const fetchApiUpdateUser = async () => {
            const response = await userService.updateUserById( id,formData);
            if (response.success) {
                successToast('Thay đổi thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiUpdateUser();
    };

    useEffect(() => {
        const fetchApiGetUser = async () => {
            const response = await userService.getUserId(id);
            setFormUser(response);
            const responRole = await getAllRole()
            setRole(responRole)
        };
        fetchApiGetUser();
    }, []);

    return (
        <div>
            {formUser ? (
                <FormUser user={formUser} roles={role} handleUpdate={handleUpdate} />
            ) : (
                <div>Không tìm thấy người dùng để cập nhật </div>
            )}
        </div>
    );
}

export default UpdateUser;
