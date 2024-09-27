import BaseContent from "../../../../components/BaseContent";
import TournamentRegistrationBaseContainer from "../TournamentRegistrationBaseContainer";

const TournamentPaymentErrorPage: React.FC = () => {
    return (
        <TournamentRegistrationBaseContainer>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xlTitle lg:text-2xlTitle text-center lg:text-left font-bold">
                    Oops! Something Went Wrong!
                </h1>
                <h2 className="text-smTitle lg:text-regTitle text-center lg:Text-left font-medium mt-6">
                    Your payment went through but there were some issue
                    finalizing your booking
                </h2>

                <hr className="h-px bg-neutral-400 drop-shadow border-0 w-full mt-10 lg:mt-14 mx-auto" />

                <div className="mt-6">
                    <h2 className="text-smTitle lg:text-regTitle font-medium">
                        What's Next?
                    </h2>
                    <p className="mt-2 lg:mt-4 text-regBody lg:text-lgBody">
                        We have alerted our support team about this issue.
                        Please allow us 24 hours to resolve this issue for you.
                        We will reach out to you through email if we need some
                        additional information from you.
                    </p>
                    <p className="mt-2 lg:mt-4 text-regBody lg:text-lgBody">
                        If this issue is not resolved within 24 hour then please
                        send us an email at{" "}
                        <span className="font-bold text-secondary-500">
                            info@nesterin.com
                        </span>
                    </p>
                </div>
            </div>
        </TournamentRegistrationBaseContainer>
    );
};

export default TournamentPaymentErrorPage;
