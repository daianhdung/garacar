import { useEffect, useState } from 'react';
import { errorToast, successToast } from '~/components/Popups';

import * as categoryService from '~/services/admin/adminCategoryServie';
import FormCategory from '../Form/FormCategory';

function UpdateCategory() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const [formCategory, setFormCategory] = useState();

    const handleUpdate = (formCategory, mainImage) => {
        const categoryDTO = {
            id : formCategory.id,
            name : formCategory.name
        }
        
        const formData = new FormData();
        formData.append('categoryDTO', JSON.stringify(categoryDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }

        const fetchApiUpdateCategory = async () => {
            const response = await categoryService.updateCategoryById( id,formData);
            if (response.success) {
                successToast('Thay đổi thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiUpdateCategory();
    };

    useEffect(() => {
        const fetchApiGetCategory = async () => {
            const response = await categoryService.getCategoryId(id);
            setFormCategory(response);
        };
        fetchApiGetCategory();
    }, []);

    return (
        <div>
            {formCategory ? (
                <FormCategory category={formCategory} handleUpdate={handleUpdate} />
            ) : (
                <div>Không tìm thấy người dùng để cập nhật </div>
            )}
        </div>
    );
}

export default UpdateCategory;
