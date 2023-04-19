import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { validEmail, validPassword, validPhone } from "~/utils/regex";
import FormBrand from "../Form/FormBrand";

function InsertBrand() {

    const [formBrand, setFormBrand] = useState()
    const [errors, setErrors] = useState({});

    const handleInsert = (formBrand) => {
        let newErrors = {};
        if (!formBrand.name) {
            newErrors.name = 'Email bắt buộc';
        } else if (!validEmail.test(formBrand.email)) {
            newErrors.name = 'Email không hợp lệ';
        }
        if (!formBrand.image) {
            newErrors.image = 'Họ và tên bắt buộc';
        }
        if (Object.keys(newErrors).length === 0) {
            const fetchApiInsertBrand = async () => {
                const response = await insertUser(formBrand)
                if (response.success) {
                    successToast('Thêm mới thành công')
                } else {
                    errorToast('Thất bại, vui lòng kiểm tra lại')
                }
            }
            fetchApiInsertBrand()
        }
        setErrors(newErrors)
    }
    

    // useEffect(() => {
    //     const fetchApiGetRole = async () => {
    //         const response = await getAllRole()
    //         setRole(response.data)
    //     }
    //     fetchApiGetRole()
    // }, [])

    return (<>
        <FormBrand brand={formBrand} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertBrand;