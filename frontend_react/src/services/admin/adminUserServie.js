import * as privateRequest from '~/utils/privateRequest';



export const getAllUser = async() => {
    try{
        const response = await privateRequest.getToken('admin/users')
        return response.data
    }catch(error){
        console.log(error);
    }
}


export const getUserId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/user/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const createUser = async(data) => {
    try{
        const response = await privateRequest.postBodyToken(`admin/user`, data)
        return response
    }catch(error){
        console.log(error);
    }
}


export const updateUserById = async(id,data) => {
    try{
        const response = await privateRequest.putBodyToken(`admin/user/${id}`, data)
        return response
    }catch(error){
        console.log(error);
    }
}

export const deleteUserById = async(id) => {
    try{
        const response = await privateRequest.deteteAdmin(`admin/user/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}
