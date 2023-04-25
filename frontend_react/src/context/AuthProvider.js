import { decodeToken } from "react-jwt";
import { apiRefreshToken } from "~/services/loginService";
import { getCookie, removeCookie, saveCookie } from "~/utils/utilsCookie";

const { createContext, useRef, useState, useEffect } = require("react");

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    if (getCookie('tokenJwt')) {
        const token = getCookie('tokenJwt')
        const myDecodedToken = decodeToken(token);
        const decodeInform = JSON.parse(myDecodedToken.sub);
        if (decodeInform.role === 'ROLE_ADMIN') {
            var isAdmin = true
            var isLogin = true
            var username = decodeInform.username
        } else {
            var isLogin = true
            var username = decodeInform.username
        }
    }

    const [auth, setAuth] = useState({ isAdmin: isAdmin ? isAdmin : '', username: username ? username : '', isLogin: isLogin ? isLogin : '' })


    //decode token get inform user
    useEffect(() => {
        if (getCookie('tokenJwtRefresh')) {
            const token = getCookie('tokenJwtRefresh')
            const fetchApiRefreshToken = async () => {
                const response = await apiRefreshToken(token)
                if (response.success) {
                    const myDecodedToken = decodeToken(response.data.token);
                    const myDecodedRefreshToken = decodeToken(response.data.freshToken);
                    const expiredToken = myDecodedToken.exp - myDecodedToken.iat
                    const expiredRefreshToken = myDecodedRefreshToken.exp - myDecodedRefreshToken.iat
                    saveCookie("tokenJwt", response.data.token, expiredToken)
                    saveCookie("tokenJwtRefresh", response.data.freshToken, expiredRefreshToken)
                    const tokenDecoded = JSON.parse(myDecodedToken.sub);
                    if (tokenDecoded.role === 'ROLE_ADMIN') {
                        setAuth({ isAdmin: true, username: tokenDecoded.username, isLogin: true })
                    } else {
                        setAuth({ ...auth, username: tokenDecoded.username, isLogin: true })
                    }
                }
                return response
            }
            fetchApiRefreshToken();
        }

    }, [])


    const logout = function () {
        removeCookie('tokenJwt');
        removeCookie('tokenJwtRefresh');
        setAuth({ isAdmin: '', username: '', isLogin: '' })
    }

    const value = {
        authProvider: auth,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext