import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";

export namespace AdminRouteGuardVM {
    export async function isUserAdmin(cb: AsyncResponseCallback<{}, {}>) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.userService.isUserAdmin();
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success({});
    }
}
