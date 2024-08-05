import Button from "../components/Button";
import React, { useState } from "react";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistrationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("Registration submit");

        if (!name || !email || !password) {
            alert("All fields are required.");
            resetFields();
            return;
        }
    };

    function resetFields() {
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="w-full flex flex-col justify-center items-center my-10">
            <div className="w-[80%] max-w-[800px] flex flex-col md:flex-row rounded-lg">
                <div className="w-full md:w-3/4 flex flex-col justify-center gap-4 bg-greenGradient p-10">
                    <p className="text-2xl font-oswald text-neutral-100 font-bold">
                        Register Now
                    </p>
                    <p className="text-neutral-300 w-3/4">
                        Register now to join tournaments, track your games, and
                        more
                    </p>
                </div>
                <div className="bg-neutral-100 p-10 space-y-10">
                    <form onSubmit={handleRegistrationSubmit}>
                        <div className="rounded-xl flex flex-col items-center gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-gray-600 font-semibold">
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
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-600 font-semibold">
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
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-600 font-semibold">
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
                                </div>
                            </div>
                            <Button
                                text={"Register Now"}
                                type="submit"
                            ></Button>
                        </div>
                    </form>

                    <p className="mt-5">
                        Already have an account?{" "}
                        <span className="font-bold text-secondary-500 cursor-pointer hover:underline mt-8">
                            Login Here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
