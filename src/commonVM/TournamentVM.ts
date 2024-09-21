import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace TournamentRoutesVM {
    export async function getPublicTournamentInfo(
        tournamentId: number,
        cb: AsyncResponseCallback<
            Partial<TournamentServiceResponse.GetPublicTournamentInfoStruct>,
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.getTournamentPublicInfo(
                tournamentId
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!);
    }
}
