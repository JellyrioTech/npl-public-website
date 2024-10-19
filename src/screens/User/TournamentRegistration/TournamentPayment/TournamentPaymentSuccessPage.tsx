import facebookIcon from "../../../../assets/facebook_icon.png";
import youtubeIcon from "../../../../assets/youtube_icon.png";
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
                    Follow us on Facebook and Youtube by clicking below
                </p>
                <div className="flex justify-between items-center gap-5 mt-6">
                    <a
                        href="https://www.facebook.com/profile.php?id=61564428110467"
                        target="_blank"
                    >
                        <img src={facebookIcon} className="w-[80px]" />
                    </a>
                    <a
                        href="https://www.youtube.com/@NesterinPickleballLeague"
                        target="_blank"
                    >
                        <img src={youtubeIcon} className="w-[200px]" />
                    </a>
                </div>

                <p className="mt-8 text-regBody lg:text-lgBody">
                    We will post all our recent update on our social media like
                    Facebook regarding this tournament. You will also be able to
                    check any changes or any upcoming tournament. This will also
                    support us to expand our community
                </p>
                <p className="mt-3 lg:mt-6 text-regBody lg:text-lgBody">
                    Check out more details about the tournament in the our
                    website like location, rules and so on. We will also send
                    you email notifications when the tournament date approaches.
                </p>
            </div>
        </TournamentRegistrationBaseContainer>
    );
};

export default TournamentPaymentSuccessPage;
