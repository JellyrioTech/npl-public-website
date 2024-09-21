import { AsyncResponseCallback } from "npl-service-module";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { NetworkModule } from "../NetworkEngine";
import { UserServiceResponse } from "npl-service-module/dist/services/Response/UserService.response";

export namespace SSORoutesVM {
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
        emailOption: boolean,
        cb: AsyncResponseCallback<UserServiceResponse.RegisterResponseBody, {}>
    ) {
        if (!name || !email || !password) {
            cb.errorCallBack(1, "Please fill out all the fields");
            return;
        }
        if (password.length < 4) {
            cb.errorCallBack(1, "Password must be at least 4 characters long");
            return;
        }
        cb.loaderCallback(true);
        const resp = await NetworkModule.ssoService.registerUser(
            name,
            email,
            password
        );
        cb.loaderCallback(false);

        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        document.cookie = "auth_check=true";
        document.cookie = `jwt_token=${resp.token}`;
        cb.loaderCallback(true);
        const gameServiceResp =
            await NetworkModule.userService.registerUserToGameService(
                resp.token
            );
        cb.loaderCallback(false);

        if (gameServiceResp instanceof ErrorResponse) {
            return cb.errorCallBack(
                2,
                "Your account has been created but there is something wrong in our internal server. Please reach out to us for assistance."
            );
        }

        const emailOpt = await NetworkModule.userService.setPermission({
            marketing_promotion_email: emailOption,
        });
        if (emailOpt instanceof ErrorResponse) {
            console.log(emailOpt.errorMessage);
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
}
