import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './ListProduct.module.scss';
import { formatNumber } from '~/utils/stringUtils';



const cx = classNames.bind(styles);

function ListProduct({products , handleDelete}) {


    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Thể loại</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td style={{maxWidth: '150px'}}>{product.name}</td>

                                        <td><img style={{objectFit: 'contain'}} src={product.mainImage} /></td>
                                        <td style={{maxWidth: '150px'}}>{product.brandName ? product.brandName : "không có thương hiệu"}</td>
                                        <td style={{maxWidth: '150px'}}>{product.categoryName ? product.categoryName : "không có thể loại"}</td>
                                        <td style={{maxWidth: '150px'}}>{formatNumber(product.price)}</td>

                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminProductUpdate}?id=${product.id}`}> <i className="bi bi-pencil-square text-info"></i> </Link>     
                                            <Link to={config.routes.adminProduct} onClick={() => handleDelete(product.id, product.name)}> <i className="bi bi-trash text-danger ms-3"></i> </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListProduct