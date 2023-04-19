import { useEffect, useState } from 'react';
import * as brandService from '~/services/admin/adminBrandServie';
import ListBrand from './List/ListBrand';

function BrandAdmin({ setIsLoading }) {
    const [brands, setBrands] = useState();

    const handleDelete = (id) => {
        // const token = getCookie('tokenJwt');
        // adminProductService.deleteProduct(token, id)
        //     .then(response => console.log(response))
    };
    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllUsers = async () => {
            const response = await brandService.getAllBrand();
            setBrands(response.data);
            setIsLoading(false);
        };
        fetchApiGetAllUsers();
    }, []);

    return <div>{brands ? <ListBrand brands={brands} handleDelete={handleDelete()} /> : <div>Không có dữ liệu</div>}</div>;
}

export default BrandAdmin;
