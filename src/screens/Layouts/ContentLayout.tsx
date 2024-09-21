import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { useLoader } from "../../components/LoaderProvider";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const ContentLayout: React.FC = () => {
    const { loading } = useLoader();
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

export default ContentLayout;
