import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";

export namespace AdminDashboardVM {
    export async function getArenas(
        cb: AsyncResponseCallback<
            { arenas: TournamentServiceResponse.GetArenaNearPlayerResponse[] },
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.getArenaNearBy(
            "Orlando"
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({ arenas: resp.result! });
    }

    export async function createArena(
        name: string,
        address: string,
        city: string,
        state: string,
        zipCode: string,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.userService.createArena({
            name: name,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
        });
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }
}
