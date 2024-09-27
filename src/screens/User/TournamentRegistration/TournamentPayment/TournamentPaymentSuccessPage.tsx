import appstoreDownload from "../../../../assets/App Store download.png";
import amazonAppStore from "../../../../assets/amazon_appstore.png";
import checkmark from "../../../../../public/checkmarkpng.png";
import TournamentRegistrationBaseContainer from "../TournamentRegistrationBaseContainer";

const TournamentPaymentSuccessPage: React.FC = () => {
    return (
        <TournamentRegistrationBaseContainer>
            <div className="flex flex-col justify-center items-center pb-6 lg:pb-10">
                <img
                    src={checkmark}
                    className="w-[56px] lg:w-[80px] lg:h-[80px]"
                />
                <h1 className="text-lgTitle lg:text-xlTitle font-bold mt-6 lg:mt-9">
                    You’re In!
                </h1>
                <p className="font-medium mt-4 text-center text-balance lg:text-left text-regBody lg:text-lgBody">
                    Your payment has been process and your booking is finalized
                </p>
            </div>

            <hr className="h-px bg-neutral-400 drop-shadow border-0 w-[80%] mt-2 mb-4 lg:my-4 mx-auto" />

            <div className="flex flex-col justify-center items-center">
                <h2 className="text-smTitle lg:text-regTitle font-medium">
                    What’s Next?
                </h2>
                <p className="text-regBody lg:text-lgBody font-medium mt-1.5 lg:mt-3">
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

                <p className="mt-8 text-regBody lg:text-lgBody">
                    You will need this app during the tournament in order to see
                    and manage your games. Visit the app and find out all the
                    player registered to the tournament and more information
                    about the players participating.{" "}
                </p>
                <p className="mt-3 lg:mt-6 text-regBody lg:text-lgBody">
                    Check out more details about the tournament in the app like
                    location, rules and so on. We will also send you email
                    notifications when the tournament date approaches.
                </p>
            </div>
        </TournamentRegistrationBaseContainer>
    );
};

export default TournamentPaymentSuccessPage;
