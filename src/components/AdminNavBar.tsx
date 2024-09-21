import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/App_logo_white.png";
import { AdminRoutes, routes } from "../util/routes";

const AdminNavBar: React.FC = () => {
    const navigator = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    function onToggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <nav className="w-full flex justify-center sticky top-0 z-50 bg-neutral-100">
                <div className="max-w-[1200px] flex-1 flex flex-wrap justify-between items-center p-2">
                    <div className="flex items-center">
                        <img
                            src={logo}
                            width={80}
                            height={80}
                            className="cursor-pointer"
                        />
                        <span className="text-base font-bold">
                            Nesterin Pickleball League
                        </span>
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

                    <div
                        className={`w-full 
            ${menuOpen ? "block" : "hidden"} 
            lg:block lg:w-auto`}
                    >
                        <ul className="flex flex-col justify-center items-center bg-primary-900 text-neutral-100 rounded-lg lg:bg-neutral-100 lg:text-neutral-900 lg:flex-row lg:gap-6">
                            <li
                                className="w-full text-center lg:w-auto py-3 px-2 cursor-pointer hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg lg:hover:bg-tertiary-100"
                                onClick={() => navigator(routes.Admin)}
                            >
                                Arena
                            </li>
                            <li
                                className="w-full text-center lg:w-auto  py-3 px-2 cursor-pointer hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg lg:hover:bg-tertiary-100"
                                onClick={() => navigator(AdminRoutes.userList)}
                            >
                                Users
                            </li>
                            <li
                                className="w-full text-center lg:w-auto  py-3 px-2 cursor-pointer hover:bg-tertiary-300 focus:bg-tertiary-300 rounded-lg lg:hover:bg-tertiary-100"
                                onClick={() => navigator(routes.Admin)}
                            >
                                App Datas
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminNavBar;
