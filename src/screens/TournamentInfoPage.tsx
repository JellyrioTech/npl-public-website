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
import { useEffect, useState } from "react";
import { TournamentAPI } from "../apiRoutes/TournamentAPI";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { useLoader } from "../components/LoaderProvider";
import { CommonUtil } from "../util/CommonUtil";

function TournamentInfoPage() {
    const navigator = useNavigate();
    const [tournament, setTournament] = useState<
        Partial<TournamentServiceResponse.GetPublicTournamentInfoStruct>
    >({});
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const tournamentId = 1;
        TournamentAPI.getPublicTournamentInfo(tournamentId, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: () => {},
            success: (obj) => {
                setTournament(obj);
            },
        });
    }, []);

    return (
        <div className="w-full bg-primary-900 flex flex-col items-center py-10 gap-5">
            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col gap-8 md:max-w-[800px]">
                <div className="flex flex-col items-center">
                    <img src={crossedSwords} className="w-[100px] h-[100px]" />
                    <p className="font-roboto text-sm mt-5">Learn More About</p>
                    <p className="font-roboto text-xl font-bold md:text-2xl mt-2">
                        {tournament.name}
                    </p>
                    <p className="font-roboto mt-1">
                        on{" "}
                        <span className="text-primary-500 text-lg md:text-2xl font-bold">
                            {CommonUtil.DateHelper.formatDateToMonthDayYear(
                                tournament.startDate?.toString() || ""
                            )}{" "}
                            at{" "}
                            {CommonUtil.DateHelper.formatTimeToHourMin(
                                tournament.startDate?.toString() || ""
                            )}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <p className="text-center px-6 mb-4">
                        Ever wondered what it takes to be the best? Join us in
                        the{" "}
                        <span className="font-semibold text-secondary-500">
                            Arena Battle Series
                        </span>{" "}
                        where player face off in a series of challenging games,
                        creating their own legacy.
                    </p>
                    <div className="p-2 border-secondary-700 border-4 rounded-md flex gap-1  flex-col items-center">
                        <p className="font-bold font-roboto text-secondary-700">
                            Total Registered
                        </p>
                        <p className="font-oswald font-bold text-lg text-neutral-800">
                            {`${tournament.totalRegistered}/${tournament.capacity}`}
                        </p>
                    </div>
                    <div className="flex w-3/4 justify-center items-center border-4 border-secondary-300 rounded px-5 py-2 shadow-inner bg-secondary-100">
                        <p className="text-sm">
                            This is more than just earning a medal. Its an honor
                            you must defend and prove yourself worthy of.
                        </p>
                        <img src={medal} className="w-[70px] h-[70px]" />
                    </div>

                    <Button
                        onClick={() => navigator(routes.Register)}
                        text={"Register Now"}
                    ></Button>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">
                    Tournament Details
                </p>
                <div>
                    <p className="mt-5">
                        <b>Location:</b>{" "}
                        {`${tournament.location?.address} ${tournament.location?.city} ${tournament.location?.state} ${tournament.location?.zipCode}`}
                    </p>
                    <p>
                        <b>Game Type:</b> Doubles Round Robin
                    </p>
                    <p>
                        <b>Entry Fee:</b> ${tournament.entryFee}
                    </p>
                    <p className="mt-8 mb-4 p-2 text-xl text-secondary-700 font-bold uppercase bg-secondary-100 text-center">
                        Prizes
                    </p>
                    <div className="p-4 flex flex-wrap justify-between gap-3">
                        <div className="w-full md:w-[30%] bg-primary-900 rounded-xl">
                            <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-primary-500 text-bold text-lg">
                                Position 1
                            </p>
                            <img
                                src={champBagde}
                                className="w-24 h-24 mx-auto my-4"
                            />
                            <div className="flex flex-col items-center pb-5 space-y-1">
                                <p className="font-roboto font-bold text-4xl text-secondary-300">
                                    $100
                                </p>

                                <p className="font-roboto text-neutral-300">
                                    Rank 1 Champion Medal
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-[30%] bg-primary-900 rounded-xl">
                            <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-primary-500 text-bold text-lg">
                                Position 2
                            </p>
                            <img
                                src={champBagde}
                                className="w-24 h-24 mx-auto my-4"
                            />
                            <div className="flex flex-col items-center pb-5 space-y-1">
                                <p className="font-roboto font-bold text-4xl text-secondary-300">
                                    $80
                                </p>

                                <p className="font-roboto text-neutral-300">
                                    Rank 2 Champion Medal
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-[30%] bg-primary-900 rounded-xl">
                            <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-primary-500 text-bold text-lg">
                                Position 3
                            </p>
                            <img
                                src={champBagde}
                                className="w-24 h-24 mx-auto my-3"
                            />
                            <div className="flex flex-col items-center pb-5 space-y-1">
                                <p className="font-roboto font-bold text-4xl text-secondary-300">
                                    $70
                                </p>

                                <p className="font-roboto text-neutral-300">
                                    Rank 3 Champion Medal
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex flex-wrap justify-between gap-3">
                        <div className="w-full md:w-[30%] bg-tertiary-500 rounded-xl">
                            <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-tertiary-300 text-bold text-lg">
                                Position 4
                            </p>
                            <img
                                src={defenderBagde}
                                className="w-24 h-24 mx-auto my-4"
                            />
                            <div className="flex flex-col items-center pb-5 space-y-1">
                                <p className="font-roboto font-bold text-4xl text-secondary-300">
                                    $40
                                </p>

                                <p className="font-roboto text-neutral-300">
                                    Rank 1 Defender Medal
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-[30%] bg-tertiary-500 rounded-xl">
                            <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-tertiary-300 text-bold text-lg">
                                Position 5
                            </p>
                            <img
                                src={defenderBagde}
                                className="w-24 h-24 mx-auto my-4"
                            />
                            <div className="flex flex-col items-center pb-5 space-y-1">
                                <p className="font-roboto font-bold text-4xl text-secondary-300">
                                    $30
                                </p>

                                <p className="font-roboto text-neutral-300">
                                    Rank 2 Defender Medal
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-[30%] bg-tertiary-500 rounded-xl">
                            <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-tertiary-300 text-bold text-lg">
                                Position 6
                            </p>
                            <img
                                src={defenderBagde}
                                className="w-24 h-24 mx-auto my-4"
                            />
                            <div className="flex flex-col items-center pb-5 space-y-1">
                                <p className="font-roboto font-bold text-4xl text-secondary-300">
                                    $20
                                </p>

                                <p className="font-roboto text-neutral-300">
                                    Rank 3 Defender Medal
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">What is Arena?</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            Imagine the Arena as a kingdom. In the real world,
                            these are small dedicated areas, clubs, or parks.
                        </p>
                        <p>
                            Each arena has its own dedicated champion and
                            defender to help and protect the arena.
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
                            There will be 3 champions and 3 defenders for each
                            arena.
                        </p>
                        <p>
                            Each Defender and Champions will be determined by
                            the Arena Battle Series.
                        </p>
                        <p>
                            Champions and Defenders must defend their positions
                            in every arena battle series.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px] gap-5">
                <p className="font-roboto text-xl font-bold">Champions</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            Champions hold the highest hoonor given to players.
                            They are the kings and top-level players of the
                            arena.
                        </p>
                        <p>
                            Only top 3 players will be awarded the Champion
                            title.
                        </p>
                    </div>
                    <img src={champBagde} className="w-[100px] h-[100px]" />
                </div>

                <div className="flex items-center mt-10 md:mt-5 md:justify-around">
                    <img
                        src={championAvatar}
                        className="w-[100px] h-[100px] p-2"
                    />
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            As champions, they only need to defend their
                            positions in every Arena Battle Series.
                        </p>
                    </div>
                </div>
                <div className="flex w-3/4 justify-center items-center mx-auto mt-5 border-4 border-secondary-300 rounded px-5 py-3 shadow-inner bg-secondary-100">
                    <p>
                        Champion badges are ranked. Rank 1 for the 1st position,
                        Rank 2 for the 2nd position, and Rank 3 for the 3rd
                        position.
                    </p>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">Defenders</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 pr-2 md:basis-2/3">
                        <p className="mt-5">
                            Defenders are the frontline warriors and hold the
                            second highest honor given to players.
                        </p>
                        <p>
                            Holding the Defender badge comes with great
                            responsibility as they must defend their title
                            against players aspiring to be the next defender.
                        </p>
                    </div>
                    <img src={defenderBagde} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center mt-10 md:mt-5 md:justify-around">
                    <img
                        src={defenderAvatar}
                        className="w-[100px] h-[100px] p-1"
                    />
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            Like champions, defenders must defend their position
                            in the Arena Battle Series.
                        </p>
                        <p>
                            However, they also compete in the Defender Battle X
                            Series, where current and aspiring defenders battle
                            for the title (Upcoming Feature).
                        </p>
                    </div>
                </div>
                <div className="flex w-3/4 justify-center items-center mx-auto mt-5 border-4 border-secondary-300 rounded px-5 py-3 shadow-inner bg-secondary-100">
                    <p>
                        Defender badges are ranked: Rank 1 for the 4th position,
                        Rank 2 for the 5th position, and Rank 3 for the 6th
                        position.
                    </p>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px]">
                <p className="font-roboto text-xl font-bold">
                    How the series work?
                </p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:basis-2/3">
                        <p className="mt-5">
                            A total of 10 players will be registered for the
                            battle series.
                        </p>
                        <p>
                            The games will be mostly round-robin, where player
                            score individually based on wins, losses, and score
                            differences.
                        </p>
                    </div>
                    <img src={appLogo} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center md:text-center md:px-6 md:text-balance md:mt-5">
                    <p className="mt-5">
                        The rules and number of rounds may change based on the
                        number of participants. All game formats will be
                        explained before the start. Be prepared to play a lot of
                        games!
                    </p>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[800px] gap-5">
                <p className="font-roboto text-xl font-bold">Prizes</p>
                <div className="flex gap-5 items-center md:gap-7 md:justify-around">
                    <div className="flex flex-col gap-1 md:gap-3 md:basis-2/3">
                        <p className="mt-5">
                            This is the highest honor battle series in all our
                            events. We have prizes for the top 6 players.
                        </p>
                        <p>Champions receive medals and high prize money.</p>
                        <p>
                            Defenders receive medals and mid-range prize money.
                        </p>
                    </div>
                    <img src={crownLogo} className="w-[100px] h-[100px]" />
                </div>
                <div className="flex gap-5 items-center md:px-6 md:text-balance md:mt-5">
                    <p className="font-bold">
                        Spectators and audience members also have a chance to
                        win prizes! For the final round, pick your favorite
                        player. Depending on their final position, you might win
                        prizes as a{" "}
                        <span className="font-semibold text-secondary-300">
                            Superfan
                        </span>{" "}
                        (randomly drawn from the pool of supporters).
                    </p>
                </div>
            </div>

            <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col justify-center items-center md:max-w-[800px]">
                <p className="text-balance text-center">
                    Your achievements will the recorded in our legacy book, and
                    all active champions and defenders will be proudly displayed
                    for the arenas they represent.
                </p>
                <p className="text-xl md:text-2xl text-primary-500 font-bold text-center text-balance mt-8">
                    Are your ready to see your true potential and write your own
                    legacy?
                </p>
                <div className="md:basis-1/3 mx-auto pt-5">
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
