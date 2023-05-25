
import * as httpRequest from '~/utils/httpRequest';




export const searchCoupon = async (coupon) => {
    try {
        const res = await httpRequest.getParams('coupon', {
            params: {
                coupon
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};