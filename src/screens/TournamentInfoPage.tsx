import { useNavigate } from "react-router-dom";
import crossedSwords from "../../public/crossed-swords.png";
import champBagde from "../../public/Champ_Badge.png";
import defenderBagde from "../../public/Defender_badge.png";
import championAvatar from "../../public/Champion_Avatar_box.png";
import defenderAvatar from "../../public/Defender_Badge_box.png";
import appLogo from "../../public/App_logo_white.png";
import crownLogo from "../../public/Crown_Intro.png";
import medal from "../../public/Medal.png";
import arenaClearoneLogo from "../../public/Arena Clearone Logo.png";
import { routes } from "../util/routes";
import Button from "../components/Button";

function TournamentInfoPage() {
    const navigator = useNavigate();

    return (
        <div className="w-full bg-primary-900 flex flex-col items-center py-10 gap-5">
            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col gap-8 md:max-w-[800px]">
                <div className="flex flex-col items-center">
                    <img src={crossedSwords} className="w-[100px] h-[100px]" />
                    <p className="font-roboto text-sm mt-5">Learn More About</p>
                    <p className="font-roboto text-xl font-bold md:text-2xl mt-2">
                        Arena Battle Series
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-center px-6 mb-4">
                        Have you wondered what it takes to be the best? We
                        present this series to you. Players battle out in a
                        series of hard games and write their own legacy.{" "}
                    </p>
                    <Button
                        onClick={() => navigator(routes.Download)}
                        text={"Register Now"}
                    ></Button>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex gap-5 md:gap-7 md:justify-around md:max-w-[800px]">
                <p className="mt-5 md:basis-2/3">
                    This is more than just earning a medal. Its an honor that
                    you have to defend and prove your worthy of the honor
                </p>
                <img src={medal} className="w-[100px] h-[100px]" />
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">What is Arena?</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:basis-2/3">
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
                <div className="flex gap-5 items-center md:justify-around">
                    <p className="font-bold text-[128px] text-secondary-500 p-5 font-oswald md:justify-around">
                        3
                    </p>
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            There is going to be 3 champions and 3 defenders for
                            every arena
                        </p>
                        <p>
                            Each defender and Champions will be determined by
                            Arena Battle Series.
                        </p>
                        <p>
                            Champions and defender have to defend their position
                            for every arena battle series that happens for that
                            arena.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">Champions</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            They are the highest honor given to the player.
                            Champions are the king and top level for that arena
                        </p>
                        <p>
                            Only top 3 players will be awarded this Champion
                            honor
                        </p>
                    </div>
                    <img src={champBagde} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center md:text-center md:px-6 md:text-balance md:mt-5">
                    <p className="mt-5">
                        There are ranks for champion badge. Rank 1 being the
                        highest and awarded to 1st position, Rank 2 for 2nd
                        position and Rank 3 for 3rd position
                    </p>
                </div>
                <div className="flex gap-5 items-center mt-10 md:mt-5 md:justify-around">
                    <img
                        src={championAvatar}
                        className="w-[100px] h-[100px] p-2"
                    />
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            Since its the highest honor to be the champion, they
                            only have to defend their position for every Arena
                            Battle Series
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">Defenders</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 pr-2 md:basis-2/3">
                        <p className="mt-5">
                            They are the front liners and the second highest
                            honor given to the player
                        </p>
                        <p>
                            Holding the Defender badge comes with lot of
                            responsibility as they will have to defend their
                            title against players who wanted to become defender
                            for that arena
                        </p>
                    </div>
                    <img src={defenderBagde} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center md:text-center md:px-6 md:text-balance md:mt-5">
                    <p className="mt-5">
                        There are ranks for defender badge. Rank 1 being the
                        highest and awarded to 4th position, Rank 2 for 5th
                        position and Rank 3 for 6th position
                    </p>
                </div>
                <div className="flex gap-5 items-center mt-10 md:mt-5 md:justify-around">
                    <img
                        src={defenderAvatar}
                        className="w-[100px] h-[100px] p-1"
                    />
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            Like champions, defender have to defend their
                            position in Arena Battle Series
                        </p>
                        <p>
                            However, they also have to defend in Defender Battle
                            X series where the old and new potential defenders
                            will fight for the title (Upcoming)
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">
                    How the series work?
                </p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            Total 12 or 16 player will be registered for the
                            battle series.
                        </p>
                        <p>
                            It will be mostly round robin games where players
                            will be scored individually depending on win/loss
                            and score difference
                        </p>
                    </div>
                    <img src={appLogo} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center md:text-center md:px-6 md:text-balance md:mt-5">
                    <p className="mt-5">
                        The rules and number of rounds might change due to the
                        total number of people showing up. All game format will
                        be explained before game starts. However, be prepared to
                        play a lot of games
                    </p>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">Prizes</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:gap-3 md:basis-2/3">
                        <p className="mt-5">
                            Since this is an highest honor battle series in all
                            of our series, we have prizes from top 1 player all
                            the way to top 6 player
                        </p>
                        <p>
                            For each champions we will have champion medals and
                            high prize money
                        </p>
                        <p>
                            For each defenders, we will have defender medals and
                            mid prize money
                        </p>
                    </div>
                    <img src={crownLogo} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center md:text-center md:px-6 md:text-balance md:mt-5">
                    <p className="mt-5">
                        The best part is your achievement will be written in our
                        legacy book and all active champions and defender will
                        proudly be shown for the arenas they represents
                    </p>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px] md:gap-4">
                <p className="text-lg text-primary-900 font-bold text-center">
                    So are you ready to see your true potential and write your
                    own legacy?
                </p>
                <div className="md:basis-1/3 mx-auto">
                    <Button
                        onClick={() => navigator(routes.Download)}
                        text={"Register Now"}
                    ></Button>
                </div>
            </div>
        </div>
    );
}

export default TournamentInfoPage;
