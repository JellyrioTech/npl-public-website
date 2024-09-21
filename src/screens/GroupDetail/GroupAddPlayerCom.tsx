import React, { useState } from "react";
import NPLButton from "../../components/NPLButton";
import InputField from "../../components/InputField";

export type GroupAddPlayerinfoUXData = {
    playerId: number | null;
    initialPoints: number;
};

const GroupAddPlayerComp: React.FC<{
    players: { ssoId: number; name: string }[];
    close: () => void;
    save: (player: GroupAddPlayerinfoUXData[]) => void;
}> = (props) => {
    const [fields, setFields] = useState<GroupAddPlayerinfoUXData[]>([]);

    const addPlayerField = () => {
        setFields([...fields, { playerId: null, initialPoints: 100 }]);
    };

    const handlePlayerChange = (index: number, value: number) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? { ...field, playerId: value } : field
        );
        setFields(updatedFields);
    };

    const handlePointsChange = (index: number, value: string) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? { ...field, initialPoints: parseInt(value) } : field
        );
        setFields(updatedFields);
    };

    const saveFields = () => {
        props.save(fields);
    };

    return (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div className="p-6">
                    <div className="flex justify-between mb-6">
                        <div>
                            <p className="font-bold text-lg text-primary-700">
                                Add player to group
                            </p>
                            <hr className="border-2 border-primary-700" />
                        </div>
                        <p
                            className="cursor-pointer px-2 py-1 rounded hover:bg-secondary-300"
                            onClick={() => {
                                setFields([]);
                                props.close();
                            }}
                        >
                            X
                        </p>
                    </div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="rounded-xl flex flex-col gap-6">
                            {fields.map((field, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-5 border-b-2 pb-5"
                                >
                                    <div className="space-y-4">
                                        <label className="font-bold font-roboto m-0">
                                            Player
                                        </label>
                                        <select
                                            className="w-full border-2 border-primary-700"
                                            value={field.playerId || ""}
                                            onChange={(e) =>
                                                handlePlayerChange(
                                                    index,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        >
                                            <option value="" disabled>
                                                Choose a player:
                                            </option>
                                            {props.players.map((player) => (
                                                <option
                                                    key={player.ssoId}
                                                    value={player.ssoId}
                                                >
                                                    ({player.ssoId}).{" "}
                                                    {player.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <InputField
                                            type={"text"}
                                            name={"Intital Point"}
                                            value={`${field.initialPoints}`}
                                            onChange={(e) =>
                                                handlePointsChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                            <NPLButton
                                text={"Add Player"}
                                type="button"
                                onClick={addPlayerField}
                            />
                        </div>
                        <NPLButton
                            text={"Save"}
                            type="button"
                            onClick={saveFields}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GroupAddPlayerComp;
