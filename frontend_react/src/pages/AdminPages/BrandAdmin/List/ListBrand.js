import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './ListBrand.module.scss';



const cx = classNames.bind(styles);

function ListBrand({brands , handleDelete}) {


    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên thương hiệu</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands.map((brand,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td style={{maxWidth: '150px'}}>{brand.name}</td>

                                        <td><img style={{objectFit: 'contain'}} src={brand.image} /></td>

                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminBrandUpdate}?id=${brand.id}`}> <i className="bi bi-pencil-square text-info"></i> </Link>     
                                            <Link to={config.routes.adminBrand} onClick={() => handleDelete(brand.id, brand.name)}> <i className="bi bi-trash text-danger ms-3"></i> </Link>
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