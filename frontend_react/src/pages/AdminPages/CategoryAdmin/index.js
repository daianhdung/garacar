import { useEffect, useState } from 'react';
import * as categoryService from '~/services/admin/adminCategoryServie';
import { errorToast, successToast } from '~/components/Popups';
import ListCategory from './List/ListCategory';

function CategoryAdmin({ setIsLoading }) {
    const [category, setCategory] = useState();

    const handleDelete = (id, name) => {
        if (window.confirm('Are you sure to delete ' + name)) {
            const fetchApiDeleteCategory = async () => {
                const response = await categoryService.deleteCategoryById(id);
                if (response.success) {
                    setCategory(category.filter((item) => item.id !== id))
                    successToast('Xóa thể loại thành công');
                } else {
                    errorToast('Thất bại, vui lòng kiểm tra lại');
                }
            };
            fetchApiDeleteCategory();
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllCategory = async () => {
            const response = await categoryService.getAllCategory();
            setCategory(response);
            setIsLoading(false);
        };
        fetchApiGetAllCategory();
    }, []);

    return <div>{category ? <ListCategory categories={category} handleDelete={handleDelete}/> : <div>Không có dữ liệu</div>}</div>;
}

export default CategoryAdmin;
