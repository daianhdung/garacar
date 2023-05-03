import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '~/pages/AdminPages/MailAdmin/Form/FormMail.scss';

function FormMail({ mail, handleUpdate, handleInsert }) {
    const [formMail, setFormMail] = useState(mail ? mail : '');
    const [errors, setErrors] = useState({});

    const [formReply, setFormReply] = useState({subject: '', message : ''});

    console.log(formReply);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitUpdate = () => {
        let newErrors = {};
        if (!formMail.name) {
            newErrors.name = 'Tên bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleUpdate(formMail);
        }
    };

    return (
        <div>
            {formMail && (
                <>
                    <div className="form-update row p-5 fs-4">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-5 fw-bold">
                                <label>Chi tiết tin nhắn </label>
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
                                    defaultValue={formMail.fullName}
                                    readOnly
                                />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="name">Email</label>
                                <input
                                    style={{ height: '40px' }}
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="name"
                                    defaultValue={formMail.email}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="row my-4">
                            <div className="form-group col-md-10">
                                <textarea
                                    required=""
                                    className="form-control form-control-lg"
                                    id="message"
                                    name="message"
                                    defaultValue={formMail.message}
                                    readOnly
                                ></textarea>
                            </div>
                        </div>

                        <div className="row justify-content-center mb-2">
                            <div className="col-md-5 fw-bold">
                                <label>Form mail trả lời </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-5 mb-4">
                                <label htmlFor="name">Chủ đề</label>
                                <input
                                    style={{ height: '40px' }}
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="name"
                                    onChange={(e) => setFormReply({...formReply, subject : e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10" style={{ minHeight: '300px' }}>
                                <CKEditor
                                    style={{ minHeight: '300px' }}
                                    editor={ClassicEditor}
                                    data={formReply.message}
                                    onReady={(editor) => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormReply({...formReply, message : data})
                                    }}
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
                </>
            )}
        </div>
    );
}

export default FormMail;
