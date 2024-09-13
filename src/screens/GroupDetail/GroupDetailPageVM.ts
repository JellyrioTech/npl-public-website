import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace GroupDetailPageVM {
    export async function getGroupDetail(
        id: number,
        cb: AsyncResponseCallback<
            Partial<TournamentServiceResponse.GetGroupFullDetails>,
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.getGroupDetails(id);
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        const players = resp.result?.players?.sort((a, b) => {
            return a.points - b.points;
        });
        let copyResp = resp.result!;
        copyResp.players = players;
        cb.success(copyResp);
    }

    export async function addPlayerToGroup(
        id: number,
        registers: {
            userSSOId: number;
            startingScore: number;
        }[],
        cb: AsyncResponseCallback<
            Partial<TournamentServiceResponse.GetGroupFullDetails>,
            {}
        >
    ) {
        if (registers.length === 0) {
            return cb.errorCallBack(1, "No register are added");
        }
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.registerUserToTournamentGroup(
                id,
                registers
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!);
    }

    export async function deactivateGroup(
        id: number,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.deactivateTournamentGroup(id);
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }

    export async function removePlayerFromGroup(
        groupId: number,
        userId: number,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.removeUserFromTournamentGroup(
                groupId,
                userId
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }

    export async function createGame(
        groupId: number,
        pos1: number,
        pos2: number,
        pos3: number,
        pos4: number,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        if ((pos1 <= 0 && pos2 <= 0) || (pos3 <= 0 && pos4 <= 0)) {
            return cb.errorCallBack(
                1,
                "Wrong formating. Please form the correct formation: PS12"
            );
        }
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.createGroupGamesInsideTournament(
                groupId,
                [
                    {
                        teamA: { playerOneSSOId: pos1, playerTwoSSOId: pos2 },
                        teamB: { playerOneSSOId: pos3, playerTwoSSOId: pos4 },
                    },
                ]
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }
}
