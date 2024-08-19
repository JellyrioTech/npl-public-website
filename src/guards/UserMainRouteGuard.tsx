import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderProvider";
import Loader from "../components/Loader";

const UserMainRouteGuard: React.FC = () => {
    const authCheck = Cookies.get("auth_check");
    const { loading } = useLoader();
    console.log(authCheck);
    if (authCheck === undefined || authCheck === "false") {
        return <Navigate to={"/register"} />;
    }

    return (
        <div>
            {loading && <Loader />}
            <NavBar />
            <main className="w-full min-h-full bg-neutral-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserMainRouteGuard;
