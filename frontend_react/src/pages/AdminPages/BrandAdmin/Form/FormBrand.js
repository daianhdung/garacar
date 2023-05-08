import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormBrand({ brand, handleUpdate, handleInsert }) {
    const [formBrand, setFormBrand] = useState(brand ? brand : '');
    const [mainImage, SetMainImage] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitUpdate = () => {
        let newErrors = {};
        if (!formBrand.name) {
            newErrors.name = 'Tên bắt buộc';
        }
        if (!formBrand.image) {
            newErrors.image = 'Ảnh bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleUpdate(formBrand, mainImage);
        }
    };
    const handleSubmitCreate = () => {
        let newErrors = {};
        if (!formBrand.name) {
            newErrors.name = 'Tên bắt buộc';
        }
        if (!mainImage) {
            newErrors.image = 'Ảnh bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleInsert(formBrand, mainImage);
        }
    };

    return (
        <div>
            {brand ? (
                <div className="form-update row p-5 fs-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-5 fw-bold">
                            <label>Thay đổi thông tin thương hiệu </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên thương hiệu</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormBrand({ ...formBrand, name: e.target.value })}
                                defaultValue={formBrand.name}
                            />
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Ảnh</label>
                            <div style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                {mainImage ? (
                                    <img className="w-50 h-50" src={URL.createObjectURL(mainImage)} />
                                ) : (
                                    <img className="w-50 h-50" src={formBrand.image} />
                                )}
                            </div>
                            <input
                                type="file"
                                className="form-control-file"
                                id="main-image"
                                onChange={(e) => SetMainImage(e.target.files[0])}
                            />
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
                            <label>Thêm mới thương hiệu </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên thương hiệu</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormBrand({ ...formBrand, name: e.target.value })}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Ảnh</label>
                            <div style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                {mainImage && <img className="w-50 h-50" src={URL.createObjectURL(mainImage)} />}
                            </div>
                            <input
                                type="file"
                                className="form-control-file"
                                id="main-image"
                                onChange={(e) => SetMainImage(e.target.files[0])}
                            />
                            {errors.image && <span className="text-danger">{errors.image}</span>}
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

export default FormBrand;
