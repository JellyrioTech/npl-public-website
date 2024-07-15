import { useNavigate } from "react-router-dom";
import crossedSwords from "../../public/crossed-swords.png";
import medal from "../../public/Medal.png";
import arenaClearoneLogo from "../../public/Arena Clearone Logo.png";
import routes from "../util/routes";
import Button from "../components/Button";

function TournamentInfoPage() {
    const navigator = useNavigate();

    return (
        <div className="w-full bg-primary-900 flex flex-col items-center py-10 gap-5">
            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col gap-8">
                <div className="flex flex-col items-center">
                    <img src={crossedSwords} className="w-[100px] h-[100px]" />
                    <p className="font-roboto text-sm mt-5">Learn More About</p>
                    <p className="font-roboto text-xl font-bold">
                        Arena Battle Series
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-center px-6">
                        Have you wondered what it takes to be the best? We
                        present this series to you. Players battle out in a
                        series of hard games and write their own legacy.{" "}
                    </p>
                    <Button
                        onClick={() => navigator(routes.RegisterNow)}
                        text={"Register Now"}
                    ></Button>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex gap-5">
                <p className="mt-5">
                    This is more than just earning a medal. Its an honor that
                    you have to defend and prove your worthy of the honor
                </p>
                <img src={medal} className="w-[100px] h-[100px]" />
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col">
                <p className="font-roboto text-xl font-bold">What is Arena?</p>
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col gap-1">
                        <p className="mt-5">
                            Imagine the Arena as a kingdom. In real world, these
                            are small dedicated areas or clubs or parks.
                        </p>
                        <p>
                            Each arena have its own dedicated champion and
                            defender to help and defend the arena.
                        </p>
                    </div>
                    <img
                        src={arenaClearoneLogo}
                        className="w-[100px] h-[100px]"
                    />
                </div>
            </div>
        </div>
    );
}

export default TournamentInfoPage;
