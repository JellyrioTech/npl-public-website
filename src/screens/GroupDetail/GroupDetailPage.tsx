import { useLocation, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useLoader } from "../../components/LoaderProvider";
import { useEffect, useState } from "react";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { GroupDetailPageVM } from "./GroupDetailPageVM";
import Avatar from "../../components/Avatar";
import TableHeader from "../../components/TableHeader";
import Button from "../../components/Button";

const GroupDetailPage: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const location = useLocation();
    const { players } = location.state as {
        players: TournamentServiceResponse.RegisteredPlayers_Struct[];
    };
    const { showLoader, hideLoader } = useLoader();
    const [refresh, setRefresh] = useState("");
    const [groupDetail, setgroupDetail] = useState<
        Partial<TournamentServiceResponse.GetGroupFullDetails>
    >({});
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        if (players.length === 0) {
            return;
        }
        GroupDetailPageVM.getGroupDetail(Number(groupId), {
            loaderCallback: (loader) => (loader ? showLoader() : hideLoader()),
            errorCallBack: (_, error) => {
                setError(error || "");
            },
            success: (obj) => {
                setgroupDetail(obj);
            },
        });
    }, [refresh]);

    const deactivateGroup = () => {
        setError("");
        GroupDetailPageVM.deactivateGroup(Number(groupId), {
            loaderCallback: (loader) => (loader ? showLoader() : hideLoader()),
            errorCallBack: (_, error) => {
                setError(error || "");
            },
            success: () => {
                setRefresh(new Date().toString());
            },
        });
    };

    return (
        <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
            <div className="flex justify-between items-center">
                <CardHeader header={groupDetail.group?.name} type="h1" />
                <p
                    className={`font-semibold uppercase px-7 py-2 rounded-xl text-white shadow ${
                        groupDetail.group?.isActive
                            ? "bg-primary-500"
                            : "bg-secondary-700"
                    }`}
                >
                    {groupDetail.group?.isActive ? "Active" : "In-Active"}
                </p>
            </div>
            {error !== "" ? (
                <p className="text-red-700 font-bold">{error}</p>
            ) : null}
            {groupDetail.group?.isActive ? (
                <div className="flex flex-col mt-8">
                    <div>
                        <Button
                            text="Deactivate Group"
                            onClick={deactivateGroup}
                        />
                    </div>
                </div>
            ) : null}

            <div className="mt-8">
                <CardHeader header="In Group Players" type="h2" />
                <div className="mt-4 relative overflow-x-auto rounded-lg md:mx-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <TableHeader
                            headerNames={["ID", "Name", "Points", ""]}
                        />
                        <tbody className="text-left border-b border-primary-700">
                            {groupDetail.players?.map((player) => (
                                <tr className="text-left text-black border-b border-primary-700 cursor-pointer hover:bg-primary-100">
                                    <th
                                        className="font-semibold uppercase px-4 py-1 md:px-6 md:py-4"
                                        scope="row"
                                    >
                                        {player.info.ssoId}
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="w-full flex items-center gap-3">
                                            <Avatar
                                                url={player.info.avatarLink}
                                            ></Avatar>
                                            <p>{`${player.info.name}`}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {player.points}
                                    </td>
                                    <td className="">
                                        <p className="font-bold text-red-600 underline">
                                            Remove
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8">
                <CardHeader header="Players Registered" type="h2" />
                <div className="mt-4 relative overflow-x-auto rounded-lg md:mx-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <TableHeader
                            headerNames={["ID", "Name", "Rank", "Status", ""]}
                        />
                        <tbody className="text-left border-b border-primary-700">
                            {players.map((player) => (
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
                                    <td className="">
                                        {!groupDetail.players?.find(
                                            (val) =>
                                                val.info.ssoId ===
                                                player.userSSOId
                                        ) && groupDetail.group?.isActive ? (
                                            <p className="font-bold underline">
                                                Add
                                            </p>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default GroupDetailPage;
