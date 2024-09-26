import BaseContent from "../../../components/BaseContent";
import appstoreDownload from "../../../assets/App Store download.png";
import amazonAppStore from "../../../assets/amazon_appstore.png";
import NPLButton from "../../../components/NPLButton";
import { useParams } from "react-router-dom";
import { UserRoutes } from "../../../util/routes";
import checkmark from "../../../../public/checkmarkpng.png";

const TournamentPaymentSuccessPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    // return (
    //     <BaseContent innerStyle="flex flex-col">
    //         <h1 className="font-bold font-roboto text-neutral-50 text-center lg:text-4xl text-2xl pt-8">
    //             Thank you for registering for the Tournament
    //         </h1>
    //         <h2 className="font-oswald text-primary-100 text-center lg:text-2xl text-xl pt-3">
    //             Your payment has been process and your booking is finalized
    //         </h2>
    //         <div className="bg-neutral-100 p-8 rounded-xl mt-10 flex flex-col">
    //             <h2 className="text-tertiary-500 font-bold font-roboto lg:text-2xl text-xl">
    //                 What's Next?
    //             </h2>
    //             <ul className="list-outside list-disc mt-3">
    //                 <li className="list-item pt-2">
    //                     Download our in-house app{" "}
    //                     <span className="mt-3">
    //                         <br />
    //                         <b>For iOS:</b>
    //                         <a
    //                             href="https://apps.apple.com/us/app/nesterin-pickleball-league/id6590604559"
    //                             target="_blank"
    //                         >
    //                             <img
    //                                 src={appstoreDownload}
    //                                 className="w-[120px] mb-3"
    //                             />
    //                         </a>
    //                         <b>For Android:</b>
    //                         <a
    //                             href="https://www.amazon.com/gp/product/B0DCKB7ZM6"
    //                             target="_blank"
    //                         >
    //                             <img
    //                                 src={amazonAppStore}
    //                                 className="w-[120px]"
    //                             />
    //                         </a>
    //                     </span>
    //                 </li>
    //                 <li className="list-item pt-2 text-red-600 font-bold">
    //                     You will need this app during the tournament in order to
    //                     see and manage your games
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     Visit the app and find out all the player registered to
    //                     the tournament and more information about the players
    //                     participating
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     Check out more details about the tournament in the app
    //                     like location, rules and so on
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     We will also send you email notifications when the
    //                     tournament date approaches.
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     Finally, keep practicing and may the pickleball spirit
    //                     be ever in your favor
    //                 </li>
    //             </ul>
    //             <div className="mt-4">
    //                 <NPLButton
    //                     text="Checkout Rules and Guidelines"
    //                     onClick={() =>
    //                         (window.location.pathname = `${UserRoutes.TournamentConfirmRegistration}/${tournamentId}`)
    //                     }
    //                 />
    //             </div>
    //         </div>
    //     </BaseContent>
    // );

    return (
        <div className="w-full max-w-[1200px] mx-auto py-10">
            <div className="w-[90%] mx-auto lg:w-[960px] py-10 px-14 bg-neutral-300">
                <div className="flex flex-col justify-center items-center pb-10">
                    <img src={checkmark} className="w-[80px] h-[80px]" />
                    <h1 className="text-xlTitle font-bold mt-9">You’re In!</h1>
                    <p className="font-medium mt-4">
                        Your payment has been process and your booking is
                        finalized
                    </p>
                </div>

                <hr className="h-px bg-neutral-400 drop-shadow border-0 w-[80%] my-4 mx-auto" />

                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-regTitle font-medium">What’s Next?</h2>
                    <p className="text-lgBody font-medium mt-3">
                        Download our app
                    </p>
                    <div className="flex justify-between gap-5 mt-3">
                        <a
                            href="https://apps.apple.com/us/app/nesterin-pickleball-league/id6590604559"
                            target="_blank"
                        >
                            <img src={appstoreDownload} className="w-[140px]" />
                        </a>
                        <a
                            href="https://www.amazon.com/gp/product/B0DCKB7ZM6"
                            target="_blank"
                        >
                            <img src={amazonAppStore} className="w-[140px]" />
                        </a>
                    </div>

                    <p className="mt-8">
                        You will need this app during the tournament in order to
                        see and manage your games. Visit the app and find out
                        all the player registered to the tournament and more
                        information about the players participating.{" "}
                    </p>
                    <p className="mt-6">
                        Check out more details about the tournament in the app
                        like location, rules and so on. We will also send you
                        email notifications when the tournament date approaches.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TournamentPaymentSuccessPage;
