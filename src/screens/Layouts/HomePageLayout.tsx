import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { useLoader } from "../../components/LoaderProvider";
import NavBar from "../../components/NavBar";

const HomePageLayout: React.FC = () => {
    const { loading } = useLoader();
    return (
        <div className="relative min-h-screen">
            {loading && <Loader />}
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HomePageLayout;
