import logo from "../../public/App_logo_white.png";
import { routes } from "../util/routes";

function Footer() {
    return (
        <footer className="block bg-tertiary-700">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
                <div className="items-center justify-center md:flex md:justify-between">
                    <div className="flex items-center justify-start">
                        <img src={logo} width={100} height={100} />
                        <span className="text-base font-bold text-neutral-100 ml-3">
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
                                        href="https://www.facebook.com/profile.php?id=61564428110467"
                                        className="hover:underline "
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://www.youtube.com/@NesterinPickleballLeague"
                                        className="hover:underline "
                                    >
                                        Youtube
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-neutral-100 uppercase">
                                Information
                            </h2>
                            <ul className="text-neutral-300 font-medium">
                                <li className="mb-4">
                                    <a
                                        className="hover:underline cursor-pointer"
                                        href={routes.Download}
                                    >
                                        Download Our App
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        className="hover:underline cursor-pointer"
                                        href={routes.PrivacyPolicy}
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="hover:underline cursor-pointer"
                                        href={routes.TermsAndCondition}
                                    >
                                        Terms &amp; Conditions
                                    </a>
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
                </div>
            </div>
        </footer>
    );
}

export default Footer;
