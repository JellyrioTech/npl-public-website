import NetworkModuleEngine from "npl-service-module/dist/ModuleEngine";
import Button from "../components/Button";
import React, { useState } from "react";
import { NetworkModule } from "../NetworkEngine";
import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { useNavigate } from "react-router";
import InputField from "../components/InputField";
import routes from "../util/routes";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    };

    function resetFields() {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[80%] max-w-[800px] flex flex-col md:flex-row rounded-lg my-10">
                <div className="w-full md:w-3/4 flex flex-col justify-center gap-4 bg-greenGradient p-10">
                    <p className="text-2xl font-oswald text-neutral-100 font-bold">
                        Register Now
                    </p>
                    <p className="text-neutral-300 w-3/4">
                        Register now to join tournaments, track your games, and
                        more
                    </p>
                </div>
                <div className="bg-neutral-100 p-10">
                    {error && (
                        <p className="text-red-600 mb-8 text-sm">{error}</p>
                    )}
                    <form onSubmit={handleRegistrationSubmit}>
                        <div className="rounded-xl flex flex-col items-center gap-6">
                            <div className="space-y-4">
                                <InputField
                                    type={"text"}
                                    name={"name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isRequired={true}
                                ></InputField>
                                <InputField
                                    type={"email"}
                                    name={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired={true}
                                ></InputField>
                                <InputField
                                    type={"password"}
                                    name={"password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    isRequired={true}
                                ></InputField>
                                {/* <div>
                                    <label className="mb-1 text-gray-600 font-semibold">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="border-b-2 border-primary-500 px-4 py-2 outline-none rounded-md w-full"
                                        required
                                    />
                                </div> */}
                                {/* <div>
                                    <label className="mb-1 text-gray-600 font-semibold">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="border-b-2 border-primary-500 px-4 py-2 outline-none rounded-md w-full"
                                        required
                                    />
                                </div> */}
                                {/* <div>
                                    <label className="mb-1 text-gray-600 font-semibold">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="border-b-2 border-primary-500 px-4 py-2 outline-none rounded-md w-full"
                                        required
                                    />
                                </div> */}
                            </div>
                            <Button
                                text={"Register Now"}
                                type="submit"
                            ></Button>
                        </div>
                    </form>

                    <p className="mt-8">
                        Already have an account?{" "}
                        <span
                            className="font-bold text-secondary-500 cursor-pointer hover:underline mt-8"
                            onClick={() => navigate(routes.Login)}
                        >
                            Login Here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
