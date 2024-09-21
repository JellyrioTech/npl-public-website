import { useNavigate, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useEffect, useState } from "react";
import { AdminArenaDetailsVM } from "./AdminArenaDetailsVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import TableHeader from "../../components/TableHeader";
import { AdminRoutes } from "../../util/routes";
import { CommonUtil } from "../../util/CommonUtil";

type adminArenaDetailsProps = {};

const AdminArenaDetailsPage: React.FC<adminArenaDetailsProps> = () => {
    const { arenaId } = useParams<{ arenaId: string }>();
    const id = parseInt(arenaId!);
    const [arena, setArena] =
        useState<Partial<TournamentServiceResponse.GetArenaDetailResponse>>();
    const [tournaments, setTournaments] = useState<
        Partial<TournamentServiceResponse.SearchTournamentRspObj>[]
    >([]);
    const [_, setLoader] = useState(false);
    const naviagte = useNavigate();
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        AdminArenaDetailsVM.getArenaDetails(id, {
            loaderCallback: (showLoader) => {
                setLoader(showLoader);
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setArena(obj);
            },
        });

        AdminArenaDetailsVM.getTournamentsForArena(id, {
            loaderCallback: (showLoader) => {
                setLoader(showLoader);
            },
            errorCallBack: () => {},
            success: (obj) => {
                setTournaments(obj.tournaments);
            },
        });
    }, []);

    const formatString = (text: string): string => {
        const cleanedString = text
            ?.replace(/[-_]/g, " ")
            .toLowerCase() // Ensure the input is in lowercase
            .split(" ") // Split into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(" "); // Join words back together

        return cleanedString;
    };

    const handleTournamentClick = (id: number) => {
        naviagte(AdminRoutes.tournamentDetails(id));
    };

    return (
        <>
            <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
                <CardHeader header={arena?.name} type="h1"></CardHeader>
                <div className="mt-4 space-y-6">
                    <div className="space-y-2">
                        <p>Description: {arena?.description}</p>
                        <p>
                            <span className="font-semibold">Address:</span>{" "}
                            {arena?.address}, {arena?.city}, {arena?.state}{" "}
                            {arena?.zipCode}
                        </p>
                    </div>

                    <div className="space-y-4 mx:auto">
                        <CardHeader
                            header="Current Tournaments"
                            type="h2"
                        ></CardHeader>
                        {error && (
                            <p className="text-red-600 mb-8 text-sm">{error}</p>
                        )}
                        <div className="relative overflow-x-auto rounded-lg lg:mx-10">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <TableHeader
                                    headerNames={[
                                        "Tournament Name",
                                        "Tournament Type",
                                        "Capacity",
                                        "Status",
                                        "Start Date",
                                        "End Date",
                                    ]}
                                ></TableHeader>
                                <tbody className="border-b border-primary-700">
                                    {tournaments.map((tournament) => (
                                        <tr
                                            className="text-black border-b text-center border-primary-700 cursor-pointer hover:bg-primary-100"
                                            onClick={() =>
                                                handleTournamentClick(
                                                    tournament.id!
                                                )
                                            }
                                            key={tournament.id}
                                        >
                                            <th
                                                className="text-left font-semibold uppercase px-4 py-1 lg:px-6 lg:py-4"
                                                scope="row"
                                            >
                                                {tournament.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {formatString(
                                                    tournament.type || ""
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {tournament.registeredPlayer} /{" "}
                                                {tournament.totalCapacity}
                                            </td>
                                            <td
                                                className={`px-6 py-4 font-bold ${CommonUtil.getStatusColor(
                                                    tournament.status
                                                )}`}
                                            >
                                                {formatString(
                                                    tournament.status || ""
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {tournament.startDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                {tournament.endDate}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminArenaDetailsPage;
