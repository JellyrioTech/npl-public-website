import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { GameServiceResponse } from "npl-service-module/dist/services/Response/GameService.response";

export namespace GameDetailVM {
    export async function getGameDetailInfo(
        gameid: number,
        cb: AsyncResponseCallback<
            Partial<GameServiceResponse.GameFullDetailInfo>,
            {}
        >
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.gameService.getFullGameDetailInfo(
            gameid
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!);
    }
}
