import { useNavigate, useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useEffect, useState } from "react";
import { TournamentDetailsVM } from "./TournamentDetailsVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { CommonUtil } from "../../util/CommonUtil";
import InfoCard from "../../components/InfoCard";
import TableHeader from "../../components/TableHeader";
import Avatar from "../../components/Avatar";
import ModalWithBackdrop from "../../components/ModalWithBackdrop";
import Button from "../../components/Button";
import { useLoader } from "../../components/LoaderProvider";
import InputField from "../../components/InputField";
import { AdminRoutes } from "../../util/routes";

type TournamemntDetailsProps = {};

const TournamentDetailsPage: React.FC<TournamemntDetailsProps> = (
    _: TournamemntDetailsProps
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
    const { showLoader, hideLoader } = useLoader();
    const [error, setError] = useState<string | null>();
    const [playerToDelete, setPlayerToDelete] =
        useState<TournamentServiceResponse.RegisteredPlayers_Struct>();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [groups, setGroups] = useState<
        TournamentServiceResponse.AdminGetGroups[]
    >([]);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupError, setGroupError] = useState("");
    const [refresh, setRefresh] = useState("");
    const navigator = useNavigate();
    const [newRanks, setNewRanks] = useState<{ rank: number; ssoId: number }[]>(
        []
    );

    useEffect(() => {
        TournamentDetailsVM.getTournamentDetails(id, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setTournament(obj);
                postTournamentDetailFn();
            },
        });

        TournamentDetailsVM.getRegisteredPlayers(id, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setRegisteredPlayers(obj);
            },
        });
    }, [refresh]);

    const postTournamentDetailFn = () => {
        TournamentDetailsVM.getGroupsForTournament(Number(tournamentId), {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setGroups(obj.groups);
            },
        });
    };

    const handleDeleteClick = (
        e: React.MouseEvent,
        player: TournamentServiceResponse.RegisteredPlayers_Struct
    ) => {
        e.preventDefault();
        console.log("clicked delete");
        setShowDeleteModal(true);
        setPlayerToDelete(player);
    };

    const handleDeleteConfirm = () => {
        removePlayer();
        setShowDeleteModal(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    const createGroup = () => {
        setGroupError("");
        TournamentDetailsVM.createGroup(Number(tournamentId), groupName, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setGroupError(error || "");
            },
            success: () => {
                setShowGroupModal(false);
                setRefresh(new Date().toString());
            },
        });
    };

    const handleStartTournament = () => {
        TournamentDetailsVM.startTournament(
            tournament?.tournamentId,
            "in-progress",
            {
                loaderCallback: (loader) => {
                    loader ? showLoader() : hideLoader();
                },
                errorCallBack: (_, error) => {
                    setError(error);
                },
                success: () => {
                    setRefresh(new Date().toString());
                },
            }
        );
    };

    const removePlayer = () => {
        TournamentDetailsVM.removePlayerFromTournament(
            playerToDelete?.tournamentRegisterId,
            {
                loaderCallback: (loader) => {
                    loader ? showLoader() : hideLoader();
                },
                errorCallBack: (_, error) => {
                    setError(error);
                },
                success: (obj) => {
                    alert(obj.result);
                },
            }
        );
    };

    const getEmailCSF = () => {
        TournamentDetailsVM.getEmailCSF(parseInt(tournamentId || "0"), {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                CommonUtil.openJSON(obj);
            },
        });
    };

    const onChangeRank = (rank: number, ssoId: number) => {
        const newRanksCopy = newRanks.filter((val) => val.ssoId !== ssoId);
        newRanksCopy.push({ rank, ssoId });
        console.log(newRanksCopy);
        setNewRanks(newRanksCopy);
    };

    const saveRank = () => {
        TournamentDetailsVM.rankPlayers(
            newRanks,
            parseInt(tournamentId || "0"),
            {
                loaderCallback: (loader) => {
                    loader ? showLoader() : hideLoader();
                },
                errorCallBack: (_, error) => {
                    setError(error);
                },
                success: () => {
                    setRefresh(new Date().toString());
                },
            }
        );
    };

    const createGroupModal = (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div className="p-6">
                    <div className="flex justify-between mb-6">
                        <div>
                            <p className="font-bold text-lg text-primary-700">
                                Create new group
                            </p>
                            <hr className="border-2 border-primary-700" />
                        </div>
                        <p
                            className="cursor-pointer px-2 py-1 rounded hover:bg-secondary-300"
                            onClick={() => setShowGroupModal(false)}
                        >
                            X
                        </p>
                    </div>
                    <form
                        onSubmit={() => {
                            createGroup();
                        }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="rounded-xl flex flex-col gap-6">
                            <div className="space-y-4">
                                {groupError !== "" ? (
                                    <p className="text-red-700">{groupError}</p>
                                ) : null}
                                <InputField
                                    type={"text"}
                                    name={"Group Name"}
                                    value={groupName}
                                    placeholder="ClearOne Sports Center"
                                    onChange={(e) => {
                                        setGroupName(e.target.value);
                                    }}
                                    isRequired={true}
                                ></InputField>
                            </div>
                            <Button text={"Create"} type="submit"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {showGroupModal && createGroupModal}
            <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
                {tournament?.status === "open" && (
                    <Button
                        text="Start tournament"
                        classes="mb-4"
                        onClick={handleStartTournament}
                    ></Button>
                )}
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
                {tournament?.status !== "open" ? (
                    <div className="pt-8 pb-3">
                        <div className="flex justify-between items-center">
                            <CardHeader header="Groups" type="h2" />
                            {tournament?.status === "in-progress" ? (
                                <Button
                                    text="Create"
                                    onClick={() => setShowGroupModal(true)}
                                />
                            ) : null}
                        </div>

                        <div className="mt-4 relative overflow-x-auto rounded-lg md:mx-10">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <TableHeader
                                    headerNames={["Id", "Name", "Status", ""]}
                                ></TableHeader>
                                <tbody className="text-left border-b border-primary-700">
                                    {groups.map((group) => (
                                        <tr className="text-left text-black border-b border-primary-700 cursor-pointer hover:bg-primary-100">
                                            <th
                                                className="font-semibold uppercase px-4 py-1 md:px-6 md:py-4"
                                                scope="row"
                                            >
                                                {group.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {group.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {(group.isActive as any as number) ===
                                                0 ? (
                                                    <span className="bg-secondary-700 text-white p-2 rounded-lg">
                                                        Inactive
                                                    </span>
                                                ) : (
                                                    <span className="bg-primary-700 text-white p-2 rounded-lg">
                                                        Active
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <p
                                                    className="font-bold underline"
                                                    onClick={() =>
                                                        navigator(
                                                            AdminRoutes.groupDetails(
                                                                group.id
                                                            ),
                                                            {
                                                                state: {
                                                                    players:
                                                                        registeredPlayers,
                                                                },
                                                            }
                                                        )
                                                    }
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
                ) : null}

                <div className="mt-8">
                    <div className="flex justify-between items-center">
                        <CardHeader header="Players Registered" type="h2" />
                        <div className="flex gap-3">
                            <Button
                                text="Get Email CSF"
                                onClick={() => getEmailCSF()}
                            />
                            <Button
                                text="Save Rank"
                                onClick={() => saveRank()}
                            />
                        </div>
                    </div>

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
                                            {tournament?.status ===
                                            "in-progress" ? (
                                                <div>
                                                    <p className="mb-3 font-bold">
                                                        {player.position}
                                                    </p>
                                                    <select
                                                        onChange={(e) =>
                                                            onChangeRank(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ),
                                                                player.userSSOId
                                                            )
                                                        }
                                                    >
                                                        <option value={-1}>
                                                            Choose a rank
                                                        </option>
                                                        {registeredPlayers.map(
                                                            (_, index) => (
                                                                <option
                                                                    value={
                                                                        index +
                                                                        1
                                                                    }
                                                                >
                                                                    {index + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            ) : (
                                                <p>{player.position}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p>{player.status}</p>
                                        </td>
                                        <td className="border-x border-black mx-auto">
                                            {tournament?.status === "open" && (
                                                <a
                                                    className="hover:cursor-pointer"
                                                    onClick={(e) =>
                                                        handleDeleteClick(
                                                            e,
                                                            player
                                                        )
                                                    }
                                                >
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
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showDeleteModal && (
                    <ModalWithBackdrop
                        onCancel={handleDeleteCancel}
                        onConfirm={handleDeleteConfirm}
                    >
                        <h2>{`Are you sure you want to remove player: ${playerToDelete?.name}`}</h2>
                    </ModalWithBackdrop>
                )}
            </section>
        </>
    );
};

export default TournamentDetailsPage;
