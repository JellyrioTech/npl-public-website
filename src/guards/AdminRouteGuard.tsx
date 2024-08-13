import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRouteGuardVM } from "./AdminRouteGuardVM";
import AdminNavBar from "../components/AdminNavBar";

const AdminRouteGuard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isUserAdmin, setIsUserAdmin] = useState<boolean | null>(null);

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
    if (isUserAdmin !== null && !isUserAdmin) {
        return <Navigate to={"/login"} />;
    }

    if (isUserAdmin !== null && isUserAdmin) {
        return (
            <div>
                <AdminNavBar />
                <main className="w-full h-screen bg-neutral-100 md:p-10">
                    <Outlet />
                </main>
            </div>
        );
    }

    return null;
};

export default AdminRouteGuard;
