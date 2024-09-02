import { useState } from "react";
import logo from "../../public/App_logo_white.png";
import { useNavigate } from "react-router-dom";
import { routes } from "../util/routes";

function NavBar() {
    const navigator = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    function onToggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function onClickNavigation(route: String) {
        switch (route) {
            case "home": {
                navigator(routes.Home);
                break;
            }
            case "about": {
                navigator(routes.About);
                break;
            }
            case "contact": {
                navigator(routes.Contact);
                break;
            }
        }
        setMenuOpen(false);
    }

    return (
        <nav className="absolute w-full flex justify-center top-0 z-50">
            <div className="max-w-[1200px] flex-1 flex flex-wrap justify-between items-center p-2">
                <div className="flex items-center">
                    <img
                        src={logo}
                        width={60}
                        height={60}
                        className="cursor-pointer"
                        onClick={() => onClickNavigation("home")}
                    />
                    <span className="text-base font-bold ml-2">
                        Nesterin Pickleball League
                    </span>
                </div>

                <button
                    className="p-2 bg-secondary-300 focus:border-2 focus:border-secondary-700 rounded-lg md:hidden"
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
                    <ul className="flex flex-col justify-center items-center text-neutral-100 rounded-lg md:text-neutral-900 md:flex-row md:gap-6">
                        <li
                            className="w-full text-center md:w-auto py-3 px-2 cursor-pointer hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg md:hover:bg-tertiary-100"
                            onClick={() => onClickNavigation("home")}
                        >
                            Home
                        </li>
                        <li
                            className="w-full text-center md:w-auto  py-3 px-2 cursor-pointer hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg md:hover:bg-tertiary-100"
                            onClick={() => onClickNavigation("about")}
                        >
                            About Us
                        </li>
                        <li
                            className="w-full text-center md:w-auto  py-3 px-2 cursor-pointer hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg md:hover:bg-tertiary-100"
                            onClick={() => onClickNavigation("contact")}
                        >
                            Contact Us
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
