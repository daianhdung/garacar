import { useEffect, useState } from 'react';
import { errorToast, successToast } from '~/components/Popups';

import FormBrand from '../Form/FormBrand';
import { getBrandId, updateBrandById } from '~/services/admin/adminBrandServie';

function UpdateBrand() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const [formBrand, setFormBrand] = useState();

    const handleUpdate = (formBrand, mainImage) => {
        const brandDTO = {
            id : formBrand.id,
            name : formBrand.name
        }
        
        const formData = new FormData();
        formData.append('brandDTO', JSON.stringify(brandDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }

        const fetchApiUpdateBrand = async () => {
            const response = await updateBrandById( id,formData);
            if (response.success) {
                successToast('Thay đổi thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiUpdateBrand();
    };

    useEffect(() => {
        const fetchApiGetBrand = async () => {
            const response = await getBrandId(id);
            setFormBrand(response);
        };
        fetchApiGetBrand();
    }, []);

    return (
        <div>
            {formBrand ? (
                <FormBrand brand={formBrand} handleUpdate={handleUpdate} />
            ) : (
                <div>Không tìm thấy người dùng để cập nhật </div>
            )}
        </div>
    );
}

export default UpdateBrand;
