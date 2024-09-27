import {
    AsyncResponseCallback,
    TournamentRegisterTypes,
    TournamentTypes,
} from "npl-service-module";
import { NetworkModule } from "../../../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace TournamentRegistrationConfirmationVM {
    export async function getTournamentDetails(
        tournamentId: number,
        cb: AsyncResponseCallback<
            {
                status: TournamentTypes.Status;
                rules: Partial<TournamentServiceResponse.TournamentRules_Struct>;
                userStatus: TournamentRegisterTypes.status | undefined;
                toc: string;
            },
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.getTournamentDetail(
            tournamentId
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        if (
            resp.result?.status !== "open" &&
            resp.result?.status !== "in-progress"
        ) {
            return cb.errorCallBack(2, "Tournament is not active right now");
        }
        cb.success({
            status: resp.result.status,
            rules: resp.result!.rules || {},
            userStatus: resp.result!.currentUser?.status,
            toc: resp.result!.tocLink || "",
        });
    }

    export async function registerTournament(
        tournamentId: number,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.joinTournament(
            tournamentId
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            cb.errorCallBack(1, resp.errorMessage);
            return;
        }
        cb.success({});
    }
}
