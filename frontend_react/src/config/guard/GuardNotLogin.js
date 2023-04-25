import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "~/hooks/useAuth";


const GuardNotLogin = () => {
    const context = useAuth()
    const authProvider = context.authProvider

    if (authProvider.isLogin && !authProvider.isAdmin) {
        return <Navigate to="/home" replace />
    } else if(authProvider.isLogin && authProvider.isAdmin) {
        return <Navigate to="/admin-home" replace />
    }else{
        return <Outlet/>
    }


}

export default GuardNotLogin