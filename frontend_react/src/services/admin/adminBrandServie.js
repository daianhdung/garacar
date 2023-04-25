import * as httpRequest from '~/utils/httpRequest';
import * as privateRequest from '~/utils/privateRequest';



export const getAllBrand = async() => {
    try{
        const response = await privateRequest.getToken('admin/brands')
        return response.data
    }catch(error){
        console.log(error);
    }
}


export const getBrandId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/brand/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const createBrand = async(data) => {
    try{
        const response = await privateRequest.postBodyToken(`admin/brand`, data)
        return response
    }catch(error){
        console.log(error);
    }
}


export const updateBrandById = async(id,data) => {
    try{
        const response = await privateRequest.putBodyToken(`admin/brand/${id}`, data)
        return response
    }catch(error){
        console.log(error);
    }
}

export const deleteBrandById = async(id) => {
    try{
        const response = await privateRequest.deteteAdmin(`admin/brand/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}
