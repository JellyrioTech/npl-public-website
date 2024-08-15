import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { TournamentRulesVM } from "./TournamentRulesVM";
import { TournamentRegisterTypes } from "npl-service-module";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { routes } from "../../../util/routes";

const TournamentRulesPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [userStatus, setUserStatus] = useState<
        TournamentRegisterTypes.status | undefined
    >(undefined);
    const [rules, setUserRules] = useState<
        Partial<TournamentServiceResponse.TournamentRules_Struct>
    >({});
    const naivgate = useNavigate();
    useEffect(() => {
        TournamentRulesVM.getTournamentDetails(Number(tournamentId), {
            loaderCallback: () => {},
            errorCallBack: (code: number) => {
                console.log("Yooo");
                if (code === 2) {
                    naivgate(routes.Home);
                    return;
                }
            },
            success: (obj) => {
                setUserStatus(obj.userStatus);
                setUserRules(obj.rules);
            },
        });
    }, []);
    return <div></div>;
};

export default TournamentRulesPage;
