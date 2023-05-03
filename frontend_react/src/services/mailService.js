import * as httpRequest from '~/utils/httpRequest';



export const createMail = async(data) => {
    try{
        const response = await httpRequest.post(`mail`, data)
        return response
    }catch(error){
        console.log(error);
    }
}
