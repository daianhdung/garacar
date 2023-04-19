import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_DEFAULT_API_URL,
});


export const post = async (path, option = {}) => {
    const response = await httpRequest.post(path, option)
    return response.data;
}

export const postParams = async (path, json = {}, params = {}) => {
    const response = await httpRequest.post(path, json, {
        params: params
    })
    return response.data;
}


export const postTokenHeader = async (path, data, headers) => {
    const response = await httpRequest.post(path, data, headers)
    return response.data;
}
export const postParamsToken = async (path, data, headers) => {
    const response = await httpRequest.post(path,{}, data, headers)
    return response.data;
}

export const get = async (path = {}) => {
    const response = await httpRequest.get(path)
    return response.data;
}

export const getTokenHeader = async (path, headers) => {
    const response = await httpRequest.get(path, headers)
    return response.data;
}


export const getParams = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const putParamToken = async (path, data, headers) => {
    const response = await httpRequest.put(path, data, headers)
    return response.data;
}

export const getToken = async (path, headers) => {
    const response = await httpRequest.get(path, headers)
    return response.data;
}


export default httpRequest

