import * as privateRequest from '~/utils/privateRequest';

export const getOrders = async() => {
    try{
        const response = await privateRequest.getToken('admin/order/all')
        return response.data
    }catch(error){
        console.log(error);
    }
}
export const getAllStatus = async() => {
    try{
        const response = await privateRequest.getToken('admin/status/all')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getOrderById = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/order/get/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}
export const updateOrderStatus = async(orderDTO) => {
    try{
        const response = await privateRequest.putBodyToken(`admin/order`, orderDTO)
        return response
    }catch(error){
        console.log(error);
    }
}