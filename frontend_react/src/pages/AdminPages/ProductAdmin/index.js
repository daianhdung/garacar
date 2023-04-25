import { useEffect, useState } from 'react';
import * as productService from '~/services/admin/adminProductServie';
import { errorToast, successToast } from '~/components/Popups';
import ListProduct from './List/ListProduct';

function ProductAdmin({ setIsLoading }) {
    const [product, setProduct] = useState();

    const handleDelete = (id, name) => {
        if (window.confirm('Are you sure to delete ' + name)) {
            const fetchApiDeleteProduct = async () => {
                const response = await productService.deleteProductById(id);
                if (response.success) {
                    setProduct(product.filter((item) => item.id !== id))
                    successToast('Xóa sản phẩm thành công');
                } else {
                    errorToast('Thất bại, vui lòng kiểm tra lại');
                }
            };
            fetchApiDeleteProduct();
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllProduct = async () => {
            const response = await productService.getAllProduct();
            setProduct(response);
            setIsLoading(false);
        };
        fetchApiGetAllProduct();
    }, []);

    return <div>{product ? <ListProduct products={product} handleDelete={handleDelete}/> : <div>Không có dữ liệu</div>}</div>;
}

export default ProductAdmin;
