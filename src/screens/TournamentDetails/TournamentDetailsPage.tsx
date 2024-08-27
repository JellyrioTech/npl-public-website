import { useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useEffect, useState } from "react";
import { TournamentDetailsVM } from "./TournamentDetailsVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { CommonUtil } from "../../util/CommonUtil";
import InfoCard from "../../components/InfoCard";
import TableHeader from "../../components/TableHeader";
import Avatar from "../../components/Avatar";

type TournamemntDetailsProps = {};

const TournamentDetailsPage: React.FC<TournamemntDetailsProps> = (
    props: TournamemntDetailsProps
) => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [tournament, setTournament] =
        useState<
            Partial<TournamentServiceResponse.GetActiveTournamentInArena_Struct>
        >();
    const [registeredPlayers, setRegisteredPlayers] = useState<
        TournamentServiceResponse.RegisteredPlayers_Struct[]
    >([]);
    const id = parseInt(tournamentId!);
    const [_, setLoader] = useState(false);
    const [error, setError] = useState<string | null>();
    const [playerToDelete, setPlayerToDelete] = useState<number | undefined>();

    useEffect(() => {
        TournamentDetailsVM.getTournamentDetails(id, {
            loaderCallback: (showLoader) => {
                setLoader(showLoader);
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setTournament(obj);
            },
        });

        TournamentDetailsVM.getRegisteredPlayers(id, {
            loaderCallback: (showloader) => {},
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setRegisteredPlayers(obj);
            },
        });

        TournamentDetailsVM.removePlayerFromTournament(playerToDelete, {
            loaderCallback: (showloader) => {},
            errorCallBack: (_, error) => {},
            success: (obj) => {
                setError(obj.result);
            },
        });
    }, []);

    const showDeleteModal = () => {
        return (
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full">
                <div className="relative p-4 w-full">
                    <div className="relative shadow rounded-lg">
                        <p>{`Are you sure you want to remove player ${playerToDelete}?`}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
                <div className="flex justify-between">
                    <CardHeader
                        header={tournament?.name}
                        type="h1"
                    ></CardHeader>
                    <p
                        className={`font-semibold uppercase px-7 py-2 rounded-xl shadow ${CommonUtil.getStatusColor(
                            tournament?.status
                        )}`}
                    >
                        {tournament?.status}
                    </p>
                </div>
                <div>
                    <span className="font-semibold">Address: </span>
                    {`${tournament?.location?.address}, ${tournament?.location?.city}, ${tournament?.location?.state} ${tournament?.location?.zipCode}`}
                </div>
                <div className="mt-8 w-[80%] mx-auto flex justify-between gap-6">
                    <InfoCard
                        label="Type"
                        content={`${tournament?.type}`}
                    ></InfoCard>
                    <InfoCard
                        label="Capacity"
                        content={`${tournament?.capacity}`}
                    ></InfoCard>
                    <InfoCard
                        label="Date"
                        content={`${CommonUtil.DateHelper.formatDateToMonthDayYear(
                            tournament?.startDate?.toString() || ""
                        )} at ${CommonUtil.DateHelper.formatTimeToHourMin(
                            tournament?.startDate?.toString() || ""
                        )}`}
                    ></InfoCard>
                    <InfoCard
                        label="Entry Fee"
                        content={`${tournament?.entryFee}`}
                    ></InfoCard>
                </div>
                <div className="mt-8">
                    <CardHeader
                        header="Players Registered"
                        type="h2"
                    ></CardHeader>
                    {error && (
                        <p className="text-red-600 mb-8 text-sm">{error}</p>
                    )}
                    <div className="mt-4 relative overflow-x-auto rounded-lg md:mx-10">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <TableHeader
                                headerNames={[
                                    "ID",
                                    "Name",
                                    "Rank",
                                    "Status",
                                    "",
                                ]}
                            ></TableHeader>
                            <tbody className="text-left border-b border-primary-700">
                                {registeredPlayers.map((player) => (
                                    <tr className="text-left text-black border-b border-primary-700 cursor-pointer hover:bg-primary-100">
                                        <th
                                            className="font-semibold uppercase px-4 py-1 md:px-6 md:py-4"
                                            scope="row"
                                        >
                                            {player.userSSOId} (
                                            {player.tournamentRegisterId})
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="w-full flex items-center gap-3">
                                                <Avatar
                                                    url={player.avatarLink}
                                                ></Avatar>
                                                <p>{`${player.name} (${player.type})`}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {player.position}
                                        </td>
                                        <td className="px-6 py-4">
                                            {player.status}
                                        </td>
                                        <td className="border-x border-black mx-auto">
                                            <a className="cursor-pointer">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0px"
                                                    y="0px"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 30 30"
                                                    className="mx-auto"
                                                >
                                                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TournamentDetailsPage;
