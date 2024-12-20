import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRouteGuardVM } from "./AdminRouteGuardVM";
import AdminNavBar from "../components/AdminNavBar";
import { routes } from "../util/routes";
import { useLoader } from "../components/LoaderProvider";
import Loader from "../components/Loader";

const AdminRouteGuard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [_, setError] = useState("");
    const [isUserAdmin, setIsUserAdmin] = useState<boolean | null>(null);
    const { loading } = useLoader();

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
        return <Navigate to={routes.Login} />;
    }

    if (isUserAdmin !== null && isUserAdmin) {
        return (
            <div>
                {loading && <Loader />}
                <AdminNavBar />
                <main className="w-full min-h-screen bg-neutral-100 lg:p-10">
                    <Outlet />
                </main>
            </div>
        );
    }

    return null;
};

export default AdminRouteGuard;
