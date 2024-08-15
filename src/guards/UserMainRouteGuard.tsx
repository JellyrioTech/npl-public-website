import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";

const UserMainRouteGuard: React.FC = () => {
    const authCheck = Cookies.get("auth_check");
    console.log(authCheck);
    if (authCheck === undefined || authCheck === "false") {
        return <Navigate to={"/register"} />;
    }
    return (
        <div>
            <NavBar />
            <main className="w-full h-screen bg-neutral-100 md:p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default UserMainRouteGuard;
