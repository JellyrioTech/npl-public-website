import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import Footer from "../components/Footer";

const UserMainRouteGuard: React.FC = () => {
    const authCheck = Cookies.get("auth_check");
    console.log(authCheck);
    if (authCheck === undefined || authCheck === "false") {
        return <Navigate to={"/register"} />;
    }
    return (
        <div>
            <NavBar />
            <main className="w-full min-h-full bg-neutral-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserMainRouteGuard;
