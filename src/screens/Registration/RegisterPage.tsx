import Button from "../../components/Button";
import React, { useState } from "react";
import { NetworkModule } from "../../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { routes } from "../../util/routes";
import { Validation } from "../../util/validation";
import { RegisterPageVM } from "./RegisterPageVM";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailExists, setIsEmailExists] = useState<Boolean | undefined>(
        undefined
    );
    const [screen, setScreen] = useState<"SignIn" | "Register" | "EmailCheck">(
        "EmailCheck"
    );
    const [isUserRecieveEmailUpdates, setIsUserRecieveEmailUpdates] =
        useState(true);
    const [error, setError] = useState<string | null>();

    const navigate = useNavigate();

    const handleRegistrationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            resetFields();
            setError("Please fill out all the fields");
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters long");
            setPassword("");
            return;
        }

        const response = await NetworkModule.ssoService.registerUser(
            name,
            email,
            password
        );

        if (response instanceof ErrorResponse) {
            setError("Something went wrong, please try");
            return;
        }

        if (isUserRecieveEmailUpdates) {
            const permission = await NetworkModule.userService.setPermission({
                marketing_promotion_email: true,
            });
        }
    };

    const handleRecieveEmailUpdates = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsUserRecieveEmailUpdates(e.target.checked);
    };

    function resetFields() {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    }

    const checkEmailExists = () => {
        if (email === "") {
            setError("Please enter your email");
            return;
        }

        if (Validation.validateEmail(email)) {
            console.log(`[${email}] valid: ${Validation.validateEmail(email)}`);
            RegisterPageVM.verifyEmail(email, {
                loaderCallback: () => {},
                errorCallBack: (error) => {
                    setError("");
                    setIsEmailExists(false);
                },
                success: () => {
                    setError("Email already exists");
                    setIsEmailExists(true);
                },
            });
        }
    };

    const getSubmitButtonText = (): string => {
        if (isEmailExists === undefined || isEmailExists) return "Next";
        return "Register";
    };

    const returnFieldByEmailAvailability = () => {
        if (isEmailExists !== undefined && !isEmailExists) {
            return (
                <InputField
                    type={"password"}
                    name={"password"}
                    value={password}
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired={true}
                ></InputField>
            );
        }

        return (
            <>
                <InputField
                    type={"text"}
                    name={"name"}
                    value={name}
                    placeholder="Henry Jones"
                    onChange={(e) => setName(e.target.value)}
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
            </>
        );
    };

    return (
        <div className="w-full h-screen bg-primary-900">
            <div className="flex flex-col items-center justify-center pt-10 px-8 mx-auto rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-secondary-300 py-6">
                    Alright, Let's Get Started!
                </p>
                <div className="w-lg max-w-[500px] bg-neutral-100 py-8 px-10 rounded-lg">
                    {error && (
                        <p className="text-red-600 mb-8 text-sm">{error}</p>
                    )}
                    <form
                        onSubmit={handleRegistrationSubmit}
                        className="space-y-4 md:space-y-5"
                    >
                        <div className="rounded-xl flex flex-col items-center gap-1 md:gap-3">
                            <div className="space-y-4">
                                <InputField
                                    type={"email"}
                                    name={"Enter Your Email"}
                                    value={email}
                                    placeholder="eg: henry@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired={true}
                                ></InputField>

                                {isEmailExists !== undefined &&
                                    returnFieldByEmailAvailability()}

                                <div className="pr-10 flex items-center pt-1 space-x-4">
                                    <input
                                        type="checkbox"
                                        onChange={handleRecieveEmailUpdates}
                                        checked={isUserRecieveEmailUpdates}
                                        className="w-4 h-4 focus:ring-2 text-secondary-300 focus:ring-secondary-300 bg-secondary-300 rounded"
                                    />
                                    <label className="text-sm text-neutral-600">
                                        I would like to receive email updates
                                        about new tournaments and promotions
                                    </label>
                                </div>
                            </div>

                            <Button
                                text={getSubmitButtonText()}
                                type="submit"
                                onClick={() => checkEmailExists()}
                            ></Button>

                            <div className="pt-6 text-sm text-neutral-500 space-y-1">
                                <p>
                                    By clicking on{" "}
                                    <span className="font-bold">
                                        Create Account
                                    </span>{" "}
                                    you are agreeing to the following:
                                </p>
                                <ol className="list-decimal list-inside">
                                    <li>
                                        You are agreeing with our{" "}
                                        <a
                                            href={routes.TermsAndCondition}
                                            target="_blank"
                                            className="text-secondary-500 font-semibold cursor-pointer hover:underline"
                                        >
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        You are agreeing with our{" "}
                                        <a
                                            href={routes.PrivacyPolicy}
                                            target="_blank"
                                            className="text-secondary-500 font-semibold cursor-pointer hover:underline"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </form>
                </div>
                <p className="mt-6 text-neutral-100">
                    Already have an account?{" "}
                    <span
                        className="font-bold text-secondary-500 cursor-pointer hover:underline"
                        onClick={() => navigate(routes.Login)}
                    >
                        Login Here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
