import { errorToast } from '~/components/Popups';

import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const response = await httpRequest.post('auth/signin', {
            email: email,
            password: password,
        });
        return response;
    } catch (error) {
        errorToast(error);
    }
};

export const apiRefreshToken = async (token) => {
    try {
        const response = await httpRequest.postParams(
            'auth/refresh-token',
            {},
            {
                token: token,
            },
        );
        return response;
    } catch (error) {
        errorToast(error);
    }
};
