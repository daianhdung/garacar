import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import { formatNumber } from '~/utils/stringUtils';
import styles from './ListBrand.module.scss';

const cx = classNames.bind(styles);

function ListBrand({brands, handleDelete}) {

    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Email</th>
                            <th scope="col" style={{maxWidth: '90px'}}>Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Role</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands.map((brand,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td style={{maxWidth: '200px'}}>{brand.fullname}</td>
                                        <td>
                                            {brand.email}
                                        </td>
                                        <td style={{maxWidth: '90px'}}>{brand.phone}</td>
                                        <td>{brand.address}</td>
                                        <td>{brand.roleName}</td>
                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminBrandUpdate}?id=${brand.id}`}> <i className="bi bi-pencil-square text-info fs-1"></i> </Link>     
                                            <Link onClick={() => handleDelete(brand.id)}> <i className="bi bi-trash text-danger fs-1 ms-3"></i> </Link>
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
export default ListBrand