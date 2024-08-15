import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { PaymentResponse } from "npl-service-module/dist/services/Response/PaymentService.response";

export namespace TournamentPaymentVM {
    export async function getPaymentIntent(
        tournamentId: number,
        cb: AsyncResponseCallback<Partial<PaymentResponse>, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.tournamentService.getPaymentIntent(
            tournamentId
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result!);
    }
}
