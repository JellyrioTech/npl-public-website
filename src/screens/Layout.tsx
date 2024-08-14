import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div>
            <NavBar />
            <main className="w-full h-screen bg-primary-900">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
