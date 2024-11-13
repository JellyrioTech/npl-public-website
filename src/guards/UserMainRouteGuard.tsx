import { Navigate, Outlet, useParams } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderProvider";
import Loader from "../components/Loader";
import { GetTournamentId } from "../DefaultTournamentId";

const UserMainRouteGuard: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const authCheck = Cookies.get("auth_check");
    const { loading } = useLoader();
    console.log(authCheck);
    if (authCheck === undefined || authCheck === "false") {
        return <Navigate to={`/register/${GetTournamentId(tournamentId)}`} />;
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
