import * as httpRequest from '~/utils/httpRequest';



export const getFeaturedProduct = async() => {
    try{
        const response = await httpRequest.get('product/top-product-branch')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getTopSoldProduct = async() => {
    try{
        const response = await httpRequest.get('product/top-product')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getDetailProduct = async(id) => {
    try{
        const response = await httpRequest.get('product/detail-product/' + id)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const searchProduct = async (keyword, type = 'less') => {
    try {
        const res = await httpRequest.getParams('product/search-product', {
            params: {
                keyword,
                type
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const searchBrandOrCategory = async (brandId, categoryId) => {
    try {
        const res = await httpRequest.getParams('product/search-productby', {
            params: {
                brandId,
                categoryId
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};