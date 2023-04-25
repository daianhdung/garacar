import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './ListUser.module.scss';
import { formatNumber } from '~/utils/stringUtils';



const cx = classNames.bind(styles);

function ListUser({users , handleDelete}) {


    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên đầy đủ</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Quyền</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.fullname}</td>

                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.roleName}</td>

                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminUserUpdate}?id=${user.id}`}> <i className="bi bi-pencil-square text-info"></i> </Link>
                                            <Link to={config.routes.adminUser} onClick={() => handleDelete(user.id, user.name)}> <i className="bi bi-trash text-danger ms-3"></i> </Link>
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
export default ListUser