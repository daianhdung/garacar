import axios from "axios";



const provinceOpen = axios.create({
    baseURL: process.env.REACT_APP_PROVINCE_API_URL,
});


export const get = async (path = {}) => {
    const response = await provinceOpen.get(path)
    return response.data;
}

export const getParams = async (path, options = {}) => {
    const response = await provinceOpen.get(path, options);
    return response.data;
};

export default provinceOpen