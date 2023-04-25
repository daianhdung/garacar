import { useEffect, useState } from 'react';
import * as userService from '~/services/admin/adminUserServie';
import { errorToast, successToast } from '~/components/Popups';
import ListUser from './List/ListUser';

function UserAdmin({ setIsLoading }) {
    const [user, setUser] = useState();

    const handleDelete = (id, name) => {
        if (window.confirm('Are you sure to delete ' + name)) {
            const fetchApiDeleteUser = async () => {
                const response = await userService.deleteUserById(id);
                if (response.success) {
                    setUser(user.filter((item) => item.id !== id))
                    successToast('Xóa tài khoản thành công');
                } else {
                    errorToast('Thất bại, vui lòng kiểm tra lại');
                }
            };
            fetchApiDeleteUser();
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllUser = async () => {
            const response = await userService.getAllUser();
            setUser(response);
            setIsLoading(false);
        };
        fetchApiGetAllUser();
    }, []);

    return <div>{user ? <ListUser users={user} handleDelete={handleDelete}/> : <div>Không có dữ liệu</div>}</div>;
}

export default UserAdmin;
