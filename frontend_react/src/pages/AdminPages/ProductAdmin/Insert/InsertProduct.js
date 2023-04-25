import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import * as productService from "~/services/admin/adminProductServie";
import FormCategory from "../Form/FormProduct";
import FormProduct from "../Form/FormProduct";
import { getAllBrand } from "~/services/admin/adminBrandServie";
import { getAllCategory } from "~/services/admin/adminCategoryServie";

function InsertProduct() {

    const [formProduct, setFormProduct] = useState()
    const [errors, setErrors] = useState({});
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()

    const handleInsert = (formProduct, mainImage, images) => {
        const productDTO = {
            name : formProduct.name,
            price : formProduct.price,
            brandId : formProduct.brandId,
            categoryId : formProduct.categoryId,
        }
        
        const formData = new FormData();
        formData.append('productDTO', JSON.stringify(productDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }
        for(let i = 0; i < images.length; i++){
            formData.append('images', images[i])
        }

        const fetchApiCreateProduct = async () => {
            const response = await productService.createProduct(formData);
            if (response.success) {
                successToast('Tạo sản phẩm thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiCreateProduct();
    }

    useEffect(() => {
        const fetchApiGetBrandCategory = async () => {
            const responseBrand = await getAllBrand()
            setBrand(responseBrand)
            const responCate = await getAllCategory()
            setCategory(responCate)
        }
        fetchApiGetBrandCategory()
    }, [])


    return (<>
        <FormProduct product={formProduct} brands={brand} categories={category} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertProduct;