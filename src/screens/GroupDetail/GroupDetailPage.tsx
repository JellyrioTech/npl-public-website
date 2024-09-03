import { useLocation, useNavigate, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useLoader } from "../../components/LoaderProvider";
import { useEffect, useState } from "react";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { GroupDetailPageVM } from "./GroupDetailPageVM";
import Avatar from "../../components/Avatar";
import TableHeader from "../../components/TableHeader";
import Button from "../../components/Button";
import GroupAddPlayerComp, {
    GroupAddPlayerinfoUXData,
} from "./GroupAddPlayerCom";
import { AdminRoutes, routes } from "../../util/routes";

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
    const [realPlayers, setRealPlayers] = useState<
        TournamentServiceResponse.RegisteredPlayers_Struct[]
    >([]);

    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [pos3, setPos3] = useState(0);
    const [pos4, setPos4] = useState(0);
    const naivgate = useNavigate();

    useEffect(() => {
        setRealPlayers(players);
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

    const savePlayerAction = (players: GroupAddPlayerinfoUXData[]) => {
        GroupDetailPageVM.addPlayerToGroup(
            parseInt(groupId || ""),
            players.map((player) => ({
                userSSOId: player.playerId || 0,
                startingScore: player.initialPoints || 0,
            })),
            {
                loaderCallback: (loader) =>
                    loader ? showLoader() : hideLoader(),
                errorCallBack: (_, error) => {
                    setError(error || "");
                },
                success: () => {
                    setShowAddPlayerModal(false);
                    setRefresh(new Date().toString());
                },
            }
        );
    };
    const getPlayersForGroup = () => {
        return players
            .filter((player) => {
                return (
                    groupDetail.players?.find((exisitingGroupPlayer) => {
                        return (
                            exisitingGroupPlayer.info.ssoId === player.userSSOId
                        );
                    }) === undefined
                );
            })
            .map((player) => {
                return {
                    ssoId: player.userSSOId,
                    name: player.name,
                };
            });
    };

    const removePlayer = (userId: number) => {
        GroupDetailPageVM.removePlayerFromGroup(
            parseInt(groupId || "0"),
            userId,
            {
                loaderCallback: (loader) =>
                    loader ? showLoader() : hideLoader(),
                errorCallBack: (_, error) => {
                    setError(error || "");
                },
                success: () => {
                    setRefresh(new Date().toString());
                },
            }
        );
    };

    const createGame = () => {
        setError("");
        GroupDetailPageVM.createGame(
            parseInt(groupId || "0"),
            pos1,
            pos2,
            pos3,
            pos4,
            {
                loaderCallback: (loader) =>
                    loader ? showLoader() : hideLoader(),
                errorCallBack: (_, error) => {
                    setError(error || "");
                },
                success: () => {
                    setRefresh(new Date().toString());
                },
            }
        );
    };

    return (
        <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
            {showAddPlayerModal && (
                <GroupAddPlayerComp
                    players={getPlayersForGroup()}
                    close={() => setShowAddPlayerModal(false)}
                    save={(player) => {
                        savePlayerAction(player);
                    }}
                />
            )}
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
                    <div className="flex gap-4">
                        <Button
                            text="Deactivate Group"
                            onClick={deactivateGroup}
                        />
                        <Button
                            text="Add Players"
                            onClick={() => {
                                setShowAddPlayerModal(true);
                            }}
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
                                        {player.points || 0}
                                    </td>
                                    <td className="">
                                        <p
                                            className="font-bold text-red-600 underline"
                                            onClick={() =>
                                                removePlayer(player.info.ssoId)
                                            }
                                        >
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
                            {realPlayers.map((player) => (
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
                                    <td className=""></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8">
                <CardHeader header="Games" type="h2" />
                <div className="mt-4 relative overflow-x-auto rounded-lg md:mx-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <TableHeader
                            headerNames={[
                                "Game ID",
                                "Team A",
                                "Team B",
                                "status",
                                "",
                            ]}
                        />
                        <tbody className="text-left border-b border-primary-700">
                            {groupDetail.matches?.map((match) => (
                                <tr
                                    key={match.gameInfo.gameId}
                                    className="text-left text-black border-b border-primary-700 cursor-pointer hover:bg-primary-100"
                                >
                                    <th
                                        className="font-semibold uppercase px-4 py-1 md:px-6 md:py-4"
                                        scope="row"
                                    >
                                        {match.gameInfo.gameCode}
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex flex-col gap-3">
                                                <div className="w-full flex items-center gap-3">
                                                    <Avatar
                                                        url={
                                                            match.players.find(
                                                                (val) =>
                                                                    val.position ===
                                                                    1
                                                            )?.avatarLink
                                                        }
                                                    />
                                                    <p>{`${
                                                        match.players.find(
                                                            (val) =>
                                                                val.position ===
                                                                1
                                                        )?.name
                                                    }`}</p>
                                                </div>
                                                <div className="w-full flex items-center gap-3">
                                                    <Avatar
                                                        url={
                                                            match.players.find(
                                                                (val) =>
                                                                    val.position ===
                                                                    2
                                                            )?.avatarLink
                                                        }
                                                    />
                                                    <p>{`${
                                                        match.players.find(
                                                            (val) =>
                                                                val.position ===
                                                                2
                                                        )?.name
                                                    }`}</p>
                                                </div>
                                            </div>
                                            <p
                                                className={`font-bold ${
                                                    match.teamAScore >
                                                    match.teamBScore
                                                        ? "text-primary-700"
                                                        : "text-secondary-500"
                                                } font-roboto text-2xl ml-8`}
                                            >
                                                {match.teamAScore ?? "-"}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex flex-col gap-3">
                                                <div className="w-full flex items-center gap-3">
                                                    <Avatar
                                                        url={
                                                            match.players.find(
                                                                (val) =>
                                                                    val.position ===
                                                                    3
                                                            )?.avatarLink
                                                        }
                                                    />
                                                    <p>{`${
                                                        match.players.find(
                                                            (val) =>
                                                                val.position ===
                                                                3
                                                        )?.name
                                                    }`}</p>
                                                </div>
                                                <div className="w-full flex items-center gap-3">
                                                    <Avatar
                                                        url={
                                                            match.players.find(
                                                                (val) =>
                                                                    val.position ===
                                                                    4
                                                            )?.avatarLink
                                                        }
                                                    />
                                                    <p>{`${
                                                        match.players.find(
                                                            (val) =>
                                                                val.position ===
                                                                4
                                                        )?.name
                                                    }`}</p>
                                                </div>
                                            </div>
                                            <p
                                                className={`font-bold ${
                                                    match.teamAScore <
                                                    match.teamBScore
                                                        ? "text-primary-700"
                                                        : "text-secondary-500"
                                                } font-roboto text-2xl ml-8`}
                                            >
                                                {match.teamBScore ?? "-"}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="px-6 py-4 font-bold">
                                            {match.gameInfo.status.toUpperCase()}
                                        </p>
                                    </td>
                                    <td className="">
                                        <p
                                            className="font-bold  underline"
                                            onClick={() => {
                                                naivgate(
                                                    AdminRoutes.gameDetails(
                                                        match.gameInfo.gameId
                                                    )
                                                );
                                            }}
                                        >
                                            View
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {groupDetail.group?.isActive ? (
                <div className="mt-8">
                    <CardHeader type="h2" header="Create Game" />
                    <table className="w-full text-sm text-left rtl:text-right mt-4">
                        <TableHeader headerNames={["Team A", "Team B", ""]} />
                        <tr>
                            <td className="py-5">
                                <div className="flex gap-5">
                                    <select
                                        className="border-2 border-primary-900 w-[200px] h-[50px]"
                                        onChange={(e) => {
                                            setPos1(parseInt(e.target.value));
                                        }}
                                    >
                                        <option value="-1">
                                            Select a player
                                        </option>
                                        {groupDetail.players?.map((player) => (
                                            <option value={player.info.ssoId}>
                                                {player.info.ssoId}.{" "}
                                                {player.info.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="border-2 border-primary-900 w-[200px] h-[50px]"
                                        onChange={(e) => {
                                            setPos2(parseInt(e.target.value));
                                        }}
                                    >
                                        <option value="-1">No Player</option>
                                        {groupDetail.players?.map((player) => (
                                            <option value={player.info.ssoId}>
                                                {player.info.ssoId}.{" "}
                                                {player.info.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td className="py-5">
                                <div className="flex gap-5">
                                    <select
                                        className="border-2 border-primary-900 w-[200px] h-[50px]"
                                        onChange={(e) => {
                                            setPos3(parseInt(e.target.value));
                                        }}
                                    >
                                        <option value="-1">
                                            Select a player
                                        </option>
                                        {groupDetail.players?.map((player) => (
                                            <option value={player.info.ssoId}>
                                                {player.info.ssoId}.{" "}
                                                {player.info.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="border-2 border-primary-900 w-[200px] h-[50px]"
                                        onChange={(e) => {
                                            setPos4(parseInt(e.target.value));
                                        }}
                                    >
                                        <option value="-1">No Player</option>
                                        {groupDetail.players?.map((player) => (
                                            <option value={player.info.ssoId}>
                                                {player.info.ssoId}.{" "}
                                                {player.info.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <p
                                    className="bg-secondary-500 p-5 rounded-md cursor-pointer text-center text-white font-bold"
                                    onClick={createGame}
                                >
                                    Create Match
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            ) : null}
        </section>
    );
};

export default GroupDetailPage;
