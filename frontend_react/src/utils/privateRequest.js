import axios from "axios";
import { decodeToken } from "react-jwt";
import { getCookie, saveCookie } from "./utilsCookie";

export const privateRequest = axios.create({
    baseURL: process.env.REACT_APP_DEFAULT_API_URL,
});


export const postParams = async (path, json = {}, params = {}) => {
    const response = await privateRequest.post(path, json, {
        params: params
    })
    return response.data;
}


export const putParamToken = async (path, data, headers) => {
    const response = await privateRequest.put(path, data, headers)
    return response.data;
}

export const postBodyToken = async (path, json = {}, headers) => {
    const response = await privateRequest.post(path, json, headers)
    return response.data;
}

export const putBodyToken = async (path, json = {}, headers) => {
    const response = await privateRequest.put(path, json, headers)
    return response.data;
}

export const getToken = async (path, headers) => {
    const response = await privateRequest.get(path, headers)
    return response.data;
}

export const postTokenHeader = async (path, data, headers) => {
    const response = await privateRequest.post(path, data, headers)
    return response.data;
}

privateRequest.interceptors.response.use(
    async response => {
        return response;
    },
    async error => {
        if (error.response.status === 403 && !error.config._isRetryRequest) {
            error.config._isRetryRequest = true;
            try {
                const token = getCookie("tokenJwtRefresh")
                const response  = await postParams('auth/refresh-token', {}, {
                    token: token
                });
                const myDecodedToken = decodeToken(response.data.token);
                const myDecodedRefreshToken = decodeToken(response.data.freshToken);
                const expiredToken = myDecodedToken.exp - myDecodedToken.iat
                const expiredRefreshToken = myDecodedRefreshToken.exp - myDecodedRefreshToken.iat
                console.log(response);
                saveCookie("tokenJwt", response.data.token, expiredToken)
                saveCookie("tokenJwtRefresh", response.data.freshToken, expiredRefreshToken)
                privateRequest.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                error.config.headers.Authorization = `Bearer ${response.data.token}`;
                return privateRequest(error.config);
            } catch (err) {
                console.log(err);
            }
        }
        return Promise.reject(error);
    }
)