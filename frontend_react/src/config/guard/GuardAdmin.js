import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";


const GuardAdmin = () => {
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isLogin = useSelector(state => state.auth.isLogin);
    const location = useLocation()
    

    return (
        isAdmin && isLogin
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default GuardAdmin