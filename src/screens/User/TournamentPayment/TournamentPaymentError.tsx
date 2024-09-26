import BaseContent from "../../../components/BaseContent";

const TournamentPaymentErrorPage: React.FC = () => {
    // return (
    //     <BaseContent innerStyle="flex flex-col">
    //         <h1 className="font-bold font-roboto text-neutral-50 text-center lg:text-4xl text-2xl pt-8">
    //             Looks like something went wrong with our server
    //         </h1>
    //         <h2 className="font-oswald text-secondary-100 text-center lg:text-2xl text-xl pt-3">
    //             Your payment went through but we are facing some issue
    //             finalizing your booking
    //         </h2>
    //         <div className="bg-neutral-100 p-8 rounded-xl mt-10 flex flex-col">
    //             <h2 className="text-tertiary-500 font-bold font-roboto lg:text-2xl text-xl">
    //                 What's Next?
    //             </h2>
    //             <ul className="list-outside list-disc mt-3">
    //                 <li className="list-item pt-2">
    //                     We have alerted our support team about this issue
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     Please allow us 24 hours to resolve this issue for you
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     We will reach out to you through email if we need some
    //                     additional information from you
    //                 </li>
    //                 <li className="list-item pt-2">
    //                     If this issue is not resolved within 24 hour then please
    //                     send us an email at info@nesterin.com
    //                 </li>
    //             </ul>
    //         </div>
    //     </BaseContent>
    // );

    return (
        <div className="w-full max-w-[1200px] mx-auto py-10">
            <div className="w-[90%] mx-auto lg:w-[960px] px-14 bg-neutral-300 py-28">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xlTitle font-bold">
                        Oops! Something Went Wrong!
                    </h1>
                    <h2 className="text-regTitle font-medium mt-6">
                        Your payment went through but there were some issue
                        finalizing your booking
                    </h2>

                    <hr className="h-px bg-neutral-400 drop-shadow border-0 w-full mt-14 mx-auto" />

                    <div className="mt-6">
                        <h2 className="text-regTitle font-medium">
                            What's Next?
                        </h2>
                        <p className="mt-4">
                            We have alerted our support team about this issue.
                            Please allow us 24 hours to resolve this issue for
                            you. We will reach out to you through email if we
                            need some additional information from you.
                        </p>
                        <p className="mt-4">
                            If this issue is not resolved within 24 hour then
                            please send us an email at{" "}
                            <span className="font-bold text-secondary-500">
                                info@nesterin.com
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentPaymentErrorPage;
