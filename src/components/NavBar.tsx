import { useState } from "react";
import logo from "../assets/logo.png";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function onToggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <nav className="w-full bg-neutral-100">
                <div className="max-w-[1200px] flex flex-wrap justify-between items-center p-4">
                    <div className="flex items-center">
                        <img src={logo} width={80} height={80} />
                        <span className="text-base font-bold">
                            Nesterin Pickleball League
                        </span>
                    </div>

                    <button
                        className="p-2 focus:bg-secondary-300 rounded-lg md:hidden"
                        onClick={onToggleMenu}
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>

                    <div
                        className={`w-full 
                        ${menuOpen ? "block" : "hidden"} 
                        md:block md:w-auto`}
                    >
                        <ul className="flex flex-col justify-center items-center bg-primary-900 text-neutral-100 rounded-lg md:bg-neutral-100 md:text-neutral-900 md:flex-row md:gap-6">
                            <li className="py-3 px-2 hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg md:hover:bg-tertiary-100">
                                Home
                            </li>
                            <li className="py-3 px-2 hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg md:hover:bg-tertiary-100">
                                About
                            </li>
                            <li className="py-3 px-2 hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg md:hover:bg-tertiary-100">
                                Contact Us
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
