import { errorToast } from '~/components/Popups';
import * as httpRequest from '~/utils/httpRequest';

export const CheckoutOrder = async(userDto, deliveryAddress,
    productDTOList, coupon, tempTotal, total, costDeli) => {
    try {
        const response = await httpRequest.post('order', {
            userDTO: userDto,
            deliveryAddress,
            productDTOList,
            coupon,
            tempTotal,
            total,
            feeShip: costDeli
        })
        return response
    }catch (error) {
        console.log(error);
        errorToast(error.response.data.desc)
    }
}

export const getOrderDetail = async (token) => {
    try {
        const res = await httpRequest.get(`order/success/${token}`);
        return res
    } catch (err) {
        console.error(err);
    }
};