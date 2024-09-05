import landingBG from "../../../public/landingBG.jpg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../util/routes";
import Button from "../../components/Button";

function HomePage() {
    const navigate = useNavigate();

    const handleLearnMoreButton = () => {
        navigate(routes.LearnMore);
    };

    return (
        <section
            className="relative w-full min-h-screen bg-no-repeat bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${landingBG})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="w-full md:max-w-[1200px] px-10 md:p-0 min-h-screen relative flex flex-col items-start justify-center gap-2 md:gap-3">
                <p className="text-secondary-300 font-roboto font-light text-lg">
                    Upcoming tournament
                </p>
                <p className="font-oswald font-bold text-4xl md:text-5xl text-neutral-100">
                    Arena Battle Series
                </p>
                <p className="text-neutral-100 font-roboto text-xl md:text-2xl">
                    September 23 at 5:00 pm
                </p>
                <div className="mt-4">
                    <Button
                        onClick={handleLearnMoreButton}
                        text={"Learn More"}
                    ></Button>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
