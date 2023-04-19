import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "~/hooks/useAuth";


const RequireAuthUser = () => {
    const context = useAuth()
    const location = useLocation()
    
    return (
        context.authProvider.isLogin
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuthUser