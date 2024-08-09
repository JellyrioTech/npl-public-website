import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { routes } from "../util/routes";
import { NetworkModule } from "../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            resetFields();
            setError("Please fill out all the fields");
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters long");
            setPassword("");
            return;
        }

        const response = await NetworkModule.ssoService.signinUser(
            email,
            password
        );

        if (response instanceof ErrorResponse) {
            setError("Something went wrong, please try");
            return;
        }
    };

    function resetFields() {
        setEmail("");
        setPassword("");
    }

    return (
        <div className="w-full h-screen bg-primary-900">
            <div className="flex flex-col items-center justify-center pt-10 px-8 mx-auto rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-secondary-300 py-6">
                    Welcome Back!
                </p>
                <div className="w-lg max-w-[500px] bg-neutral-100 py-8 px-10 rounded-lg">
                    {error && (
                        <p className="text-red-600 mb-8 text-sm">{error}</p>
                    )}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="rounded-xl flex flex-col items-center gap-6">
                            <div className="space-y-4">
                                <InputField
                                    type={"email"}
                                    name={"email"}
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    isRequired={true}
                                ></InputField>
                            </div>
                            <Button text={"Login"} type="submit"></Button>
                        </div>
                    </form>

                    <p className="text-center mt-8">
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
        </div>
    );
}

export default LoginPage;
