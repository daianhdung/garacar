import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const GuardNotLogin = () => {
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isLogin = useSelector(state => state.auth.isLogin);
    const user = useSelector(state => state.auth.user);

    if (isLogin && !isAdmin) {
        return <Navigate to="/home" replace />
    } else if(isLogin && isAdmin) {
        return <Navigate to="/admin-home" replace />
    }else{
        return <Outlet/>
    }


}

export default GuardNotLogin