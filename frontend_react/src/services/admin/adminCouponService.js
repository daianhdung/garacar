import * as privateRequest from '~/utils/privateRequest';

export const getAllCoupon = async() => {
    try{
        const response = await privateRequest.getToken('admin/coupon/all')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const deleteCouponById = async(id) => {
    try{
        const response = await privateRequest.deteteAdmin(`admin/coupon/delete/${id}`)
        return response
    }catch(error){
        console.log(error);
    }
}

export const getCouponId = async(id) => {
    try{
        const response = await privateRequest.getToken(`admin/coupon/get/${id}`)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const updateCouponById = async(data) => {
    try{
        const response = await privateRequest.putBodyToken(`admin/coupon/update`, data)
        return response
    }catch(error){
        console.log(error);
    }
}

export const createCoupon = async(data) => {
    try{
        const response = await privateRequest.postBodyToken(`admin/coupon/insert`, data)
        return response
    }catch(error){
        console.log(error);
    }
}