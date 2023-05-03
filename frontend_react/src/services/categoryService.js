import * as httpRequest from '~/utils/httpRequest';



export const getAllCategory = async() => {
    try{
        const response = await httpRequest.get('category/all')
        return response.data
    }catch(error){
        console.log(error);
    }
}
