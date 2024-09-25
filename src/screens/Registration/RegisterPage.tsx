import React, { useState } from "react";
import { useNavigate } from "react-router";
import NSPLInputField from "../../components/NSPLInputField";
import { routes, UserRoutes } from "../../util/routes";
import { RegisterPageVM } from "./RegisterPageVM";
import { SSORoutesVM } from "../../commonVM/ssoRoutesVM";
import { useLoader } from "../../components/LoaderProvider";
import logo from "../../../public/App_logo_white.png";
import arrowLeft from "../../../public/arrowLeft.png";
import NSPLButtonSquare from "../../components/NPLButtonSquare";
import NSPLCheckboxIcon from "../../components/Icons/NSPLCheckboxIcon";
import NSPLCheckboxField from "../../components/NSPLCheckboxField";

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
                    window.location.pathname = `${UserRoutes.TournamentConfirmRegistration}/1`;
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
                // document.cookie = "auth_check=true";
                // document.cookie = `jwt_token=${obj.token}`;
                window.location.pathname = `${UserRoutes.TournamentConfirmRegistration}/1`;
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
            <div className="flex flex-col gap-7 lg:gap-9">
                <NSPLInputField
                    type={"email"}
                    name={"Email Address"}
                    value={email}
                    placeholder="name@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired={true}
                ></NSPLInputField>
                <NSPLButtonSquare
                    text={"Continue"}
                    type="submit"
                    onClick={checkEmailExists}
                ></NSPLButtonSquare>
            </div>
        );
    };

    const SignInForm = () => {
        return (
            <form onSubmit={handleSignIn} method="POST">
                <div className="flex flex-col gap-7 lg:gap-9">
                    <NSPLInputField
                        type={"email"}
                        name={"Email Address"}
                        value={email}
                        placeholder="name@email.com"
                        onChange={() => {}}
                        isDisabled={true}
                    ></NSPLInputField>
                    <NSPLInputField
                        type={"password"}
                        name={"password"}
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired={true}
                    ></NSPLInputField>
                    <NSPLButtonSquare
                        text={"Login"}
                        type="submit"
                    ></NSPLButtonSquare>
                </div>
            </form>
        );
    };

    const RegisterForm = () => {
        return (
            <form onSubmit={handleRegistrationSubmit} method="POST">
                <div className="flex flex-col gap-7 lg:gap-9">
                    <NSPLInputField
                        type={"email"}
                        name={"Email Address"}
                        value={email}
                        placeholder="name@email.com"
                        onChange={() => {}}
                        isDisabled={true}
                    ></NSPLInputField>
                    <NSPLInputField
                        type={"text"}
                        name={"name"}
                        value={name}
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                        isRequired={true}
                    ></NSPLInputField>
                    <NSPLInputField
                        type={"password"}
                        name={"password"}
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired={true}
                    ></NSPLInputField>
                </div>

                <div className="flex flex-col my-4 lg:mt-6 gap-6 lg:gap-8">
                    <NSPLCheckboxField
                        onChange={handleRecieveEmailUpdates}
                        isChecked={isUserRecieveEmailUpdates}
                    >
                        <label className="text-smBody text-neutral-700">
                            I would like to receive email updates about new
                            tournaments and promotions
                        </label>
                    </NSPLCheckboxField>

                    <div className="text-smBody text-neutral-700">
                        <p>
                            By clicking on{" "}
                            <span className="font-semibold">
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
                                    className="text-secondary-500 underline cursor-pointer hover:font-semibold"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                You are agreeing with our{" "}
                                <a
                                    href={routes.PrivacyPolicy}
                                    target="_blank"
                                    className="text-secondary-500 underline cursor-pointer hover:font-semibold"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>

                <NSPLButtonSquare
                    text={"Create Account"}
                    type="submit"
                ></NSPLButtonSquare>
            </form>
        );
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto py-10">
            <button
                className="ml-4 lg:ml-0 flex gap-2 items-center mb-8 hover:scale-105"
                onClick={() => navigate(routes.CurrentTournamentRegistration)}
            >
                <img src={arrowLeft} className="w-4 h-4" />
                <p className="text-regBody font-bold">Go Back</p>
            </button>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-6 mb-14">
                    <img
                        src={logo}
                        className="w-[80px] h-[80px] cursor-pointer hover:scale-105"
                        onClick={() => navigate(routes.Home)}
                    />
                    <h1 className="text-lgTitle font-medium">
                        {getFormTitle()}
                    </h1>
                </div>

                <div className="w-[90%] md:w-[50%] mx-auto lg:w-[400px] flex flex-col">
                    {error && (
                        <p className="text-red-600 mb-5 text-sm">{error}</p>
                    )}
                    {(screen === "EmailCheck" && EmailCheckForm()) ||
                        (screen === "SignIn" && SignInForm()) ||
                        (screen === "Register" && RegisterForm())}
                </div>

                <span className="mt-4 text-smBody text-gray-500 text-center">
                    © 2024{" "}
                    <a href="https://flowbite.com/" className="hover:underline">
                        Nesterin LLC
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </div>
    );
}

export default RegisterPage;
