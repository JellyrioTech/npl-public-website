import { useParams } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import { useEffect, useState } from "react";
import { TournamentDetailsVM } from "./TournamentDetailsVM";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { CommonUtil } from "../../util/CommonUtil";

type TournamemntDetailsProps = {};

const TournamentDetailsPage: React.FC<TournamemntDetailsProps> = (
    props: TournamemntDetailsProps
) => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [tournament, setTournament] =
        useState<
            Partial<TournamentServiceResponse.GetActiveTournamentInArena_Struct>
        >();
    const id = parseInt(tournamentId!);
    const [_, setLoader] = useState(false);

    useEffect(() => {
        TournamentDetailsVM.getTournamentDetails(id, {
            loaderCallback: (showLoader) => {
                setLoader(showLoader);
            },
            errorCallBack: (error) => {},
            success: (obj) => {
                setTournament(obj);
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
                        className={`font-semibold uppercase px-7 py-2 rounded-xl ${CommonUtil.getStatusColor(
                            tournament?.status
                        )}`}
                    >
                        {tournament?.status}
                    </p>
                </div>
            </section>
        </>
    );
};

export default TournamentDetailsPage;
