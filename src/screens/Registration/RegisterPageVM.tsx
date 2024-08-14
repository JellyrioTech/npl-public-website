import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";

export namespace RegisterPageVM {
    export async function verifyEmailUnique(
        email: string,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.ssoService.checkEmail(email);
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            console.log("====email doesnt exist:", email);
            if (resp.code === 3) {
                return cb.success({});
            } else {
                return cb.errorCallBack(1, "Email already exists");
            }
        }

        console.log("===email exist:", email);
        return cb.errorCallBack(1, "Email already exists");
    }
}
