import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { validEmail, validPassword, validPhone } from "~/utils/regex";
import FormBrand from "../Form/FormBrand";
import { createBrand } from "~/services/admin/adminBrandServie";

function InsertBrand() {

    const [formBrand, setFormBrand] = useState()
    const [errors, setErrors] = useState({});

    const handleInsert = (formBrand, mainImage) => {
        const brandDTO = {
            id : formBrand.id,
            name : formBrand.name
        }
        
        const formData = new FormData();
        formData.append('brandDTO', JSON.stringify(brandDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }

        const fetchApiCreateBrand = async () => {
            const response = await createBrand(formData);
            if (response.success) {
                successToast('Tạo thương hiệu thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiCreateBrand();
    }

    return (<>
        <FormBrand brand={formBrand} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertBrand;