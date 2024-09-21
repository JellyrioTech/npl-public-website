import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TournamentAPI } from "../apiRoutes/TournamentAPI";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { useLoader } from "../components/LoaderProvider";
import { CommonUtil } from "../util/CommonUtil";
import NPLButtonSquare from "../components/NPLButtonSquare";
import { routes } from "../util/routes";
import Titan_badge from "../../public/Titan_badge.png";
import Legends_badge from "../../public/Legends_badge.png";
import Hero_badge from "../../public/Hero_badge_.png";

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

    // return (
    //     <div className="w-full bg-primary-900 flex flex-col items-center py-10 gap-5">
    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col gap-8 md:max-w-[1200px]">
    //             <div className="flex flex-col items-center">
    //                 <img src={crossedSwords} className="w-[100px] h-[100px]" />
    //                 <p className="font-roboto text-sm mt-5">Learn More About</p>
    //                 <p className="font-roboto text-xl font-bold md:text-2xl mt-2">
    //                     {tournament.name}
    //                 </p>
    //                 <p className="font-roboto mt-1">
    //                     on{" "}
    //                     <span className="text-primary-500 text-lg md:text-2xl font-bold">
    //                         {CommonUtil.DateHelper.formatDateToMonthDayYear(
    //                             tournament.startDate?.toString() || ""
    //                         )}{" "}
    //                         at{" "}
    //                         {CommonUtil.DateHelper.formatTimeToHourMin(
    //                             tournament.startDate?.toString() || ""
    //                         )}
    //                     </span>
    //                 </p>
    //             </div>
    //             <div className="flex flex-col items-center gap-5">
    //                 <p className="text-center px-6 mb-4">
    //                     Ever wondered what it takes to be the best? Join us in
    //                     the{" "}
    //                     <span className="font-semibold text-secondary-500">
    //                         {tournament.name || ""}
    //                     </span>{" "}
    //                     where player face off in a series of challenging games,
    //                     creating their own legacy.
    //                 </p>
    //                 <div className="p-2 border-secondary-700 border-4 rounded-md flex gap-1  flex-col items-center">
    //                     <p className="font-bold font-roboto text-secondary-700">
    //                         Total Registered
    //                     </p>
    //                     <p className="font-oswald font-bold text-lg text-neutral-800">
    //                         {`${tournament.totalRegistered || 0}/${
    //                             tournament.capacity || 0
    //                         }`}
    //                     </p>
    //                 </div>
    //                 <div className="flex w-3/4 justify-center items-center border-4 border-secondary-300 rounded px-5 py-2 shadow-inner bg-secondary-100">
    //                     <p className="text-sm">
    //                         This is more than just earning a medal. Its an honor
    //                         you must defend and prove yourself worthy of.
    //                     </p>
    //                     <img src={medal} className="w-[70px] h-[70px]" />
    //                 </div>

    //                 <Button
    //                     onClick={() => navigator(routes.Register)}
    //                     text={"Register Now"}
    //                 ></Button>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg md:max-w-[1200px]">
    //             <p className="font-roboto text-xl font-bold">
    //                 Tournament Details
    //             </p>
    //             <div>
    //                 <p className="mt-5">
    //                     <b>Location:</b>{" "}
    //                     {`${tournament.location?.address || ""} ${
    //                         tournament.location?.city || ""
    //                     } ${tournament.location?.state || ""} ${
    //                         tournament.location?.zipCode || ""
    //                     }`}
    //                 </p>
    //                 <p>
    //                     <b>Game Type:</b> Doubles Round Robin
    //                 </p>
    //                 <p>
    //                     <b>Entry Fee:</b> ${tournament.entryFee || "Invalid"}
    //                 </p>
    //                 <p className="mt-8 mb-4 p-2 text-xl text-secondary-700 font-bold uppercase bg-secondary-100 text-center">
    //                     Prizes
    //                 </p>
    //                 <div className="p-4 flex flex-wrap justify-between gap-3">
    //                     <div className="w-full md:w-[30%] bg-primary-900 rounded-xl">
    //                         <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-primary-500 text-bold text-lg">
    //                             Position 1
    //                         </p>
    //                         <img
    //                             src={champBagde}
    //                             className="w-24 h-24 mx-auto my-4"
    //                         />
    //                         <div className="flex flex-col items-center pb-5 space-y-1">
    //                             <p className="font-roboto font-bold text-4xl text-secondary-300">
    //                                 $100
    //                             </p>

    //                             <p className="font-roboto text-neutral-300">
    //                                 Rank 1 Champion Medal
    //                             </p>
    //                         </div>
    //                     </div>
    //                     <div className="w-full md:w-[30%] bg-primary-900 rounded-xl">
    //                         <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-primary-500 text-bold text-lg">
    //                             Position 2
    //                         </p>
    //                         <img
    //                             src={champBagde}
    //                             className="w-24 h-24 mx-auto my-4"
    //                         />
    //                         <div className="flex flex-col items-center pb-5 space-y-1">
    //                             <p className="font-roboto font-bold text-4xl text-secondary-300">
    //                                 $80
    //                             </p>

    //                             <p className="font-roboto text-neutral-300">
    //                                 Rank 2 Champion Medal
    //                             </p>
    //                         </div>
    //                     </div>
    //                     <div className="w-full md:w-[30%] bg-primary-900 rounded-xl">
    //                         <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-primary-500 text-bold text-lg">
    //                             Position 3
    //                         </p>
    //                         <img
    //                             src={champBagde}
    //                             className="w-24 h-24 mx-auto my-3"
    //                         />
    //                         <div className="flex flex-col items-center pb-5 space-y-1">
    //                             <p className="font-roboto font-bold text-4xl text-secondary-300">
    //                                 $70
    //                             </p>

    //                             <p className="font-roboto text-neutral-300">
    //                                 Rank 3 Champion Medal
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="p-4 flex flex-wrap justify-between gap-3">
    //                     <div className="w-full md:w-[30%] bg-tertiary-500 rounded-xl">
    //                         <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-tertiary-300 text-bold text-lg">
    //                             Position 4
    //                         </p>
    //                         <img
    //                             src={defenderBagde}
    //                             className="w-24 h-24 mx-auto my-4"
    //                         />
    //                         <div className="flex flex-col items-center pb-5 space-y-1">
    //                             <p className="font-roboto font-bold text-4xl text-secondary-300">
    //                                 $40
    //                             </p>

    //                             <p className="font-roboto text-neutral-300">
    //                                 Rank 1 Defender Medal
    //                             </p>
    //                         </div>
    //                     </div>
    //                     <div className="w-full md:w-[30%] bg-tertiary-500 rounded-xl">
    //                         <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-tertiary-300 text-bold text-lg">
    //                             Position 5
    //                         </p>
    //                         <img
    //                             src={defenderBagde}
    //                             className="w-24 h-24 mx-auto my-4"
    //                         />
    //                         <div className="flex flex-col items-center pb-5 space-y-1">
    //                             <p className="font-roboto font-bold text-4xl text-secondary-300">
    //                                 $30
    //                             </p>

    //                             <p className="font-roboto text-neutral-300">
    //                                 Rank 2 Defender Medal
    //                             </p>
    //                         </div>
    //                     </div>
    //                     <div className="w-full md:w-[30%] bg-tertiary-500 rounded-xl">
    //                         <p className="text-center font-oswald text-secondary-900 rounded-t-xl p-2 bg-tertiary-300 text-bold text-lg">
    //                             Position 6
    //                         </p>
    //                         <img
    //                             src={defenderBagde}
    //                             className="w-24 h-24 mx-auto my-4"
    //                         />
    //                         <div className="flex flex-col items-center pb-5 space-y-1">
    //                             <p className="font-roboto font-bold text-4xl text-secondary-300">
    //                                 $20
    //                             </p>

    //                             <p className="font-roboto text-neutral-300">
    //                                 Rank 3 Defender Medal
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[1200px]">
    //             <p className="font-roboto text-xl font-bold">What is Arena?</p>
    //             <div className="flex gap-5 items-center md:gap-7 md:justify-around">
    //                 <div className="flex flex-col gap-1 md:basis-2/3">
    //                     <p className="mt-5">
    //                         Imagine the Arena as a kingdom. In the real world,
    //                         these are small dedicated areas, clubs, or parks.
    //                     </p>
    //                     <p>
    //                         Each arena has its own dedicated champion and
    //                         defender to help and protect the arena.
    //                     </p>
    //                 </div>
    //                 <img
    //                     src={arenaClearoneLogo}
    //                     className="w-[100px] h-[100px]"
    //                 />
    //             </div>
    //             <div className="flex gap-5 items-center md:justify-around">
    //                 <p className="font-bold text-[128px] text-secondary-500 p-5 font-oswald md:justify-around">
    //                     3
    //                 </p>
    //                 <div className="flex flex-col gap-1 md:basis-2/3">
    //                     <p className="mt-5">
    //                         There will be 3 champions and 3 defenders for each
    //                         arena.
    //                     </p>
    //                     <p>
    //                         Each Defender and Champions will be determined by
    //                         the Arena Battle Series.
    //                     </p>
    //                     <p>
    //                         Champions and Defenders must defend their positions
    //                         in every arena battle series.
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[1200px] gap-5">
    //             <p className="font-roboto text-xl font-bold">Champions</p>
    //             <div className="flex gap-5 items-center md:gap-7 md:justify-around">
    //                 <div className="flex flex-col gap-1 md:basis-2/3">
    //                     <p className="mt-5">
    //                         Champions hold the highest hoonor given to players.
    //                         They are the kings and top-level players of the
    //                         arena.
    //                     </p>
    //                     <p>
    //                         Only top 3 players will be awarded the Champion
    //                         title.
    //                     </p>
    //                 </div>
    //                 <img src={champBagde} className="w-[100px] h-[100px]" />
    //             </div>

    //             <div className="flex items-center mt-10 md:mt-5 md:justify-around">
    //                 <img
    //                     src={championAvatar}
    //                     className="w-[100px] h-[100px] p-2"
    //                 />
    //                 <div className="flex flex-col gap-1 md:basis-2/3">
    //                     <p className="mt-5">
    //                         As champions, they only need to defend their
    //                         positions in every Arena Battle Series.
    //                     </p>
    //                 </div>
    //             </div>
    //             <div className="flex w-3/4 justify-center items-center mx-auto mt-5 border-4 border-secondary-300 rounded px-5 py-3 shadow-inner bg-secondary-100">
    //                 <p>
    //                     Champion badges are ranked. Rank 1 for the 1st position,
    //                     Rank 2 for the 2nd position, and Rank 3 for the 3rd
    //                     position.
    //                 </p>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[1200px]">
    //             <p className="font-roboto text-xl font-bold">Defenders</p>
    //             <div className="flex gap-5 items-center md:gap-7 md:justify-around">
    //                 <div className="flex flex-col gap-1 pr-2 md:basis-2/3">
    //                     <p className="mt-5">
    //                         Defenders are the frontline warriors and hold the
    //                         second highest honor given to players.
    //                     </p>
    //                     <p>
    //                         Holding the Defender badge comes with great
    //                         responsibility as they must defend their title
    //                         against players aspiring to be the next defender.
    //                     </p>
    //                 </div>
    //                 <img src={defenderBagde} className="w-[100px] h-[100px]" />
    //             </div>
    //             <div className="flex gap-5 items-center mt-10 md:mt-5 md:justify-around">
    //                 <img
    //                     src={defenderAvatar}
    //                     className="w-[100px] h-[100px] p-1"
    //                 />
    //                 <div className="flex flex-col gap-1 md:basis-2/3">
    //                     <p className="mt-5">
    //                         Like champions, defenders must defend their position
    //                         in the Arena Battle Series.
    //                     </p>
    //                     <p>
    //                         However, they also compete in the Defender Battle X
    //                         Series, where current and aspiring defenders battle
    //                         for the title (Upcoming Feature).
    //                     </p>
    //                 </div>
    //             </div>
    //             <div className="flex w-3/4 justify-center items-center mx-auto mt-5 border-4 border-secondary-300 rounded px-5 py-3 shadow-inner bg-secondary-100">
    //                 <p>
    //                     Defender badges are ranked: Rank 1 for the 4th position,
    //                     Rank 2 for the 5th position, and Rank 3 for the 6th
    //                     position.
    //                 </p>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[1200px]">
    //             <p className="font-roboto text-xl font-bold">
    //                 How the series work?
    //             </p>
    //             <div className="flex gap-5 items-center md:gap-7 md:justify-around">
    //                 <div className="flex flex-col gap-1 md:basis-2/3">
    //                     <p className="mt-5">
    //                         A total of 10 players will be registered for the
    //                         battle series.
    //                     </p>
    //                     <p>
    //                         The games will be mostly round-robin, where player
    //                         score individually based on wins, losses, and score
    //                         differences.
    //                     </p>
    //                 </div>
    //                 <img src={appLogo} className="w-[100px] h-[100px]" />
    //             </div>
    //             <div className="flex gap-5 items-center md:text-center md:px-6 md:text-balance md:mt-5">
    //                 <p className="mt-5">
    //                     The rules and number of rounds may change based on the
    //                     number of participants. All game formats will be
    //                     explained before the start. Be prepared to play a lot of
    //                     games!
    //                 </p>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col md:max-w-[1200px] gap-5">
    //             <p className="font-roboto text-xl font-bold">Prizes</p>
    //             <div className="flex gap-5 items-center md:gap-7 md:justify-around">
    //                 <div className="flex flex-col gap-1 md:gap-3 md:basis-2/3">
    //                     <p className="mt-5">
    //                         This is the highest honor battle series in all our
    //                         events. We have prizes for the top 6 players.
    //                     </p>
    //                     <p>Champions receive medals and high prize money.</p>
    //                     <p>
    //                         Defenders receive medals and mid-range prize money.
    //                     </p>
    //                 </div>
    //                 <img src={crownLogo} className="w-[100px] h-[100px]" />
    //             </div>
    //             <div className="flex gap-5 items-center md:px-6 md:text-balance md:mt-5">
    //                 <p className="font-bold">
    //                     Spectators and audience members also have a chance to
    //                     win prizes! For the final round, pick your favorite
    //                     player. Depending on their final position, you might win
    //                     prizes as a{" "}
    //                     <span className="font-semibold text-secondary-300">
    //                         Superfan
    //                     </span>{" "}
    //                     (randomly drawn from the pool of supporters).
    //                 </p>
    //             </div>
    //         </div>

    //         <div className="bg-neutral-100 w-[80%] p-7 rounded-lg flex flex-col justify-center items-center md:max-w-[1200px]">
    //             <p className="text-balance text-center">
    //                 Your achievements will the recorded in our legacy book, and
    //                 all active champions and defenders will be proudly displayed
    //                 for the arenas they represent.
    //             </p>
    //             <p className="text-xl md:text-2xl text-primary-500 font-bold text-center text-balance mt-8">
    //                 Are your ready to see your true potential and write your own
    //                 legacy?
    //             </p>
    //             <div className="md:basis-1/3 mx-auto pt-5">
    //                 <Button
    //                     onClick={() => navigator(routes.Download)}
    //                     text={"Register Now"}
    //                 ></Button>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            {/* SECTION 1 - Registration Date */}
            <div className="py-14">
                <div className="flex flex-col justify-center items-center py-2">
                    <h2 className="uppercase font-regular text-title1 md:text-xTitle font-light">
                        JOIN THE UPCOMING MONEYBALL
                    </h2>
                    <h1 className="uppercase font-bold text-5xl md:text-[80px] font-display  leading-tight md:leading-none">
                        ARENA BATTLE SERIES
                    </h1>
                    <div className="mt-8 md:mt-14 w-[90%] max-w-[854px] py-12 md:py-16 border rounded-[30px] bg-gradient-green flex flex-col justify-center items-center">
                        <p className="text-secondary-300 text-xTitle md:text-xxxTitle font-bold">
                            October 27, 2024{" "}
                            <span className="text-title1 md:text-xTitle font-bold">
                                at 12pm
                            </span>
                        </p>
                        <p className="text-body1 md:text-title1 font-medium text-neutral-100 pt-3 md:pt-5">
                            Location: ORLANDO RACKET SPORTS
                        </p>
                        <div className="pt-12 md:pt-20">
                            <NPLButtonSquare
                                onClick={() => navigator(routes.Register)}
                                text={"Register Now"}
                            ></NPLButtonSquare>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2 - Prize Pool*/}
            <div className="py-20 md:py-24">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xTitle md:text-xxxTitle font-bold">
                        More Challenge, Epic Prizes
                    </p>
                    <div className="mt-16 flex flex-col md:flex-row gap-12 md:gap-16">
                        <div className="w-[318px] rounded-[15px] bg-gradient-titan py-14 px-16 text-neutral-100 flex flex-col justify-center items-center">
                            <p className="font-special font-bold text-[48px] uppercase ">
                                Titans
                            </p>
                            <img
                                src={Titan_badge}
                                className="w-[100px] h-[100px] mt-4 mb-6"
                            />
                            <p className="text-title1 font-light">
                                Position 1{" "}
                                <span className="font-bold">$100</span>
                            </p>
                            <p className="text-title1 font-light">
                                Position 2{" "}
                                <span className="font-bold">$100</span>
                            </p>
                        </div>
                        <div className="w-[318px] rounded-[15px] bg-gradient-legends py-14 px-16 text-neutral-100 flex flex-col justify-center items-center">
                            <p className="font-special font-bold text-[48px] uppercase ">
                                Legends
                            </p>
                            <img
                                src={Legends_badge}
                                className="w-[100px] h-[100px] mt-4 mb-6"
                            />
                            <p className="text-title1 font-light">
                                Position 1{" "}
                                <span className="font-bold">$60</span>
                            </p>
                            <p className="text-title1 font-light">
                                Position 2{" "}
                                <span className="font-bold">$60</span>
                            </p>
                        </div>
                        <div className="w-[318px] rounded-[15px] bg-gradient-hero py-14 px-16 text-neutral-100 flex flex-col justify-center items-center">
                            <p className="font-special font-bold text-[48px] uppercase ">
                                Hero
                            </p>
                            <img
                                src={Hero_badge}
                                className="w-[100px] h-[100px] mt-4 mb-6"
                            />
                            <p className="text-title1 font-light">
                                Position 1{" "}
                                <span className="font-bold">$40</span>
                            </p>
                            <p className="text-title1 font-light">
                                Position 2{" "}
                                <span className="font-bold">$40</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3 - Entry Fee and Players*/}

            {/* SECTION 4 - Rules */}

            {/* SECTION 5 - Ending Button */}
            <div className="py-20 md:py-24">
                <div className="flex flex-col justify-center items-center gap-8 md:gap-12">
                    <p className="text-[26px] md:text-xxTitle font-bold text-center font-display">
                        Are your ready to see your true potential and <br />
                        write your own legacy?
                    </p>
                    <NPLButtonSquare
                        special={true}
                        onClick={() => navigator(routes.Register)}
                        text={"REGISTER NOW"}
                    ></NPLButtonSquare>
                </div>
            </div>
        </div>
    );
}

export default TournamentInfoPage;
