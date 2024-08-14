import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";

export namespace RegisterPageVM {
    export async function verifyEmail(
        email: string,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp = NetworkModule.ssoService.checkEmail(email);
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            console.log(resp);
            return cb.errorCallBack(1, "Email doesn't exist");
        }
        cb.success("Email already exists");
    }
}
