import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { routes } from "../util/routes";
import { NetworkModule } from "../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { AuthToken, setAuthToken } from "../util/Token";
import { SSORoutes } from "../apiRoutes/ssoRoutes";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const handleSignIn = () => {
        SSORoutes.signinUser(email, password, {
            loaderCallback: () => {},
            errorCallBack: (code, error) => {
                setError(error);
            },
            success: () => {
                // TODO: - Navigiation
                console.log("success signing");
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center pt-10 px-8 mx-auto rounded-lg">
            <p className="text-xl md:text-2xl font-bold text-secondary-300 py-6">
                Welcome!
            </p>
            <div className="w-lg max-w-[500px] bg-neutral-100 py-8 px-10 rounded-lg">
                {error && <p className="text-red-600 mb-8 text-sm">{error}</p>}
                <form
                    onSubmit={handleSignIn}
                    className="space-y-4 md:space-y-5"
                >
                    <div className="space-y-4">
                        <InputField
                            type={"email"}
                            name={"Enter Your Email"}
                            value={email}
                            placeholder="eg: henry@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            isRequired={true}
                        ></InputField>
                        <InputField
                            type={"password"}
                            name={"password"}
                            value={password}
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                            isRequired={true}
                        ></InputField>
                    </div>

                    <Button text="Sign In" type="submit"></Button>
                </form>
            </div>
            <p className="mt-6 text-neutral-100">
                Don't have an account?{" "}
                <span
                    className="font-bold text-secondary-500 cursor-pointer hover:underline mt-8"
                    onClick={() => navigate(routes.Register)}
                >
                    Sign Up Here
                </span>
            </p>
        </div>
    );
}

export default LoginPage;
