import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FormProduct({ product, handleUpdate, handleInsert, brands, categories }) {
    const [formProduct, setFormProduct] = useState(product ? product : '');
    const [mainImage, SetMainImage] = useState();
    const [images, SetImages] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitUpdate = () => {
        let newErrors = {};
        if (!formProduct.name) {
            newErrors.name = 'Tên bắt buộc';
        }
        if (!formProduct.mainImage) {
            newErrors.mainImage = 'Ảnh bắt buộc';
        }
        if (!formProduct.images) {
            newErrors.images = 'Ảnh bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleUpdate(formProduct, mainImage, images);
        }
    };
    const handleSubmitCreate = () => {
        let newErrors = {};
        if (!formProduct.name) {
            newErrors.name = 'Tên bắt buộc';
        }
        if (!formProduct.price) {
            newErrors.price = 'Giá bắt buộc';
        }
        if (!mainImage) {
            newErrors.mainImage = 'Ảnh bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleInsert(formProduct, mainImage, images);
        }
    };

    return (
        <div>
            {product ? (
                <div className="form-update row p-5 fs-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-5 fw-bold">
                            <label>Thay đổi thông tin sản phẩm </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                                defaultValue={formProduct.name}
                            />
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Giá sản phẩm</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                                defaultValue={formProduct.price}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className="row">
                            <div className="form-group col-md-5">
                                <label htmlFor="brand">Thương hiệu</label>
                                <select
                                    style={{ height: '40px' }}
                                    className="form-control form-control-lg"
                                    id="brand"
                                    onChange={(e) => setFormProduct({ ...formProduct, brandId: e.target.value })}
                                    defaultValue={formProduct.brandId}
                                >
                                    <option value={formProduct.brandName}>Hiện tại: {formProduct.brandName}</option>
                                    {brands &&
                                        brands.map((item) => (
                                            <option key={item.id} defaultValue={formProduct.brandId} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.brand && <span className="text-danger">{errors.brand}</span>}
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="brand">Thể loại</label>
                                <select
                                    style={{ height: '40px' }}
                                    className="form-control form-control-lg"
                                    id="category"
                                    onChange={(e) => setFormProduct({ ...formProduct, categoryId: e.target.value })}
                                >
                                    <option value={formProduct.categoryName}>
                                        Hiện tại: {formProduct.categoryName}
                                    </option>
                                    {categories &&
                                        categories.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.category && <span className="text-danger">{errors.category}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-5">
                                <label htmlFor="name">Ảnh Chính</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="main-image"
                                    onChange={(e) => SetMainImage(e.target.files[0])}
                                />
                                <div className="mt-3" style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                    {mainImage ? (
                                        <img className="w-50 h-50" src={URL.createObjectURL(mainImage)} />
                                    ) : (
                                        <img className="w-50 h-50" src={formProduct.mainImage} />
                                    )}
                                </div>
                                {errors.image && <span className="text-danger">{errors.image}</span>}
                            </div>

                            <div className="form-group col-md-5">
                                <label htmlFor="name">Ảnh Phụ</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="main-image"
                                    onChange={(e) => SetImages(e.target.files)}
                                    multiple
                                />
                                <div className="mt-3">
                                    <div className="row">
                                        {images
                                            ? [...images].map((item, index) => (
                                                  <div
                                                      className="col-md-4"
                                                      key={index}
                                                      style={{ maxHeight: '300px', maxWidth: '250px' }}
                                                  >
                                                      <img className="w-100 h-100" src={URL.createObjectURL(item)} />
                                                  </div>
                                              ))
                                            : formProduct.images.map((item) => (
                                                  <img className="w-50 h-50" src={item} />
                                              ))}
                                    </div>
                                </div>
                                {errors.image && <span className="text-danger">{errors.image}</span>}
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-5">
                                <label htmlFor="name">Thông số kỹ thuật</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formProduct.specification}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormProduct({ ...formProduct, specification: data });
                                    }}
                                />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="name">Ưu đãi, quà tặng</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formProduct.specialOffer}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormProduct({ ...formProduct, specialOffer: data });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <label htmlFor="name">Mô tả</label>
                            <div className="col-md-10">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formProduct.description}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormProduct({ ...formProduct, description: data });
                                    }}
                                />
                            </div>
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
                            <label>Thêm mới sản phẩm </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Giá sản phẩm</label>
                            <input
                                style={{ height: '40px' }}
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                            />
                            {errors.price && <span className="text-danger">{errors.price}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="brand">Thương hiệu</label>
                            <select
                                style={{ height: '40px' }}
                                className="form-control form-control-lg"
                                id="brand"
                                onChange={(e) => setFormProduct({ ...formProduct, brandId: e.target.value })}
                            >
                                <option value={''}>-- Thương hiệu --</option>
                                {brands &&
                                    brands.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.brand && <span className="text-danger">{errors.brand}</span>}
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="brand">Thể loại</label>
                            <select
                                style={{ height: '40px' }}
                                className="form-control form-control-lg"
                                id="category"
                                onChange={(e) => setFormProduct({ ...formProduct, categoryId: e.target.value })}
                            >
                                <option value={''}>-- Thể loại --</option>
                                {categories &&
                                    categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.category && <span className="text-danger">{errors.category}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
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
                            {errors.mainImage && <span className="text-danger">{errors.mainImage}</span>}
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="name">Ảnh Phụ</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="main-image"
                                onChange={(e) => SetImages(e.target.files)}
                                multiple
                            />
                            <div className="mt-3">
                                <div className="row">
                                    {images &&
                                        [...images].map((item, index) => (
                                            <div
                                                className="col-md-4"
                                                key={index}
                                                style={{ maxHeight: '300px', maxWidth: '250px' }}
                                            >
                                                <img className="w-100 h-100" src={URL.createObjectURL(item)} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {errors.image && <span className="text-danger">{errors.image}</span>}
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-5">
                            <label htmlFor="name">Thông số kỹ thuật</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formProduct.specification}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFormProduct({ ...formProduct, specification: data });
                                }}
                            />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="name">Ưu đãi, quà tặng</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formProduct.specialOffer}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFormProduct({ ...formProduct, specialOffer: data });
                                }}
                            />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <label htmlFor="name">Mô tả</label>
                        <div className="col-md-10">
                            <CKEditor
                                editor={ClassicEditor}
                                data={formProduct.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFormProduct({ ...formProduct, description: data });
                                }}
                            />
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

export default FormProduct;
