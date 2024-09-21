import BaseContent from "../../../components/BaseContent";

const TournamentPaymentErrorPage: React.FC = () => {
    return (
        <BaseContent innerStyle="flex flex-col">
            <h1 className="font-bold font-roboto text-neutral-50 text-center lg:text-4xl text-2xl pt-8">
                Looks like something went wrong with our server
            </h1>
            <h2 className="font-oswald text-secondary-100 text-center lg:text-2xl text-xl pt-3">
                Your payment went through but we are facing some issue
                finalizing your booking
            </h2>
            <div className="bg-neutral-100 p-8 rounded-xl mt-10 flex flex-col">
                <h2 className="text-tertiary-500 font-bold font-roboto lg:text-2xl text-xl">
                    What's Next?
                </h2>
                <ul className="list-outside list-disc mt-3">
                    <li className="list-item pt-2">
                        We have alerted our support team about this issue
                    </li>
                    <li className="list-item pt-2">
                        Please allow us 24 hours to resolve this issue for you
                    </li>
                    <li className="list-item pt-2">
                        We will reach out to you through email if we need some
                        additional information from you
                    </li>
                    <li className="list-item pt-2">
                        If this issue is not resolved within 24 hour then please
                        send us an email at info@nesterin.com
                    </li>
                </ul>
            </div>
        </BaseContent>
    );
};

export default TournamentPaymentErrorPage;
