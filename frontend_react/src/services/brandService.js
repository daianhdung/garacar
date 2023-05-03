import * as httpRequest from '~/utils/httpRequest';



export const getAllBrand = async() => {
    try{
        const response = await httpRequest.get('brand/all')
        return response.data
    }catch(error){
        console.log(error);
    }
}
