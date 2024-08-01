import { useNavigate } from "react-router-dom";
import logo from "../../public/App_logo_white.png";
import routes from "../util/routes";

function Footer() {
    const navigator = useNavigate();
    return (
        <footer className="bg-tertiary-700">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
                <div className="items-center justify-center md:flex md:justify-between">
                    <div className="flex items-center justify-start">
                        <img src={logo} width={80} height={80} />
                        <span className="text-base font-bold text-neutral-100">
                            Nesterin Pickleball League
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 md:gap-6 md:grid-cols-3 mt-6">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-neutral-100 uppercase">
                                Follow us
                            </h2>
                            <ul className="text-neutral-300 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://facebook.com/"
                                        className="hover:underline "
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://instagram.com/"
                                        className="hover:underline"
                                    >
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-neutral-100 uppercase">
                                Legal
                            </h2>
                            <ul className="text-neutral-300 font-medium">
                                <li className="mb-4">
                                    <p
                                        className="hover:underline cursor-pointer"
                                        onClick={() =>
                                            navigator(routes.PrivacyPolicy)
                                        }
                                    >
                                        Privacy Policy
                                    </p>
                                </li>
                                <li>
                                    <p
                                        className="hover:underline cursor-pointer"
                                        onClick={() =>
                                            navigator(routes.TermsAndCondition)
                                        }
                                    >
                                        Terms &amp; Conditions
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-neutral-500 mx-auto md:my-8" />
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 text-center">
                        © 2024{" "}
                        <a
                            href="https://flowbite.com/"
                            className="hover:underline"
                        >
                            Nesterin LLC
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 justify-center mt-0">
                        <a
                            href="#"
                            className="text-neutral-500 hover:text-neutral-100"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 8 19"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a
                            href="#"
                            className="text-neutral-500 hover:text-neutral-100 ms-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 50 50"
                            >
                                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                            </svg>
                            <span className="sr-only">Instagram Page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
