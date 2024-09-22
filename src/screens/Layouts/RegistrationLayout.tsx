import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import { useLoader } from "../../components/LoaderProvider";

const RegistrationLayout: React.FC = () => {
    const { loading } = useLoader();

    return (
        <div className="relative min-h-screen">
            {loading && <Loader />}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default RegistrationLayout;
