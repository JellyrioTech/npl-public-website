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
        <div className="bg-neutral-100 flex flex-col relative min-h-screen">
            {loading && <Loader />}
            <NavBar />
            <main className="pt-32 w-full font-regular">
                <div className="relative z-20">
                    <Outlet />
                </div>
            </main>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default UserMainRouteGuard;
