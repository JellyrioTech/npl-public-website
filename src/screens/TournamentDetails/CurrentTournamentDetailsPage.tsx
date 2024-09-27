import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TournamentRoutesVM } from "../../commonVM/TournamentVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { useLoader } from "../../components/LoaderProvider";
import { CommonUtil } from "../../util/CommonUtil";
import NSPLButtonSquare from "../../components/NPLButtonSquare";
import { routes } from "../../util/routes";
import tournamentRegistrationSection3Image from "../../../public/tournamentRegistrationSection3Image.png";
import ruleBook from "../../../public/rule_book.png";
import icon from "../../assets/listIcon.png";

function CurrentTournamentDetailsPage() {
    const navigator = useNavigate();
    const [tournament, setTournament] = useState<
        Partial<TournamentServiceResponse.GetPublicTournamentInfoStruct>
    >({});
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const tournamentId = 6;
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
            <div className="py-8 lg:py-20 w-full">
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
                            <div className="flex flex-col gap-3 mt-2 lg:mt-3">
                                {lists.map((item) => (
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={icon}
                                            className="w-3 h-3 lg:w-4 lg:h-4 lg:mt-1"
                                        />
                                        <div className="text-regBody lg:text-lgBody">
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function getRankCards() {
        const filteredSection = filterRankPrizeByType(
            tournament.prizes?.sections?.map((section) => {
                return {
                    type: section.type,
                    name: section.name,
                    amount: section.amount,
                    lists: section.lists,
                    image: section.image,
                };
            }) || []
        );

        return (
            <div className="mt-16 flex flex-col lg:flex-row gap-6 lg:gap-16">
                {filteredSection.map((section) => (
                    <div
                        className={`${getPrizeBg(
                            section.type || ""
                        )} w-[318px] rounded-[15px] py-14 px-16 text-neutral-100 flex flex-col justify-center items-center`}
                    >
                        <p className="font-special font-bold text-[48px] uppercase">
                            {section.type}
                        </p>
                        <img
                            src={CommonUtil.getImage(section.image || "")}
                            className="w-[100px] h-[100px] mt-4 mb-6"
                        />
                        <p className="text-regTitle font-light">
                            Position 1{" "}
                            <span className="font-bold">${section.amount}</span>
                        </p>
                        <p className="text-regTitle font-light">
                            Position 2{" "}
                            <span className="font-bold">${section.amount}</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    function getPrizeBg(type: string) {
        switch (type) {
            case "TITAN":
                return "bg-gradient-titan";
            case "HERO":
                return "bg-gradient-hero";
            case "LEGEND":
                return "bg-gradient-legends";
        }
    }

    function filterRankPrizeByType(
        sections: Partial<{
            type: string;
            name: string;
            amount: number;
            lists: string[];
            image: string;
        }>[]
    ) {
        let titan = 0;
        let legend = 0;
        let hero = 0;
        return sections.filter((section) => {
            if (section.type === "TITAN" && titan === 0) {
                titan += 1;
                return true;
            }
            if (section.type === "LEGEND" && legend === 0) {
                legend += 1;
                return true;
            }
            if (section.type === "HERO" && hero === 0) {
                hero += 1;
                return true;
            }
        });
    }

    return (
        <>
            <div className="w-full max-w-[1200px] mx-auto">
                {/* SECTION 1 - Registration Date */}
                <div className="py-14">
                    <div className="flex flex-col justify-center items-center py-2">
                        <h2 className="uppercase font-regular text-regTitle lg:text-xlTitle font-light">
                            JOIN THE UPCOMING MONEYBALL
                        </h2>
                        <h1 className="uppercase font-bold text-5xl lg:text-[80px] font-display  leading-tight lg:leading-none">
                            ARENA BATTLE SERIES
                        </h1>
                        <div className="mt-8 lg:mt-14 w-[90%] max-w-[854px] py-12 lg:py-16 border rounded-[30px] bg-gradient-green flex flex-col justify-center items-center">
                            <p className="text-secondary-300 text-regTitle lg:text-3xlTitle font-bold">
                                {CommonUtil.DateHelper.formatDateToMonthDayYear(
                                    tournament.startDate?.toString() as string
                                )}
                                <span className="text-regTitle lg:text-xlTitle font-bold">
                                    {" "}
                                    at{" "}
                                    {CommonUtil.DateHelper.formatTimeToHourMin(
                                        tournament.startDate?.toString() as string
                                    )}
                                </span>
                            </p>
                            <p className="text-regBody lg:text-regTitle font-medium text-neutral-100 pt-3 lg:pt-5">
                                Location:{" "}
                                <span className="uppercase">
                                    ORLANDO RACKET SPORTS
                                </span>
                            </p>
                            <div className="pt-10 lg:pt-20">
                                <NSPLButtonSquare
                                    onClick={() => navigator(routes.Register)}
                                    text={"Register Now"}
                                ></NSPLButtonSquare>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2 - Prize Pool*/}
                <div className="py-16 lg:py-24">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-xlTitle lg:text-3xlTitle font-bold">
                            More Challenge, Epic Prizes
                        </p>
                        {getRankCards()}
                    </div>
                </div>
            </div>

            {/* SECTION 3 - Entry Fee and Capacity */}
            <div className="w-full">
                <div className="w-[90%] max-w-[1200px] mx-auto">
                    {/* SECTION 3 - Entry Fee and Players*/}
                    <div className="py-16 lg:py-24">
                        <div className="flex justify-between">
                            <div className="pt-10 lg:pt-24">
                                <div className="inline-block border-2 border-black px-2 py-1 lg:px-2.5 lg:py-2 mb-4 lg:mb-6">
                                    <p className="text-regTitle lg:text-2xl font-semibold">
                                        Entry Fee:{" "}
                                        <span className="text-secondary-700">
                                            ${tournament.entryFee}
                                        </span>
                                    </p>
                                </div>
                                <p className="text-regTitle lg:text-xlTitle font-medium mb-2 lg:mb-4">
                                    Total Warriors Waiting In Arena
                                </p>
                                <p className="text-2xlTitle lg:text-[64px] font-bold text-secondary-700">{`${
                                    tournament.totalRegistered || 0
                                }/${tournament.capacity || 0}`}</p>
                            </div>
                            <img
                                src={tournamentRegistrationSection3Image}
                                className="lg:mr:0 w-[200px] h-auto lg:w-[465px]"
                            />
                        </div>
                    </div>
                </div>
                <hr className="border border-500 drop-shadow-lg" />
            </div>

            {/* SECTION 4 - Rules */}
            <div className="w-[90%] max-w-[1200px] mx-auto">
                <div className="py-12 lg:py-20">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-xlTitle lg:text-3xlTitle font-bold text-center mb-6 lg:mb-10">
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
            <div className="w-full bg-gradient-green-flip">
                <div className="pt-20 pb-24 lg:pt-24 lg:pb-28">
                    <div className="flex flex-col justify-center items-center gap-8 lg:gap-12">
                        <p className="text-neutral-100 text-[26px] lg:text-2xlTitle font-bold text-center font-display uppercase">
                            Are your ready to see your true potential and <br />
                            write your own legacy?
                        </p>
                        <div>
                            <NSPLButtonSquare
                                onClick={() => navigator(routes.Register)}
                                text={"REGISTER NOW"}
                            ></NSPLButtonSquare>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CurrentTournamentDetailsPage;
