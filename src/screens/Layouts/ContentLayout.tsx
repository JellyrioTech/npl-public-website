import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { useLoader } from "../../components/LoaderProvider";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const ContentLayout: React.FC = () => {
    const { loading } = useLoader();
    return (
        <div className="relative min-h-screen">
            {loading && <Loader />}
            <NavBar />
            <main className="pt-[70px]">
                <div className="relative z-20">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContentLayout;
