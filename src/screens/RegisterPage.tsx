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
        <div className="h-screen bg-gradient-to-br bg-primary-900 flex flex-col justify-center items-center w-full">
            <form onSubmit={handleRegistrationSubmit}>
                <div className="bg-neutral-100 px-10 py-8 rounded-xl w-screen shadow-md max-w-sm mx-auto flex flex-col items-center gap-6">
                    <div className="space-y-4">
                        <h1 className="text-center text-xl font-semibold text-secondary-500 font-oswald mb-5">
                            Register For Tournament
                        </h1>
                        <div>
                            <label className="block mb-1 text-gray-600 font-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-b-2 border-primary-500 px-4 py-2 outline-none rounded-md w-full"
                                required
                            />
                        </div>
                    </div>
                    <Button text={"Register Now"} type="submit"></Button>
                </div>
            </form>

            <p className="mt-5 text-neutral-100">
                Already have an account?{" "}
                <span className="font-bold text-secondary-500 cursor-pointer hover:underline mt-8">
                    Login Here
                </span>
            </p>
        </div>
    );
}

export default RegisterPage;
