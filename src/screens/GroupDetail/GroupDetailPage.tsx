import { useLocation, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useLoader } from "../../components/LoaderProvider";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { GroupDetailPageVM } from "./GroupDetailPageVM";
import Avatar from "../../components/Avatar";
import TableHeader from "../../components/TableHeader";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

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
    const [addPlayer, setAddPlayer] = useState<
        { userId: number; point: number }[]
    >([]);
    const addPlayerRef = useRef(addPlayer);
    const [forceTableRender, setForceTableRender] = useState(0);
    const [realPlayers, setRealPlayers] = useState<
        TournamentServiceResponse.RegisteredPlayers_Struct[]
    >([]);

    const [isPlayerAdding, setIsPlayerAdding] = useState(true);

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

    const getPlayerAddSection = (userId: number) => {
        let playersCopy = addPlayerRef.current;
        const index = playersCopy.findIndex(
            (player) => userId === player.userId
        );
        return (
            <>
                {index === -1 ? (
                    <p
                        className="font-bold underline text-center"
                        onClick={() => {
                            console.log("YOO GETTING ADDED");
                            playersCopy.push({ userId: userId, point: 100 });
                            setAddPlayer(playersCopy);
                            setForceTableRender(forceTableRender + 1);
                        }}
                    >
                        Add
                    </p>
                ) : null}
                {index !== -1 ? (
                    <div className="flex flex-col items-center">
                        <div className="w-[65px]">
                            <InputField
                                type={"text"}
                                name=""
                                value={`${playersCopy[index].point}`}
                                onChange={(e) => {
                                    playersCopy[index].point = Number(
                                        e.target.value
                                    );
                                    setAddPlayer(playersCopy);
                                    setForceTableRender(forceTableRender + 1);
                                }}
                            />
                        </div>

                        <p
                            className="font-bold text-secondary-500 underline my-2"
                            onClick={() => {
                                console.log("YOO GETTING DELETED");
                                setAddPlayer(
                                    playersCopy.filter(
                                        (val) => val.userId !== userId
                                    )
                                );
                                setRealPlayers([]);
                                setRealPlayers(players);
                                setForceTableRender(forceTableRender + 1);
                            }}
                        >
                            Remove
                        </p>
                    </div>
                ) : null}
            </>
        );
    };

    const handlePlayerAdd = (userId: number) => {
        console.log("click add:", userId);
        setIsPlayerAdding(!isPlayerAdding);
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
                                    <td className="">
                                        {/* {!groupDetail.players?.find(
                                            (val) =>
                                                val.info.ssoId ===
                                                player.userSSOId
                                        ) && groupDetail.group?.isActive
                                            ? getPlayerAddSection(
                                                  player.userSSOId
                                              )
                                            : null} */}
                                        {!groupDetail.players?.find(
                                            (val) =>
                                                val.info.ssoId ===
                                                player.userSSOId
                                        ) &&
                                            groupDetail.group?.isActive && (
                                                <p
                                                    onClick={() =>
                                                        handlePlayerAdd(
                                                            player.userSSOId
                                                        )
                                                    }
                                                >
                                                    {isPlayerAdding
                                                        ? "Add"
                                                        : "Remove"}
                                                </p>
                                            )}
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
