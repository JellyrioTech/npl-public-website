import { useEffect, useState } from "react";
import logo from "../../public/App_logo_white.png";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../util/routes";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { NavbarVM } from "./Navbar/NavbarVM";
import { toast } from "react-toastify";
import { CommonUtil } from "../util/CommonUtil";

function NavBar() {
    const navigator = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileDisplay, setIsMobileDisplay] = useState(false);
    const [tournamentListOpen, setTournamentListOpen] = useState(false);
    const [openTournaments, setOpenTournaments] =
        useState<Partial<TournamentServiceResponse.SearchTournamentRspObj>[]>();

    const location = useLocation();
    const isLandingPage = location.pathname === routes.Home;

    useEffect(() => {
        NavbarVM.getOpenTournaments({
            loaderCallback: () => {},
            errorCallBack: (_, error) => {
                toast.error(error);
            },
            success: (result) => {
                setOpenTournaments(result);
            },
        });

        const handleResize = () => {
            setIsMobileDisplay(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const tournamentListDropdown = (
        <>
            <button
                className={`inline-flex items-center ${
                    !isMobileDisplay &&
                    "inline-flex items-center text-lgbody font-regular text-neutral-100  hover:underline"
                } ${!isLandingPage && "text-tertiary-500"}`}
                onClick={() => toggleTournamentListDropdown()}
            >
                Tournaments
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {tournamentListOpen && (
                <div
                    className={`${
                        isMobileDisplay
                            ? "underline"
                            : "z-10 flex flex-col absolute mt-8 text-neutral-900 rounded-md bg-neutral-100 shadow-lg py-1 gap-2 text-center"
                    }`}
                >
                    {openTournaments?.map((item) => (
                        <a
                            className={`${
                                isMobileDisplay
                                    ? ""
                                    : "px-4 py-2 text-lgbody font-regular hover:bg-slate-300"
                            }`}
                            onClick={() =>
                                (window.location.pathname = `${routes.CurrentTournamentRegistration}/${item.id}`)
                            }
                        >
                            {CommonUtil.DateHelper.formatDateToMonthDayYear(
                                item.startDate || ""
                            )}
                        </a>
                    ))}
                </div>
            )}
        </>
    );

    const mobileMenuUI = (
        <div className="absolute top-0 left-0 z-50 w-full h-screen bg-white p-5">
            <div
                className="flex justify-end"
                onClick={() => {
                    setMenuOpen(false);
                }}
            >
                <svg
                    className="w-12 h-12 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M19 5L4.99998 19M5.00001 5L19 19"
                            stroke="#335145"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 text-lg pt-10 cursor-pointer">
                <a
                    className="hover:underline"
                    onClick={() => {
                        onToggleMenu();
                        navigator(routes.Home);
                    }}
                >
                    Home
                </a>
                {tournamentListDropdown}
                <a
                    className="hover:underline"
                    onClick={() => {
                        onToggleMenu();
                        navigator(routes.About);
                    }}
                >
                    About Us
                </a>
                <a
                    className="hover:underline"
                    onClick={() => {
                        onToggleMenu();
                        navigator(routes.Contact);
                    }}
                >
                    Contact Us
                </a>
            </div>
        </div>
    );

    const navMenu = (
        <div className={`flex gap-7 cursor-pointer`}>
            <a
                className={`text-lgbody font-regular text-neutral-100  hover:underline ${
                    !isLandingPage && "text-tertiary-500"
                }`}
                onClick={() => navigator(routes.Home)}
            >
                Home
            </a>
            {tournamentListDropdown}
            <a
                className={`text-lgbody font-regular text-neutral-100  hover:underline ${
                    !isLandingPage && "text-tertiary-500"
                }`}
                onClick={() => navigator(routes.About)}
            >
                About Us
            </a>
            <a
                className={`text-lgbody font-regular text-neutral-100  hover:underline ${
                    !isLandingPage && "text-tertiary-500"
                }`}
                onClick={() => navigator(routes.Contact)}
            >
                Contact Us
            </a>
        </div>
    );

    function onToggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function toggleTournamentListDropdown() {
        setTournamentListOpen(!tournamentListOpen);
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
            className={`absolute w-full flex justify-center top-0 z-30 px-2 h-30 ${
                !isLandingPage && "bg-neutral-100"
            }`}
        >
            {menuOpen && mobileMenuUI}
            <div className="w-[80%] py-3 max-w-[1200px] flex-1 flex flex-wrap justify-between items-center">
                <div className="flex items-center pl-5 lg:pl-0">
                    <img
                        src={logo}
                        width={80}
                        height={80}
                        className="cursor-pointer"
                        onClick={() => onClickNavigation("home")}
                    />
                </div>

                <button
                    className="p-2 bg-secondary-300 focus:border-2 focus:border-secondary-700 rounded-lg lg:hidden"
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

                {!isMobileDisplay && navMenu}
            </div>
        </nav>
    );
}

export default NavBar;
