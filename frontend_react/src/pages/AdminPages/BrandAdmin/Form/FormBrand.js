import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormBrand({ brand,  handleUpdate , handleInsert, errors}) {
    const [formBrand, setFormBrand] = useState(brand ? brand : '')

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (<div>
        {brand ?
            <div className="form-update row p-5 fs-2">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-4 fw-bold">
                        <label>Thay đổi thông tin người dùng </label></div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Họ và tên</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder={formBrand.fullname} onChange={(e) => setFormBrand({ ...formBrand, fullname: e.target.value })} disabled />
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="name">Email</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="email" placeholder={formBrand.email} onChange={(e) => setFormBrand({ ...formBrand, email: e.target.value })} disabled />
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Số điện thoại</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="phone" placeholder={formBrand.phone} onChange={(e) => setFormBrand({ ...formBrand, phone: e.target.value })} disabled />
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="price">Địa chỉ</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="address" placeholder={formBrand.address} onChange={(e) => setFormBrand({ ...formBrand, address: e.target.value })} disabled />
                    </div>
                </div>

                <div className="mt-5">
                    <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => { handleUpdate(formBrand) }}>Xác nhận</button>
                    <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
            :
            //INSERT USER------------------
            <div className="form-update row p-5 fs-2">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-4 fw-bold">
                        <label>Thêm mới người dùng </label></div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Họ và tên</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder={formBrand.fullname} onChange={(e) => setFormBrand({ ...formBrand, fullname: e.target.value })} />
                        {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="name">Email</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="email" placeholder={formBrand.email} onChange={(e) => setFormBrand({ ...formBrand, email: e.target.value })} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Số điện thoại</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="phone" placeholder={formBrand.phone} onChange={(e) => setFormBrand({ ...formBrand, phone: e.target.value })} />
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="price">Địa chỉ</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="address" placeholder={formBrand.address} onChange={(e) => setFormBrand({ ...formBrand, address: e.target.value })} />
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                    </div>
                </div>



                <div className="row mt-2">
                    <div className="mb-3 col-md-5 h-50">
                        <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                        <input style={{ height: '35px' }} type="password" className="form-control form-control-lg" id="newPassword" onChange={(e) =>setFormBrand({ ...formBrand, password: e.target.value })} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                </div>

                <div className="mt-5">
                    <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => { handleInsert(formBrand) }}>Xác nhận</button>
                    <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
        }

    </div>);
}

export default FormBrand;