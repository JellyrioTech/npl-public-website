import NPLButton from "../../components/NPLButton";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import NSPLInputField from "../../components/NSPLInputField";
import { routes, UserRoutes } from "../../util/routes";
import { RegisterPageVM } from "./RegisterPageVM";
import { SSORoutesVM } from "../../commonVM/ssoRoutesVM";
import { useLoader } from "../../components/LoaderProvider";
import logo from "../../../public/App_logo_white.png";
import arrowLeft from "../../../public/arrowLeft.png";
import NPLButtonSquare from "../../components/NPLButtonSquare";

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

        SSORoutesVM.registerUser(
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
                    window.location.pathname = `${UserRoutes.TournamentRules}/1`;
                },
            }
        );
    };

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
                document.cookie = "auth_check=true";
                document.cookie = `jwt_token=${obj.token}`;
                window.location.pathname = `${UserRoutes.TournamentRules}/1`;
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
            <div className="flex flex-col gap-9">
                <NSPLInputField
                    type={"email"}
                    name={"Email Address"}
                    value={email}
                    placeholder="name@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired={true}
                ></NSPLInputField>
                <NPLButtonSquare
                    text={"Continue"}
                    type="submit"
                    onClick={checkEmailExists}
                ></NPLButtonSquare>
            </div>
        );
    };

    const SignInForm = () => {
        return (
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
                        isDisabled={true}
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
        );
    };

    const RegisterForm = () => {
        return (
            <form
                onSubmit={handleRegistrationSubmit}
                className="space-y-4 lg:space-y-5"
                method="POST"
            >
                <div className="space-y-4">
                    <NSPLInputField
                        type={"email"}
                        name={"Enter Your Email"}
                        value={email}
                        placeholder="eg: henry@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        isDisabled={true}
                    ></NSPLInputField>
                    <NSPLInputField
                        type={"text"}
                        name={"name"}
                        value={name}
                        placeholder="Henry Jones"
                        onChange={(e) => setName(e.target.value)}
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

                <NPLButton text="Create Account" type="submit"></NPLButton>
            </form>
        );
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto py-20">
            <button
                className="flex gap-2 items-center mb-8 hover:scale-105"
                onClick={() => navigate(routes.CurrentTournamentRegistration)}
            >
                <img src={arrowLeft} className="w-4 h-4" />
                <p className="text-regBody font-bold">Go Back</p>
            </button>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-6 mb-14">
                    <img src={logo} className="w-[80px] h-[80px]" />
                    <h1 className="text-lgTitle font-medium">
                        Let's Get Started
                    </h1>
                </div>
                <div className="w-[90%] mx-auto lg:w-[380px] flex flex-col">
                    {error && (
                        <p className="text-red-600 mb-5 text-sm">{error}</p>
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
