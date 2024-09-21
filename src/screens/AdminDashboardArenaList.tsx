import { useEffect, useState } from "react";
import NPLButton from "../components/NPLButton";
import InputField from "../components/InputField";
import { AdminDashboardVM } from "./AdminDashboardVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "../util/routes";
import CardHeader from "../components/CardHeader";

function AdminDashboardArenaList() {
    const [arenaName, setArenaName] = useState("");
    const [arenaAddress, setArenaAddress] = useState("");
    const [arenaCity, setArenaCity] = useState("");
    const [arenaState, setArenaState] = useState("");
    const [arenaZipcode, setArenaZipcode] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [arenas, setArenas] = useState<
        TournamentServiceResponse.GetArenaNearPlayerResponse[]
    >([]);
    const [refresh, setRefresh] = useState("");

    useEffect(() => {
        AdminDashboardVM.getArenas({
            loaderCallback: () => {},
            errorCallBack: () => {},
            success: (obj) => {
                setArenas(obj.arenas);
            },
        });
    }, [refresh]);

    const navigate = useNavigate();

    const openCreateArenaModal = () => {
        setIsModalVisible(true);
    };

    const closeCreateArenaModal = () => {
        setIsModalVisible(false);
    };

    const handleAddArena = () => {
        AdminDashboardVM.createArena(
            arenaName,
            arenaAddress,
            arenaCity,
            arenaState,
            arenaZipcode,
            {
                loaderCallback: () => {},
                errorCallBack: () => {
                    closeCreateArenaModal();
                },
                success: () => {
                    closeCreateArenaModal();
                    setRefresh(new Date().toString());
                },
            }
        );
    };

    const handleArenaClick = (id: number) => {
        navigate(AdminRoutes.arenaDetails(id));
    };

    return (
        <>
            <section className="max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
                <div className="flex justify-between">
                    <CardHeader header="Create Arena" type="h1"></CardHeader>
                    <NPLButton
                        text={"Create Arena"}
                        onClick={openCreateArenaModal}
                    ></NPLButton>
                </div>

                <div className="mt-4 space-y-4 mx:auto">
                    {arenas.map((arena) => (
                        <div
                            className="p-6 bg-primary-900 rounded-lg cursor-pointer shadow-md hover:bg-primary-700 flex"
                            onClick={() => handleArenaClick(arena.arenaId)}
                        >
                            <p className="basis-1/3 font-bold text-lg uppercase text-neutral-100">
                                {arena.name}
                            </p>
                            <div>
                                <p className="text-neutral-300">
                                    Address: No Address
                                </p>
                                <p className="text-neutral-300">
                                    Orlando, Florida
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {isModalVisible && (
                <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
                    <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between mb-6">
                                <div>
                                    <p className="font-bold text-lg text-primary-700">
                                        Add New Arena
                                    </p>
                                    <hr className="border-2 border-primary-700" />
                                </div>
                                <p
                                    className="cursor-pointer px-2 py-1 rounded hover:bg-secondary-300"
                                    onClick={closeCreateArenaModal}
                                >
                                    X
                                </p>
                            </div>
                            <form
                                onSubmit={handleAddArena}
                                className="space-y-4 lg:space-y-6"
                            >
                                <div className="rounded-xl flex flex-col gap-6">
                                    <div className="space-y-4">
                                        <InputField
                                            type={"text"}
                                            name={"Arena Name"}
                                            value={arenaName}
                                            placeholder="ClearOne Sports Center"
                                            onChange={(e) =>
                                                setArenaName(e.target.value)
                                            }
                                            isRequired={true}
                                        ></InputField>
                                        <InputField
                                            type={"text"}
                                            name={"Arena Address"}
                                            value={arenaAddress}
                                            placeholder="1 Orlando Ave"
                                            onChange={(e) =>
                                                setArenaAddress(e.target.value)
                                            }
                                            isRequired={true}
                                        ></InputField>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
                                            <InputField
                                                type={"text"}
                                                name={"Arena City"}
                                                value={arenaCity}
                                                placeholder="Orlando"
                                                onChange={(e) =>
                                                    setArenaCity(e.target.value)
                                                }
                                                isRequired={true}
                                            ></InputField>
                                            <InputField
                                                type={"text"}
                                                name={"Arena State"}
                                                value={arenaState}
                                                placeholder="Florida"
                                                onChange={(e) =>
                                                    setArenaState(
                                                        e.target.value
                                                    )
                                                }
                                                isRequired={true}
                                            ></InputField>
                                            <InputField
                                                type={"text"}
                                                name={"Arena Zipcode"}
                                                value={arenaZipcode}
                                                placeholder="12345"
                                                onChange={(e) =>
                                                    setArenaZipcode(
                                                        e.target.value
                                                    )
                                                }
                                                isRequired={true}
                                            ></InputField>
                                        </div>
                                    </div>
                                    <NPLButton
                                        text={"Add Arena"}
                                        type="submit"
                                    ></NPLButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminDashboardArenaList;
