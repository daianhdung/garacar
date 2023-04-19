import * as httpRequest from '~/utils/httpRequest';


export const getProduct= async(data, token) => {
    try{
        const response = await httpRequest.postTokenHeader('product/filter',data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}



