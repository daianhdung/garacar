import * as httpRequest from '~/utils/httpRequest';



export const getVisitor = async() => {
    try{
        const response = await httpRequest.get('visitor')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const newVisitor = async(visitorDTO) => {
    try{
        const response = await httpRequest.post('visitor', visitorDTO)
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const endVisitor = async(visitorDTO) => {
    try{
        const response = await httpRequest.putParamToken('visitor', visitorDTO)
        return response.data
    }catch(error){
        console.log(error);
    }
}