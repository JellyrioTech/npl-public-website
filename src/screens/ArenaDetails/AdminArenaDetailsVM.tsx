import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace AdminArenaDetailsVM {
    export async function getArenaDetails(
        id: number,
        cb: AsyncResponseCallback<
            Partial<TournamentServiceResponse.GetArenaDetailResponse>,
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.getArenaDetail(id);
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!);
    }

    export async function getTournamentsForArena(
        arenaId: number,
        cb: AsyncResponseCallback<
            {
                tournaments: Partial<TournamentServiceResponse.SearchTournamentRspObj>[];
            },
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.searchTournament({
            arenaId,
        });
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({ tournaments: resp });
    }
}
