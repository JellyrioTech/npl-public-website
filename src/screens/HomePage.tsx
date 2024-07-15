import NavBar from "../components/NavBar";
import jumbotronBG from "../assets/jumbotronBG.png";
import { useNavigate } from "react-router-dom";
import routes from "../util/routes";
import Button from "../components/Button";

function HomePage() {
    const navigate = useNavigate();

    const handleLearnMoreButton = () => {
        navigate(routes.LearnMore);
    };

    return (
        <div className="bg-primary-900">
            <NavBar />

            <section className="relative w-full h-screen bg-neutral-100">
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${jumbotronBG})` }}
                >
                    <div className="mt-10 flex flex-col items-center gap-4">
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
                </div>
            </section>
        </div>
    );
}

export default HomePage;
