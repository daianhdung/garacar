import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormCoupon({ coupon, handleUpdate, handleInsert}) {
    const [formCoupon, setFormCoupon] = useState(coupon ? coupon : "");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitUpdate = () => {
        let newErrors = {};
        if (!formCoupon.name) {
            newErrors.name = 'Tên bắt buộc';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleUpdate(formCoupon);
        }
    };
    const handleSubmitCreate = () => {
        let newErrors = {};
        if (!formCoupon.name) {
            newErrors.name = 'Tên bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleInsert(formCoupon);
        }
    };

    return (
        <div>
            {coupon ? (
                <div className="form-update row p-5 fs-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-5 fw-bold">
                            <label>Thay đổi thông tin coupon </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên Coupon</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormCoupon({ ...formCoupon, name: e.target.value })}
                                defaultValue={formCoupon.name}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Couponname</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="couponname"
                                onChange={(e) => setFormCoupon({ ...formCoupon, rate: e.target.value })}
                                defaultValue={formCoupon.rate}
                            />
                            {errors.rate && <span className="text-danger">{errors.rate}</span>}
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
                            <label>Thêm mới coupon </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên Coupon</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormCoupon({ ...formCoupon, name: e.target.value })}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Rate</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="couponname"
                                onChange={(e) => setFormCoupon({ ...formCoupon, rate: e.target.value })}
                            />
                            {errors.rate && <span className="text-danger">{errors.rate}</span>}
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

export default FormCoupon;
