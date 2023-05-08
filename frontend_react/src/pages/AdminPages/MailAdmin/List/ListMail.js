import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './ListMail.module.scss';
import { formatNumber } from '~/utils/stringUtils';

const cx = classNames.bind(styles);

function ListMail({ mails, handleDelete }) {
    console.log(mails);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <table className="table table-hover table-content">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Tin nhắn</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mails.length > 0 ? mails.map((mail, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td style={{ maxWidth: '150px' }}>{mail.fullName}</td>
                                    <td style={{ maxWidth: '150px' }}>{mail.fullName}</td>
                                    <td style={{ maxWidth: '150px' }}>{mail.phone}</td>
                                    <td style={{ maxWidth: '150px' }}>{mail.message}</td>
                                    <td className={cx('table-action')}>
                                        <Link to={`${config.routes.adminMailDetail}/${mail.id}`}>
                                            {' '}
                                            <i className="bi bi-reply text-info"></i>{' '}
                                        </Link>
                                        <Link
                                            to={config.routes.adminMail}
                                            onClick={() => handleDelete(mail.id, mail.name)}
                                        >
                                            {' '}
                                            <i className="bi bi-trash text-danger ms-3"></i>{' '}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        }) : <p>không có dữ liệu</p>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ListMail;
