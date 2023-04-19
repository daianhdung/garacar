import * as httpRequest from '~/utils/httpRequest';



export const getAllBrand = async() => {
    try{
        const response = await httpRequest.get('admin-brand')
        return response.data
    }catch(error){
        console.log(error);
    }
}
