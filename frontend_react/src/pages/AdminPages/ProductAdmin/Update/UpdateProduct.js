import { useEffect, useState } from 'react';
import { errorToast, successToast } from '~/components/Popups';

import * as productService from '~/services/admin/adminProductServie';
import FormProduct from '../Form/FormProduct';
import { getAllBrand } from '~/services/admin/adminBrandServie';
import { getAllCategory } from '~/services/admin/adminCategoryServie';

function UpdateProduct() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const [formProduct, setFormProduct] = useState();
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()

    const handleUpdate = (formProduct, mainImage, images) => {
        const productDTO = {
            name : formProduct.name,
            price : formProduct.price,
            brandId : formProduct.brandId,
            categoryId : formProduct.categoryId,
            description: formProduct.description,
            specification : formProduct.specification,
            specialOffer: formProduct.specialOffer,
        }
        
        const formData = new FormData();
        formData.append('productDTO', JSON.stringify(productDTO))
        if (mainImage) {
            formData.append('mainImage', mainImage, mainImage.name)
        }
        if(images){
            for(let i = 0; i < images.length; i++){
                formData.append('images', images[i])
            }
        }

        const fetchApiUpdateProduct = async () => {
            const response = await productService.updateProductById( id,formData);
            if (response.success) {
                successToast('Thay đổi thành công');
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại');
            }
        };
        fetchApiUpdateProduct();
    };

    useEffect(() => {
        const fetchApiGetProduct = async () => {
            const response = await productService.getProductId(id);
            setFormProduct(response);
            const responseBrand = await getAllBrand()
            setBrand(responseBrand)
            const responCate = await getAllCategory()
            setCategory(responCate)
        };
        fetchApiGetProduct();
    }, []);

    return (
        <div>
            {formProduct ? (
                <FormProduct product={formProduct} brands={brand} categories={category} handleUpdate={handleUpdate} />
            ) : (
                <div>Không tìm thấy người dùng để cập nhật </div>
            )}
        </div>
    );
}

export default UpdateProduct;
