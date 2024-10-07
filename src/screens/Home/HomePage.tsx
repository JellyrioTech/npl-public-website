import landingBG from "../../../public/bgimg.png";
import { useNavigate } from "react-router-dom";
import { routes } from "../../util/routes";
import NPLButtonSquare from "../../components/NPLButtonSquare";

function HomePage() {
    const tournamentId = "3";

    const handleRegisterForCurrentTournamentButton = () => {
        window.location.pathname = `${routes.CurrentTournamentRegistration}/${tournamentId}`;
    };

    return (
        <section
            className="relative w-full min-h-screen bg-no-repeat bg-cover flex justify-center bg-fixed items-center"
            style={{ backgroundImage: `url(${landingBG})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            <div className="w-full lg:max-w-[1200px] px-10 lg:p-0 min-h-screen relative flex flex-col items-start justify-center gap-2 lg:gap-3">
                <p className="text-secondary-300 font-roboto font-light text-lg">
                    Upcoming tournament
                </p>
                <p className="font-oswald font-bold text-4xl lg:text-5xl text-neutral-100">
                    Arena Battle Series
                </p>
                <p className="text-neutral-100 font-roboto text-xl lg:text-2xl">
                    October 27 at 12:00 pm
                </p>
                <div className="mt-4">
                    <NPLButtonSquare
                        onClick={handleRegisterForCurrentTournamentButton}
                        text={"Register Now"}
                    ></NPLButtonSquare>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
