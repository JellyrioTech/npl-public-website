import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { Validation } from "../../util/validation";

export namespace RegisterPageVM {
    export type Screens = "SignIn" | "Register" | "EmailCheck";

    export async function verifyEmailUnique(
        email: string,
        cb: AsyncResponseCallback<{ screens: Screens }, {}>
    ) {
        if (email === "") {
            cb.errorCallBack(1, "Enter your email first");
            return;
        }
        if (!Validation.validateEmail(email)) {
            return cb.errorCallBack(1, "Email is not valid");
        }
        cb.loaderCallback(true);
        const resp = await NetworkModule.ssoService.checkEmail(email);
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            if (resp.code === 3) {
                return cb.success({ screens: "Register" });
            }
            return cb.errorCallBack(1, "Email already exists");
        }
        return cb.success({ screens: "SignIn" });
    }

    export async function optForMarketingEmail() {
        const resp = await NetworkModule.userService.setPermission({
            marketing_promotion_email: true,
        });
    }
}
