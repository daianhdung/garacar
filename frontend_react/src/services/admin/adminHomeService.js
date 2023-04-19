import * as httpRequest from '~/utils/httpRequest';

export const getStat = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/header', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}