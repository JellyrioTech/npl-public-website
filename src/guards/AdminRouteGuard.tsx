import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRouteGuardVM } from "./AdminRouteGuardVM";

const AdminRouteGuard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        setError("");
        AdminRouteGuardVM.isUserAdmin({
            loaderCallback: (loader) => {
                setIsLoading(loader);
            },
            errorCallBack: () => {
                setError("Error getting admin status");
                setIsUserAdmin(false);
            },
            success: () => {
                setIsUserAdmin(true);
            },
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isUserAdmin || error !== "") {
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
};

export default AdminRouteGuard;
