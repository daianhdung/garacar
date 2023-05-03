import * as httpRequest from '~/utils/httpRequest';



export const getAllProduct = async() => {
    try{
        const response = await httpRequest.get('product/all')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getAllProductFilter = async(data) => {
    try{
        const response = await httpRequest.post('product/filter', data)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getDetailProduct = async(id) => {
    try{
        const response = await httpRequest.get(`product/${id}`)
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
