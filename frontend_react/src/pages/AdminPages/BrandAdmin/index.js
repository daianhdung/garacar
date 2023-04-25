import { useEffect, useState } from 'react';
import * as brandService from '~/services/admin/adminBrandServie';
import ListBrand from './List/ListBrand';
import { errorToast, successToast } from '~/components/Popups';

function BrandAdmin({ setIsLoading }) {
    const [brands, setBrands] = useState();

    const handleDelete = (id, name) => {
        if (window.confirm('Are you sure to delete ' + name)) {
            const fetchApiDeleteBrand = async () => {
                const response = await brandService.deleteBrandById(id);
                if (response.success) {
                    setBrands(brands.filter((item) => item.id !== id))
                    successToast('Xóa thương hiệu thành công');
                } else {
                    errorToast('Thất bại, vui lòng kiểm tra lại');
                }
            };
            fetchApiDeleteBrand();
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllBrand = async () => {
            const response = await brandService.getAllBrand();
            setBrands(response);
            setIsLoading(false);
        };
        fetchApiGetAllBrand();
    }, []);

    return <div>{brands ? <ListBrand brands={brands} handleDelete={handleDelete}/> : <div>Không có dữ liệu</div>}</div>;
}

export default BrandAdmin;
