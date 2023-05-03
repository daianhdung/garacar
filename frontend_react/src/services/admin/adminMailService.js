
import * as privateRequest from '~/utils/privateRequest';



export const getAllMail = async() => {
    try{
        const response = await privateRequest.getToken('admin/mails')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getMailId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/mail/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const deleteMailById = async(id) => {
    try{
        const response = await privateRequest.deteteAdmin(`admin/mail/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}
