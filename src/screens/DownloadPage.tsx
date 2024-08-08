import phoneScreen from "../../public/mockupApp.png";
import backgroundImage from "../../public/backgroundArt.jpg";
import darkLogo from "../../public/App_logo_dark.png";
import appstoreDownload from "../assets/App Store download.png";
import playstoreDownload from "../assets/Google Play download.png";

function DownloadPage() {
    return (
        <div
            className="relative w-full min-h-[100vh] bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="flex items-center justify-center px-4 py-6 md:ml-4">
                <div className="bg-white p-8 rounded-xl max-w-[800px] w-full pb-[200px] shadow-[inset_0px_1px_15px_1px_#22543d] md:pb-0">
                    <div className="flex space-x-4 items-center mb-4">
                        <div className="relative w-16 h-16 drop-shadow-md">
                            <img
                                src={darkLogo}
                                className="w-full h-full rounded-2xl object-cover"
                            />
                        </div>

                        <p className="font-roboto font-bold text-lg text-balance text-primary-500 drop-shadow-sm md:text-xl">
                            Please continue the next steps on our app
                        </p>
                    </div>

                    <div className="md:flex">
                        <div className="flex flex-col">
                            <div className="flex flex-col items-start space-y-2">
                                <p className="font-semibold">
                                    <span className="font-bold text-secondary-500">
                                        Download
                                    </span>{" "}
                                    the app
                                </p>
                                <div className="flex space-x-1">
                                    <a
                                        href="https://apps.apple.com/us/app/nesterin-pickleball-league/id6590604559"
                                        target="_blank"
                                    >
                                        <img
                                            src={appstoreDownload}
                                            className="w-[120px]"
                                        />
                                    </a>
                                    <a href="www.google.com" target="_blank">
                                        <img
                                            src={playstoreDownload}
                                            className="w-[120px]"
                                        />
                                    </a>
                                </div>
                            </div>

                            <ol className="list-decimal list-inside space-y-2 mt-5 mb-4">
                                <li>
                                    Create an account (Login if you already have
                                    an account)
                                </li>
                                <li>
                                    You will have to choose an avatar or mascot
                                    that fits your play style
                                </li>
                                <li>
                                    Once in home screen, Click on{" "}
                                    <span className="font-semibold text-secondary-500">
                                        Tap View Arena
                                    </span>
                                </li>
                                <li>
                                    View the{" "}
                                    <span className="font-semibold text-secondary-500">
                                        Open Tournaments section
                                    </span>
                                </li>
                                <li>
                                    Click{" "}
                                    <span className="font-semibold text-secondary-500">
                                        View Detail
                                    </span>{" "}
                                    button
                                </li>
                                <li>
                                    Go through the tournament details and rules.
                                    Finally Register for the tournament
                                </li>
                            </ol>
                        </div>

                        <div className="flex justify-center relative">
                            <img
                                src={phoneScreen}
                                className="mt-4 w-full h-auto object-contain absolute mb-6 md:relative"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadPage;
