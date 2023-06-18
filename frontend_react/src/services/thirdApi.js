import * as httpRequest from '~/utils/httpRequest';
import * as provinceOpen from '~/utils/thirdRequest';

export const getProvince = async () => {
    try {
        const res = await provinceOpen.get(`p`);
        return res
    } catch (err) {
        console.error(err);
    }
};


export const searchDistrictOnCode = async (code, depth = 2) => {
    try {
        const res = await provinceOpen.get(`p/${code}?depth=${depth}`);
        return res
    } catch (err) {
        console.error(err);
    }
};

export const searchWardOnCode = async (code, depth = 2) => {
    try {
        const res = await provinceOpen.get(`d/${code}?depth=${depth}`);
        return res
    } catch (err) {
        console.error(err);
    }
};


export const getIpUser = async () => {
    try {
        const res = await provinceOpen.testAPI.get(`https://api.bigdatacloud.net/data/client-ip`);
        return res.data
    } catch (err) {
        console.error(err);
    }
};