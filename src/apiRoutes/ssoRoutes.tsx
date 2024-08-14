import { AsyncResponseCallback } from "npl-service-module";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { NetworkModule } from "../NetworkEngine";
import { UserServiceResponse } from "npl-service-module/dist/services/Response/UserService.response";

export namespace SSORoutes {
    export async function verifyEmailUnique(
        email: string,
        cb: AsyncResponseCallback<{}, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.ssoService.checkEmail(email);
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            if (resp.code === 3) {
                return cb.success({});
            }
        }

        return cb.errorCallBack(1, "Email already exists");
    }

    export async function registerUser(
        email: string,
        password: string,
        name: string,
        cb: AsyncResponseCallback<UserServiceResponse.RegisterResponseBody, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.ssoService.registerUser(
            email,
            password,
            name
        );
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }

        return cb.success({
            token: resp.token,
            ssoId: resp.ssoId,
        });
    }

    export async function signinUser(
        email: string,
        password: string,
        cb: AsyncResponseCallback<UserServiceResponse.SigninResponseBody, {}>
    ) {
        cb.loaderCallback(true);
        const resp = await NetworkModule.ssoService.signinUser(email, password);
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }

        return cb.success({
            token: resp.token,
            name: resp.name,
            ssoId: resp.ssoId,
        });
    }

    export async function optForMarketingEmail() {
        const resp = await NetworkModule.userService.setPermission({
            marketing_promotion_email: true,
        });
    }
}
