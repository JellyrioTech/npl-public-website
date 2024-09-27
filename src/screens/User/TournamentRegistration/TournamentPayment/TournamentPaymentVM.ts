import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../../../NetworkEngine";
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

    export async function getPaymentDoc(
        cb: AsyncResponseCallback<{ link: string }, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.userService.getAppData(
            "payment_policy"
        );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({ link: resp.result?.dataInfo || "" });
    }

    export async function finalizeTournamentPosition(
        paymentIntent: string,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp =
            await NetworkModule.tournamentService.finalizeTournamentRegistration(
                paymentIntent
            );
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }
}
