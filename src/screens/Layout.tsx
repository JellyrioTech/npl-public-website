import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
