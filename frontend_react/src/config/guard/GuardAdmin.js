import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "~/hooks/useAuth";


const GuardAdmin = () => {

    const context = useAuth()
    const location = useLocation()
    

    return (
        context.authProvider.isLogin && context.authProvider.isAdmin
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default GuardAdmin