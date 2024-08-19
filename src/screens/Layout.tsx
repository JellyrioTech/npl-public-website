import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useLoader } from "../components/LoaderProvider";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    const { loading } = useLoader();
    return (
        <div>
            {loading && <Loader />}
            <NavBar />
            <main className="block">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
