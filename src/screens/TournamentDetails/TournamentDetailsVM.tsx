import { AsyncResponseCallback, TournamentTypes } from "npl-service-module";
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

    export async function startTournament(
        tournamentId: number | undefined,
        status: TournamentTypes.Status,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        if (tournamentId === undefined) return;
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.setTournamentStateFromOpen(
                tournamentId,
                status
            );
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }

    export async function getGroupsForTournament(
        tournamentId: number,
        cb: AsyncResponseCallback<
            { groups: TournamentServiceResponse.AdminGetGroups[] },
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.getGroupsInTournament(
                tournamentId
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!);
    }

    export async function createGroup(
        tournamentId: number,
        name: string,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        if (name === "") {
            cb.errorCallBack(1, "Name is empty");
        }
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.createGroupInsideTournament(
                tournamentId,
                name
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }

    export async function getEmailCSF(
        tournamentId: number,
        cb: AsyncResponseCallback<
            {
                email: string;
                name: string;
                TOURNAMENT_NAME: string;
                TOURNAMENT_DATE: string;
                TOURNAMENT_TIME: string;
                CLUB_NAME: string;
                CLUB_ADDRESS: string;
            }[],
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.getEmailCSFForTournament(
                tournamentId
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp);
    }

    export async function rankPlayers(
        players: { rank: number; ssoId: number }[],
        tournamentId: number,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        if (players.length === 0) {
            return cb.errorCallBack(1, "No players found for ranking");
        }
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.updatePlayerPosition(
            tournamentId,
            players.map((player) => ({
                userSSOId: player.ssoId,
                position: player.rank,
            }))
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }
}
