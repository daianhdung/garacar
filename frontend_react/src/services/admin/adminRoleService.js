import * as privateRequest from '~/utils/privateRequest';



export const getAllRole = async() => {
    try{
        const response = await privateRequest.getToken('admin/roles')
        return response.data
    }catch(error){
        console.log(error);
    }
}


export const getRoleId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/role/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}