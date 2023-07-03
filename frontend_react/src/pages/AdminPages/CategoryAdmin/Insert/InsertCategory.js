import { useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import * as categoryService from "~/services/admin/adminCategoryServie";
import FormCategory from "../Form/FormCategory";

function InsertCategory() {

    const [formCategory, setFormCategory] = useState()
    const [errors, setErrors] = useState({});

    const handleInsert = (formCategory, mainImage) => {
        const categoryDTO = {
            id : formCategory.id,
            name : formCategory.name
        }
        
        const formData = new FormData();
        formData.append('categoryDTO', JSON.stringify(categoryDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }

        const fetchApiCreateCategory = async () => {
            const response = await categoryService.createCategory(formData);
            if (response.success) {
                successToast('Tạo thể loại thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiCreateCategory();
    }

    return (<>
        <FormCategory category={formCategory} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertCategory;