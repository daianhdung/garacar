import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validEmail, validPhone } from '~/utils/regex';

function FormUser({ user, handleUpdate, handleInsert, roles }) {
    const [formUser, setFormUser] = useState(user ? user : { roleId: 1 });
    const [mainImage, SetMainImage] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitUpdate = () => {
        let newErrors = {};
        if (!formUser.userName) {
            newErrors.userName = 'Username bắt buộc';
        }
        if (!formUser.email) {
            newErrors.email = 'Email bắt buộc';
        } else if (!validEmail.test(formUser.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formUser.fullname) {
            newErrors.fullname = 'Họ và tên bắt buộc';
        }
        if (!formUser.phone) {
            newErrors.phone = 'Số điện thoại bắt buộc';
        } else if (!validPhone.test(formUser.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!formUser.address) {
            newErrors.address = 'Địa chỉ bắt buộc';
        }
        if (!formUser.password) {
            newErrors.password = 'Mật khẩu bắt buộc';
        }
        
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleUpdate(formUser, mainImage);
        }
    };
    const handleSubmitCreate = () => {
        let newErrors = {};
        if (!formUser.userName) {
            newErrors.userName = 'Username bắt buộc';
        }
        if (!formUser.email) {
            newErrors.email = 'Email bắt buộc';
        } else if (!validEmail.test(formUser.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formUser.fullname) {
            newErrors.fullname = 'Họ và tên bắt buộc';
        }
        if (!formUser.phone) {
            newErrors.phone = 'Số điện thoại bắt buộc';
        } else if (!validPhone.test(formUser.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!formUser.address) {
            newErrors.address = 'Địa chỉ bắt buộc';
        }
        if (!formUser.password) {
            newErrors.password = 'Mật khẩu bắt buộc';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleInsert(formUser, mainImage);
        }
    };

    return (
        <div>
            {user ? (
                <div className="form-update row p-5 fs-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-5 fw-bold">
                            <label>Thay đổi thông tin tài khoản </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên đầy đủ</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormUser({ ...formUser, fullname: e.target.value })}
                                defaultValue={formUser.fullname}
                            />
                            {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Username</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="username"
                                onChange={(e) => setFormUser({ ...formUser, userName: e.target.value })}
                                defaultValue={formUser.userName}
                            />
                            {errors.userName && <span className="text-danger">{errors.userName}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Phone</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="phone"
                                onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })}
                                defaultValue={formUser.phone}
                            />
                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="brand">Quyền</label>
                            <select
                                style={{ height: '40px' }}
                                className="form-control form-control-lg"
                                id="role"
                                onChange={(e) => setFormUser({ ...formUser, roleId: e.target.value })}
                            >
                                <option value={formUser.roleId}> Hiện tại : {formUser.roleName}</option>
                                {roles &&
                                    roles.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.role && <span className="text-danger">{errors.role}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Email</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="email"
                                onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                                defaultValue={formUser.email}
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group col-md-5 mt-3">
                            <label htmlFor="name">Ảnh chính</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="main-image"
                                onChange={(e) => SetMainImage(e.target.files[0])}
                            />
                            <div className="mt-3" style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                {mainImage && <img className="w-50 h-50" src={URL.createObjectURL(mainImage)} />}
                            </div>
                            {errors.image && <span className="text-danger">{errors.image}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Mật khẩu</label>
                            <input
                                style={{ height: '40px' }}
                                type="password"
                                className="form-control form-control-lg"
                                id="password"
                                onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Địa chỉ</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="address"
                                onChange={(e) => setFormUser({ ...formUser, address: e.target.value })}
                                defaultValue={formUser.address}
                            />
                            {errors.address && <span className="text-danger">{errors.address}</span>}
                        </div>
                    </div>

                    <div className="mt-5">
                        <button
                            style={{ width: '100px' }}
                            className="me-4 btn btn-outline-info mb-2"
                            onClick={() => {
                                handleSubmitUpdate();
                            }}
                        >
                            Xác nhận
                        </button>
                        <button
                            style={{ width: '100px' }}
                            className="btn btn-outline-danger mb-2"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            ) : (
                //INSERT USER------------------
                <div className="form-update row p-5 fs-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-5 fw-bold">
                            <label>Thêm mới tài khoản </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên đầy đủ</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormUser({ ...formUser, fullname: e.target.value })}
                            />
                            {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Username</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="username"
                                onChange={(e) => setFormUser({ ...formUser, userName: e.target.value })}
                            />
                            {errors.userName && <span className="text-danger">{errors.userName}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Phone</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="phone"
                                onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })}
                            />
                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="brand">Quyền</label>
                            <select
                                style={{ height: '40px' }}
                                className="form-control form-control-lg"
                                id="role"
                                onChange={(e) => setFormUser({ ...formUser, roleId: e.target.value })}
                            >
                                {roles &&
                                    roles.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.description}
                                        </option>
                                    ))}
                            </select>
                            {errors.role && <span className="text-danger">{errors.role}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Email</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="email"
                                onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group col-md-5 mt-3">
                            <label htmlFor="name">Ảnh Chính</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="main-image"
                                onChange={(e) => SetMainImage(e.target.files[0])}
                            />
                            <div className="mt-3" style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                {mainImage && <img className="w-50 h-50" src={URL.createObjectURL(mainImage)} />}
                            </div>
                            {errors.image && <span className="text-danger">{errors.image}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Mật khẩu</label>
                            <input
                                style={{ height: '40px' }}
                                type="password"
                                className="form-control form-control-lg"
                                id="password"
                                onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Địa chỉ</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="address"
                                onChange={(e) => setFormUser({ ...formUser, address: e.target.value })}
                            />
                            {errors.address && <span className="text-danger">{errors.address}</span>}
                        </div>
                    </div>

                    <div className="mt-5">
                        <button
                            style={{ width: '100px' }}
                            className="me-4 btn btn-outline-info mb-2"
                            onClick={() => handleSubmitCreate()}
                        >
                            Xác nhận
                        </button>
                        <button
                            style={{ width: '100px' }}
                            className="btn btn-outline-danger mb-2"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormUser;
