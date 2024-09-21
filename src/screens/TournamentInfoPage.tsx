import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TournamentRoutesVM } from "../commonVM/TournamentVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { useLoader } from "../components/LoaderProvider";
import { CommonUtil } from "../util/CommonUtil";
import NPLButtonSquare from "../components/NPLButtonSquare";
import { routes } from "../util/routes";
import Titan_badge from "../../public/Titan_badge.png";
import Legends_badge from "../../public/Legends_badge.png";
import Hero_badge from "../../public/Hero_badge_.png";
import tournamentRegistrationSection3Image from "../../public/tournamentRegistrationSection3Image.png";
import ruleBook from "../../public/rule_book.png";

function TournamentInfoPage() {
    const navigator = useNavigate();
    const [tournament, setTournament] = useState<
        Partial<TournamentServiceResponse.GetPublicTournamentInfoStruct>
    >({});
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const tournamentId = 3;
        TournamentRoutesVM.getPublicTournamentInfo(tournamentId, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: () => {},
            success: (obj) => {
                setTournament(obj);
            },
        });
    }, []);

    function formatRuleByIndexOrder(
        header: string,
        body: string,
        lists: string[],
        index: number
    ) {
        return (
            <div className="py-8 md:py-20 w-full">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <img
                        src={ruleBook}
                        className={`${
                            index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                        } w-[150px] lg:w-[218px] h-auto`}
                    />
                    <div
                        className={`flex ${
                            index % 2 === 0
                                ? "lg:order-2 lg:mr-10 items-end"
                                : "lg:order-1 lg:ml-10"
                        } w-[90%] lg:w-[540px] mx-auto mt-12 lg:mt-0`}
                    >
                        <div>
                            <h3 className="font-semibold text-regTitle lg:text-xlTitle mb-2 lg:mb-4">
                                {header}
                            </h3>
                            <p className="text-regBody lg:text-lgBody">
                                {body}
                            </p>
                            <ul className="nspl-list list-inside mt-2 lg:mt-3">
                                {lists.map((item, listIndex) => (
                                    <li
                                        key={listIndex}
                                        className={`${
                                            listIndex === 0 && "mt-1 lg:mt-4"
                                        } text-regBody lg:text-lgBody`}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full max-w-[1200px] mx-auto">
                {/* SECTION 1 - Registration Date */}
                <div className="py-14">
                    <div className="flex flex-col justify-center items-center py-2">
                        <h2 className="uppercase font-regular text-regTitle md:text-xlTitle font-light">
                            JOIN THE UPCOMING MONEYBALL
                        </h2>
                        <h1 className="uppercase font-bold text-5xl md:text-[80px] font-display  leading-tight md:leading-none">
                            ARENA BATTLE SERIES
                        </h1>
                        <div className="mt-8 md:mt-14 w-[90%] max-w-[854px] py-12 md:py-16 border rounded-[30px] bg-gradient-green flex flex-col justify-center items-center">
                            <p className="text-secondary-300 text-regTitle md:text-3xlTitle font-bold">
                                {CommonUtil.DateHelper.formatDateToMonthDayYear(
                                    tournament.startDate?.toString() as string
                                )}
                                <span className="text-regTitle md:text-xlTitle font-bold">
                                    {" "}
                                    at 12pm
                                </span>
                            </p>
                            <p className="text-smBody md:text-regTitle font-medium text-neutral-100 pt-3 md:pt-5">
                                Location:{" "}
                                <span className="uppercase">
                                    ORLANDO RACKET SPORTS
                                </span>
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
                <div className="py-16 md:py-24">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-xlTitle md:text-3xlTitle font-bold">
                            More Challenge, Epic Prizes
                        </p>
                        <div className="mt-16 flex flex-col md:flex-row gap-6 md:gap-16">
                            <div className="w-[318px] rounded-[15px] bg-gradient-titan py-14 px-16 text-neutral-100 flex flex-col justify-center items-center">
                                <p className="font-special font-bold text-[48px] uppercase ">
                                    Titans
                                </p>
                                <img
                                    src={Titan_badge}
                                    className="w-[100px] h-[100px] mt-4 mb-6"
                                />
                                <p className="text-regTitle font-light">
                                    Position 1{" "}
                                    <span className="font-bold">$100</span>
                                </p>
                                <p className="text-regTitle font-light">
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
                                <p className="text-regTitle font-light">
                                    Position 1{" "}
                                    <span className="font-bold">$60</span>
                                </p>
                                <p className="text-regTitle font-light">
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
                                <p className="text-regTitle font-light">
                                    Position 1{" "}
                                    <span className="font-bold">$40</span>
                                </p>
                                <p className="text-regTitle font-light">
                                    Position 2{" "}
                                    <span className="font-bold">$40</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3 - Entry Fee and Capacity */}
            <div className="w-full">
                <div className="w-[90%] max-w-[1200px] mx-auto">
                    {/* SECTION 3 - Entry Fee and Players*/}
                    <div className="py-16 md:py-24">
                        <div className="flex justify-between">
                            <div className="pt-10 md:pt-24">
                                <div className="inline-block border-2 border-black px-2 py-1 lg:px-2.5 lg:py-2 mb-4 lg:mb-6">
                                    <p className="text-regTitle md:text-2xl font-semibold">
                                        Entry Fee:{" "}
                                        <span className="text-secondary-700">
                                            ${tournament.entryFee}
                                        </span>
                                    </p>
                                </div>
                                <p className="text-regTitle md:text-xlTitle font-medium mb-2 lg:mb-4">
                                    Total Warriors Waiting In Arena
                                </p>
                                <p className="text-2xlTitle md:text-[64px] font-bold text-secondary-700">{`${
                                    tournament.totalRegistered || 0
                                }/${tournament.capacity || 0}`}</p>
                            </div>
                            <img
                                src={tournamentRegistrationSection3Image}
                                className="lg:mr:0 w-[200px] h-auto md:w-[465px]"
                            />
                        </div>
                    </div>
                </div>
                <hr className="border border-500 drop-shadow-lg" />
            </div>

            {/* SECTION 4 - Rules */}
            <div className="w-[90%] max-w-[1200px] mx-auto">
                <div className="py-12 md:py-20">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-xlTitle md:text-3xlTitle font-bold text-center mb-6 lg:mb-10">
                            Rules and Tournament Formats
                        </h2>
                        {tournament.rules?.sections?.map((section, index) =>
                            formatRuleByIndexOrder(
                                section.header,
                                section.body,
                                section.lists,
                                index
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* SECTION 5 - Ending Button */}
            <div className="w-full bg-gradient-green">
                <div className="pt-20 pb-24 md:pt-24 md:pb-28">
                    <div className="flex flex-col justify-center items-center gap-8 md:gap-12">
                        <p className="text-neutral-100 text-[26px] md:text-2xlTitle font-bold text-center font-display uppercase">
                            Are your ready to see your true potential and <br />
                            write your own legacy?
                        </p>
                        <NPLButtonSquare
                            onClick={() => navigator(routes.Register)}
                            text={"REGISTER NOW"}
                        ></NPLButtonSquare>
                    </div>
                </div>
            </div>
        </>
    );
}

function formatRuleByIndex(
    header: string,
    body: string,
    lists: string[],
    index: number
) {
    console.log(`Rule ${index}: ${header} : list len: ${lists.length}`);
    return index % 2 === 0 ? (
        <div className="py-12 md:py-20 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <img src={ruleBook} className="w-[218px] h-[241px]" />
                <div className="w-[90%] lg:w-[540px] mx-auto mt-14 lg:mt-0 lg:mr-10">
                    <h3 className="font-semibold text-xlTitle mb-4">
                        {header}
                    </h3>
                    <p>{body}</p>
                    <ul className="nspl-list list-inside mt-3">
                        {lists.map((item, listIndex) => (
                            <li
                                key={listIndex}
                                className={`${listIndex === 0 && "mt-4"}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    ) : (
        <div className="py:12 lg:py-20 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="w-[90%] lg:w-[540px] mx-auto mt-14 lg:mt-0 lg:mr-10">
                    <h3 className="font-semibold text-xlTitle mb-4">
                        {header}
                    </h3>
                    <p>{body}</p>
                    <ul className="nspl-list list-inside mt-3">
                        {lists.map((item, listIndex) => (
                            <li
                                key={listIndex}
                                className={`${listIndex === 0 && "mt-4"}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={ruleBook} className="w-[218px] h-[241px]" />
            </div>
        </div>
    );
}

export default TournamentInfoPage;
