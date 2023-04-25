import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './ListCategory.module.scss';



const cx = classNames.bind(styles);

function ListCategory({categories , handleDelete}) {


    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên thể loại</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td style={{maxWidth: '150px'}}>{category.name}</td>

                                        <td>{category.image ? <img style={{objectFit: 'contain'}} src={category.image} /> : 'Không có ảnh'}</td>

                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminCategoryUpdate}?id=${category.id}`}> <i className="bi bi-pencil-square text-info"></i> </Link>     
                                            <Link to={config.routes.adminCategory} onClick={() => handleDelete(category.id, category.name)}> <i className="bi bi-trash text-danger ms-3"></i> </Link>
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
export default ListCategory