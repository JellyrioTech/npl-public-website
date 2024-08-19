import Button from "../../components/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { routes, UserRoutes } from "../../util/routes";
import { RegisterPageVM } from "./RegisterPageVM";
import { SSORoutes } from "../../apiRoutes/ssoRoutes";
import { useLoader } from "../../components/LoaderProvider";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [screen, setScreen] = useState<RegisterPageVM.Screens>("EmailCheck");
    const [isUserRecieveEmailUpdates, setIsUserRecieveEmailUpdates] =
        useState(true);
    const [error, setError] = useState<string | null>();

    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    const handleRegistrationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        SSORoutes.registerUser(
            email,
            password,
            name,
            isUserRecieveEmailUpdates,
            {
                loaderCallback: (loader) => {
                    loader ? showLoader() : hideLoader();
                },
                errorCallBack: (code, error) => {
                    if (code === 2) {
                        navigate(routes.Error);
                    } else {
                        setError(error);
                    }
                },
                success: () => {
                    window.location.pathname = UserRoutes.TournamentRules;
                },
            }
        );
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        SSORoutes.signinUser(email, password, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: () => {
                window.location.pathname = `${UserRoutes.TournamentRules}/6`;
            },
        });
    };

    const handleRecieveEmailUpdates = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsUserRecieveEmailUpdates(e.target.checked);
    };

    const checkEmailExists = () => {
        setError("");
        RegisterPageVM.verifyEmailUnique(email, {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: (_, error) => {
                setError(error);
            },
            success: (obj) => {
                setScreen(obj.screens);
            },
        });
    };

    const getFormTitle = () => {
        switch (screen) {
            case "EmailCheck":
                return "Alright, Let's Get Started!";
            case "Register":
                return "Let's Quickly Create An Account!";
            case "SignIn":
                return "Welcome Back!";
        }
    };

    const EmailCheckForm = () => {
        return (
            <div className="space-y-4 md:space-y-5">
                <div className="space-y-4">
                    <InputField
                        type={"email"}
                        name={"Enter Your Email"}
                        value={email}
                        placeholder="eg: henry@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        isRequired={true}
                    ></InputField>
                </div>

                <Button
                    text="Next"
                    type="submit"
                    onClick={checkEmailExists}
                ></Button>
            </div>
        );
    };

    const SignInForm = () => {
        return (
            <form
                onSubmit={handleSignIn}
                method="POST"
                className="space-y-4 md:space-y-5"
            >
                <div className="space-y-4">
                    <InputField
                        type={"email"}
                        name={"Enter Your Email"}
                        value={email}
                        placeholder="eg: henry@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        isDisabled={true}
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
        );
    };

    const RegisterForm = () => {
        return (
            <form
                onSubmit={handleRegistrationSubmit}
                className="space-y-4 md:space-y-5"
                method="POST"
            >
                <div className="space-y-4">
                    <InputField
                        type={"email"}
                        name={"Enter Your Email"}
                        value={email}
                        placeholder="eg: henry@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        isDisabled={true}
                    ></InputField>
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

                    <div className="pr-10 flex items-center pt-1 space-x-4">
                        <input
                            type="checkbox"
                            onChange={handleRecieveEmailUpdates}
                            checked={isUserRecieveEmailUpdates}
                            className="w-4 h-4 focus:ring-2 text-secondary-300 focus:ring-secondary-300 bg-secondary-300 rounded"
                        />
                        <label className="text-sm text-neutral-600">
                            I would like to receive email updates about new
                            tournaments and promotions
                        </label>
                    </div>

                    <div className="pt-6 text-sm text-neutral-500 space-y-1">
                        <p>
                            By clicking on{" "}
                            <span className="font-bold">Create Account</span>{" "}
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

                <Button text="Create Account" type="submit"></Button>
            </form>
        );
    };

    return (
        <div className="w-full min-h-screen py-10 bg-primary-900">
            <div className="flex flex-col items-center justify-center px-8 mx-auto rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-secondary-300 py-6">
                    {getFormTitle()}
                </p>
                <div className="w-lg max-w-[500px] bg-neutral-100 py-8 px-10 rounded-lg">
                    {error && (
                        <p className="text-red-600 mb-8 text-sm">{error}</p>
                    )}
                    {(screen === "EmailCheck" && EmailCheckForm()) ||
                        (screen === "SignIn" && SignInForm()) ||
                        (screen === "Register" && RegisterForm())}
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
