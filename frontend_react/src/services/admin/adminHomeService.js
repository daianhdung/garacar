import * as httpRequest from '~/utils/httpRequest';

export const getStat = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/header', {
        
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}