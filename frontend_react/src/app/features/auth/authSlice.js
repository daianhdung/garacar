import { decodeToken } from 'react-jwt';
import { createSlice } from '@reduxjs/toolkit';
import { getCookie, removeCookie, saveCookie } from '~/utils/utilsCookie';

function checkTokenAuth() {
    let isAdmin = '';
    let isLogin = '';
    let username = '';
    if (getCookie('tokenJwt')) {
        const token = getCookie('tokenJwt');
        const myDecodedToken = decodeToken(token);
        const decodeInform = JSON.parse(myDecodedToken.sub);
        if (decodeInform.role == 'ROLE_ADMIN') {
            isAdmin = true;
            isLogin = true;
            username = decodeInform.username;
        } else {
            isLogin = true;
            username = decodeInform.username;
        }
    }
    return {
        isAdmin,
        isLogin,
        username,
    };
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: checkTokenAuth(),
    reducers: {
        login: (state, action) => {
            const myDecodedToken = decodeToken(action.payload.token);
            const myDecodedRefreshToken = decodeToken(action.payload.freshToken);
            const expiredToken = myDecodedToken.exp - myDecodedToken.iat;
            const expiredRefreshToken = myDecodedRefreshToken.exp - myDecodedRefreshToken.iat;
            const tokenDecoded = JSON.parse(myDecodedToken.sub);
            saveCookie('tokenJwt', action.payload.token, expiredToken);
            saveCookie('tokenJwtRefresh', action.payload.freshToken, expiredRefreshToken);
            if (action.payload.role == 'ROLE_ADMIN') {
                state.isAdmin = true;
                state.isLogin = true;
                state.username = tokenDecoded.username;
            } else {
                state.isLogin = true;
                state.username = tokenDecoded.username;
            }
        },
        logout: (state) => {
            removeCookie('tokenJwt');
            removeCookie('tokenJwtRefresh');
            state.isAdmin = ''
            state.isLogin = ''
            state.username = ''
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
