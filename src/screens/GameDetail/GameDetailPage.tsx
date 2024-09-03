import { useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useLoader } from "../../components/LoaderProvider";
import { useEffect, useState } from "react";
import { GameDetailVM } from "./GameDetailVM";
import { GameServiceResponse } from "npl-service-module/dist/services/Response/GameService.response";
import Button from "../../components/Button";

const GameDetailPage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const { showLoader, hideLoader } = useLoader();
    const [error, setError] = useState("");
    const [gameDetail, setGameDetail] =
        useState<Partial<GameServiceResponse.GameFullDetailInfo>>();
    const [refresh, setRefresh] = useState("");

    useEffect(() => {
        setError("");
        GameDetailVM.getGameDetailInfo(parseInt(gameId || "0"), {
            loaderCallback: (loader) => (loader ? showLoader() : hideLoader()),
            errorCallBack: (_, error) => setError(error || ""),
            success: (obj) => setGameDetail(obj),
        });
    }, [refresh]);

    const finalizeGame = (score: number) => {
        setError("");
        GameDetailVM.finalizeGame(parseInt(gameId || "0"), score, {
            loaderCallback: (loader) => (loader ? showLoader() : hideLoader()),
            errorCallBack: (_, error) => setError(error || ""),
            success: () => setRefresh(new Date().toString()),
        });
    };

    return (
        <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
            <div>
                <div className="flex justify-between items-center">
                    <CardHeader type="h1" header="Game Details" />
                    <p className="bg-primary-700 p-3 rounded-lg text-white font-roboto font-bold">
                        {gameDetail?.status?.toUpperCase()}
                    </p>
                </div>

                {error !== "" ? (
                    <p className="text-red-500 font-roboto">{error}</p>
                ) : null}
                <div className="flex mt-6 gap-3 flex-wrap justify-center">
                    <div className="flex flex-col border-2 gap-2 border-tertiary-700 rounded-lg p-5 items-center">
                        <p className="font-roboto font-bold">Match Code</p>
                        <p className="font-oswald">{gameDetail?.matchCode}</p>
                    </div>
                    <div className="flex flex-col border-2 gap-2 border-tertiary-700 rounded-lg p-5 items-center">
                        <p className="font-roboto font-bold">Host</p>
                        <p className="font-oswald">
                            {gameDetail?.host?.name || ""}
                        </p>
                    </div>
                    <div className="flex flex-col border-2 gap-2 border-tertiary-700 rounded-lg p-5 items-center">
                        <p className="font-roboto font-bold">Game Type</p>
                        <p className="font-oswald">{gameDetail?.type}</p>
                    </div>
                    <div className="flex flex-col border-2 gap-2 border-tertiary-700 rounded-lg p-5 items-center">
                        <p className="font-roboto font-bold">
                            Score Relaibility
                        </p>
                        <p className="font-oswald">
                            {gameDetail?.scoreReliability}
                        </p>
                    </div>
                    <div className="flex flex-col border-2 gap-2 border-tertiary-700 rounded-lg p-5 items-center">
                        <p className="font-roboto font-bold">Start Date</p>
                        <p className="font-oswald">
                            {gameDetail?.gameStartDate || "Unknown"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <CardHeader type="h2" header="Location" />
                <p>{gameDetail?.location || "No Location Defined"}</p>
            </div>
            <div className="mt-8">
                <CardHeader type="h2" header="Match " />
                <div className="flex gap-5 mt-3">
                    <div className="flex-1 flex border-2 border-tertiary-700 rounded-lg p-5 gap-8 justify-between">
                        <div className="flex flex-col gap-3">
                            <p>
                                {
                                    gameDetail?.players?.find(
                                        (player) => player.position === 1
                                    )?.name
                                }
                            </p>
                            <p>
                                {
                                    gameDetail?.players?.find(
                                        (player) => player.position === 2
                                    )?.name
                                }
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p
                                className={`font-bold font-roboto text-3xl ${
                                    (gameDetail?.matchResult?.teamAScore || 0) >
                                    (gameDetail?.matchResult?.teamBScore || 0)
                                        ? "text-primary-700"
                                        : "text-secondary-700"
                                }`}
                            >
                                {gameDetail?.matchResult?.teamAScore || "-"}
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 flex border-2 border-tertiary-700 rounded-lg p-5 gap-8 justify-between">
                        <div className="flex flex-col gap-3">
                            <p>
                                {
                                    gameDetail?.players?.find(
                                        (player) => player.position === 3
                                    )?.name
                                }
                            </p>
                            <p>
                                {
                                    gameDetail?.players?.find(
                                        (player) => player.position === 4
                                    )?.name
                                }
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p
                                className={`font-bold font-roboto text-3xl ${
                                    (gameDetail?.matchResult?.teamAScore || 0) <
                                    (gameDetail?.matchResult?.teamBScore || 0)
                                        ? "text-primary-700"
                                        : "text-secondary-700"
                                }`}
                            >
                                {gameDetail?.matchResult?.teamBScore || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <CardHeader type="h2" header="Reported Scores" />
                <div className="flex mt-3 gap-3">
                    {gameDetail?.reportedScores?.map((score) => (
                        <div className="flex border-2 rounded-lg border-tertiary-700 p-5 flex-col items-center flex-wrap">
                            <p className="font-bold mb-3 text-xl">
                                {score.reportedBy.name}
                            </p>
                            <p className="font-bold">
                                Team A: {score.teamAScore}
                            </p>
                            <p className="font-bold">
                                Team B: {score.teamBscore}
                            </p>
                            {gameDetail.status === "closed" &&
                            gameDetail.matchResult?.teamAScore === null ? (
                                <div className="mb-3">
                                    <Button
                                        text="Finalize Game"
                                        onClick={() =>
                                            finalizeGame(score.scoreId)
                                        }
                                    />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameDetailPage;
