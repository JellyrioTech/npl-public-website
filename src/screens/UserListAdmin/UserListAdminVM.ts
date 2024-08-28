import { AsyncResponseCallback } from "npl-service-module";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { UserServiceResponse } from "npl-service-module/dist/services/Response/UserService.response";

export namespace UserListAdminVM {
    export async function getAllUsers(
        params: { limit: number; offSet: number },
        cb: AsyncResponseCallback<UserServiceResponse.GetUserInfo[], {}>
    ) {
        console.log(params.offSet);

        cb.loaderCallback(true);
        const resp = await NetworkModule.userService.getAllUser({
            limit: params.limit,
            start: params.offSet,
        });
        cb.loaderCallback(false);
        if (resp instanceof ErrorResponse) {
            return cb.errorCallBack(1, resp.errorMessage);
        }
        cb.success(resp.result?.users || []);
    }
}
