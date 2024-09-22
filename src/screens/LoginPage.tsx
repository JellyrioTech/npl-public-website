import { useState } from "react";
import NPLButton from "../components/NPLButton";
import NSPLInputField from "../components/NSPLInputField";
import { useNavigate } from "react-router-dom";
import { AdminRoutes, routes } from "../util/routes";
import { SSORoutesVM } from "../commonVM/ssoRoutesVM";
import { useLoader } from "../components/LoaderProvider";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        SSORoutesVM.signinUser(email, password, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                console.log("success login");
                document.cookie = "auth_check=true";
                document.cookie = `jwt_token=${obj.token}`;
                window.location.pathname = `${AdminRoutes.dashboard}`;
            },
        });
    };

    return (
        <div className="w-full min-h-screen py-10 bg-primary-900">
            <div className="flex flex-col items-center justify-center px-8 mx-auto rounded-lg">
                <p className="text-xl lg:text-2xl font-bold text-secondary-300 py-6">
                    Welcome!
                </p>
                <div className="w-lg max-w-[500px] bg-neutral-100 py-8 px-10 rounded-lg">
                    {error && (
                        <p className="text-red-600 mb-8 text-sm">{error}</p>
                    )}
                    <form
                        onSubmit={handleSignIn}
                        method="POST"
                        className="space-y-4 lg:space-y-5"
                    >
                        <div className="space-y-4">
                            <NSPLInputField
                                type={"email"}
                                name={"Enter Your Email"}
                                value={email}
                                placeholder="eg: henry@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired={true}
                            ></NSPLInputField>
                            <NSPLInputField
                                type={"password"}
                                name={"password"}
                                value={password}
                                placeholder="******"
                                onChange={(e) => setPassword(e.target.value)}
                                isRequired={true}
                            ></NSPLInputField>
                        </div>

                        <NPLButton text="Sign In" type="submit"></NPLButton>
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
        </div>
    );
}

export default LoginPage;
