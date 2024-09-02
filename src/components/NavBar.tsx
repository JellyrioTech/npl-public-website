import { useState } from "react";
import logo from "../../public/App_logo_white.png";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../util/routes";

function NavBar() {
    const navigator = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isLandingPage = location.pathname === routes.Home;

    const hoverColorClasses = isLandingPage
        ? "hover:underline"
        : "hover:bg-tertiary-300 focus:bg-tertiary-300";

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
        <nav
            className={`absolute w-full flex justify-center top-0 z-30 px-2 ${
                !isLandingPage && "bg-neutral-100"
            }`}
        >
            <div className="max-w-[1200px] flex-1 flex flex-wrap justify-between items-center py-3">
                <div className="flex items-center">
                    <img
                        src={logo}
                        width={60}
                        height={60}
                        className="cursor-pointer"
                        onClick={() => onClickNavigation("home")}
                    />
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
                    <ul
                        className={`flex flex-col justify-center items-center rounded-lg md:flex-row md:gap-6 ${
                            isLandingPage ? "text-neutral-100" : "text-black"
                        }`}
                    >
                        <li
                            className={`w-full text-center md:w-auto py-3 px-2 cursor-pointer rounded-lg ${hoverColorClasses}`}
                            onClick={() => onClickNavigation("home")}
                        >
                            Home
                        </li>
                        <li
                            className={`w-full text-center md:w-auto py-3 px-2 cursor-pointer rounded-lg ${hoverColorClasses}`}
                            onClick={() => onClickNavigation("about")}
                        >
                            About Us
                        </li>
                        <li
                            className={`w-full text-center md:w-auto py-3 px-2 cursor-pointer rounded-lg ${hoverColorClasses}`}
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
