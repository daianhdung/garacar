import * as privateRequest from '~/utils/privateRequest';



export const getAllProduct = async() => {
    try{
        const response = await privateRequest.getToken('admin/products')
        return response.data
    }catch(error){
        console.log(error);
    }
}


export const getProductId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/product/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const createProduct = async(data) => {
    try{
        const response = await privateRequest.postBodyToken(`admin/product`, data)
        return response
    }catch(error){
        console.log(error);
    }
}


export const updateProductById = async(id,data) => {
    try{
        const response = await privateRequest.putBodyToken(`admin/product/${id}`, data)
        return response
    }catch(error){
        console.log(error);
    }
}

export const deleteProductById = async(id) => {
    try{
        const response = await privateRequest.deteteAdmin(`admin/product/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}
