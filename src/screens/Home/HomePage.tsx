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
            className="w-full min-h-screen bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${landingBG})` }}
        >
            <div className="pt-[70px] flex flex-col items-center gap-4">
                <p className="font-oswald font-bold text-4xl md:text-5xl">
                    Arena Battle Series
                </p>
                <p className="py-2 md:px-5 bg-neutral-100 font-roboto text-[18px] md:text-[20px]">
                    Test your skills and write your own legacy
                </p>
                <Button
                    onClick={handleLearnMoreButton}
                    text={"Learn More"}
                ></Button>
            </div>
        </section>
    );
}

export default HomePage;
