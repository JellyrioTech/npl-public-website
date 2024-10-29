import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace NavbarVM {
    export async function getOpenTournaments(
        cb: AsyncResponseCallback<
            Partial<TournamentServiceResponse.SearchTournamentRspObj>[],
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.searchTournament_Public({
                status: ["open"],
            });
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(resp.code, resp.errorMessage);
        }

        return cb.success(resp);
    }
}
