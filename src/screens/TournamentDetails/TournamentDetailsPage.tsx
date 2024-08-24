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
    }, []);

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
                                headerNames={["ID", "Name", "Rank", "Status"]}
                            ></TableHeader>
                            <tbody className="text-left border-b border-primary-700">
                                {registeredPlayers.map((player) => (
                                    <tr className="text-left text-black border-b border-primary-700 cursor-pointer hover:bg-primary-100">
                                        <th
                                            className="font-semibold uppercase px-4 py-1 md:px-6 md:py-4"
                                            scope="row"
                                        >
                                            {player.userSSOId}
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
