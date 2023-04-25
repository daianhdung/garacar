import * as privateRequest from '~/utils/privateRequest';



export const getAllCategory = async() => {
    try{
        const response = await privateRequest.getToken('admin/categories')
        return response.data
    }catch(error){
        console.log(error);
    }
}


export const getCategoryId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/category/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const createCategory = async(data) => {
    try{
        const response = await privateRequest.postBodyToken(`admin/category`, data)
        return response
    }catch(error){
        console.log(error);
    }
}


export const updateCategoryById = async(id,data) => {
    try{
        const response = await privateRequest.putBodyToken(`admin/category/${id}`, data)
        return response
    }catch(error){
        console.log(error);
    }
}

export const deleteCategoryById = async(id) => {
    try{
        const response = await privateRequest.deteteAdmin(`admin/category/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}
