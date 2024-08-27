import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace TournamentDetailsVM {
    export async function getTournamentDetails(
        tournamentId: number,
        cb: AsyncResponseCallback<
            Partial<TournamentServiceResponse.GetActiveTournamentInArena_Struct>,
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
        cb.success(resp.result!);
    }

    export async function getRegisteredPlayers(
        tournamentId: number,
        cb: AsyncResponseCallback<
            TournamentServiceResponse.RegisteredPlayers_Struct[],
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.getAllRegisteredPlayerForTournament(
                tournamentId
            );
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!.registeredPlayers || []);
    }

    export async function removePlayerFromTournament(
        tournamentRegisteredId: number | undefined,
        cb: AsyncResponseCallback<{ result: string }, {}>
    ) {
        if (tournamentRegisteredId === undefined) return;
        return cb.success({
            result: `Player ${tournamentRegisteredId} has been deleted`,
        });
    }
}
