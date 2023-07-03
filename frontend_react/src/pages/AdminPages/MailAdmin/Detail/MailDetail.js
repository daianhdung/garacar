import { useEffect, useState } from 'react';
import { errorToast, successToast } from '~/components/Popups';

import * as mailService from '~/services/admin/adminMailService';
import FormMail from '../Form/FormMail';
import { useParams } from 'react-router-dom';

function MailDetail() {
    const { id } = useParams();
    const [mail, setMail] = useState();

    useEffect(() => {
        const fetchApiGetProduct = async () => {
            const response = await mailService.getMailId(id);
            setMail(response);
        };
        fetchApiGetProduct();
    }, []);

    return (
        <div>
            {mail ? 
            <FormMail mail={mail} />
             : (
                <div>Không tìm thấy mail </div>
            )}
        </div>
    );
}

export default MailDetail;
