import { useEffect, useState } from 'react';
import * as mailService from '~/services/admin/adminMailService';
import ListMail from './List/ListMail';

function MailAdmin({ setIsLoading }) {
    const [mail, setMail] = useState();

    const handleDelete = (id, name) => {
        if (window.confirm('Are you sure to delete ' + name)) {
            // const fetchApiDeleteProduct = async () => {
            //     const response = await productService.deleteProductById(id);
            //     if (response.success) {
            //         setProduct(product.filter((item) => item.id !== id))
            //         successToast('Xóa sản phẩm thành công');
            //     } else {
            //         errorToast('Thất bại, vui lòng kiểm tra lại');
            //     }
            // };
            // fetchApiDeleteProduct();
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchApiGetAllMail = async () => {
            const response = await mailService.getAllMail();
            setMail(response);
            setIsLoading(false);
        };
        fetchApiGetAllMail();
    }, []);

    return <div>{mail ? <ListMail mails={mail} handleDelete={handleDelete} /> : <div>Không có dữ liệu</div>}</div>;
}

export default MailAdmin;
