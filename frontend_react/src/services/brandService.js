import * as httpRequest from '~/utils/httpRequest';



export const getAllBrandName = async() => {
    try{
        const response = await httpRequest.get('brand')
        return response.data
    }catch(error){
        console.log(error);
    }
}
