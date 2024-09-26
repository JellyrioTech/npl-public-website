import { useParams } from "react-router-dom";
import BaseContent from "../../../components/BaseContent";
import { useEffect, useState } from "react";
import { TournamentPaymentVM } from "./TournamentPaymentVM";
import { PaymentResponse } from "npl-service-module/dist/services/Response/PaymentService.response";
import { CommonUtil } from "../../../util/CommonUtil";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { UserRoutes } from "../../../util/routes";
import { useLoader } from "../../../components/LoaderProvider";

const stripeKey = import.meta.env.VITE_STRIPE_PUB_KEY;
const stripePromise = loadStripe(stripeKey);

const TournamentPaymentPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [payment, setPayment] = useState<Partial<PaymentResponse>>({});
    const [paymentDoc, setPaymentDoc] = useState("");
    const [error, setError] = useState("");
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        TournamentPaymentVM.getPaymentIntent(Number(tournamentId), {
            loaderCallback: (loader) => {
                loader ? showLoader() : hideLoader();
            },
            errorCallBack: () => {},
            success: (obj) => {
                setPayment(obj);
            },
        });
        TournamentPaymentVM.getPaymentDoc({
            loaderCallback: () => {},
            errorCallBack: () => {},
            success: (obj) => {
                setPaymentDoc(obj.link);
            },
        });
    }, []);

    // return (
    //     <BaseContent innerStyle="flex flex-col gap-4">
    //         <div className="bg-neutral-100 p-5 rounded-xl ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Payment
    //             </h2>
    //             <p className="mt-3 font-roboto text-md lg:text-lg">
    //                 Perfect! We have hold your reservation. Please complete your
    //                 payment within the next 24 hour to hold this reservation and
    //                 finalize your spot
    //             </p>
    //         </div>
    //         <div className="bg-neutral-100 p-5 rounded-xl flex flex-col gap-0 ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Invoice
    //             </h2>
    //             <span className="flex pt-5 mb-3 text-lg">
    //                 <p className="flex-1 font-bold font-roboto">Item</p>
    //                 <p className="font-bold font-roboto">Price/$</p>
    //             </span>
    //             {payment.invoice?.map((invoice) => (
    //                 <span className="flex pb-2 text-lg">
    //                     <p className="flex-1 font-roboto text-sm">
    //                         {invoice.item}
    //                     </p>
    //                     <p className="font-roboto text-sm">
    //                         {CommonUtil.CurrencyHelper.convertCentsToDollars(
    //                             invoice.amount
    //                         )}
    //                     </p>
    //                 </span>
    //             ))}

    //             <span className="flex pt-2 mt-3 pb-2 text-lg border-t-2">
    //                 <p className="flex-1 font-roboto text-sm font-bold">
    //                     Total
    //                 </p>
    //                 <p className="font-roboto text-sm font-bold">
    //                     {CommonUtil.CurrencyHelper.convertCentsToDollars(
    //                         payment.total || 0
    //                     )}
    //                 </p>
    //             </span>
    //         </div>
    //         <div className="bg-neutral-100 p-5 rounded-xl ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Refund Policy
    //             </h2>
    //             <p className="mt-3 font-roboto text-md lg:text-lg">
    //                 You are eligible for a full refund only if you cancel your
    //                 reservation before 2 weeks of starting date of the
    //                 tournament
    //             </p>
    //         </div>
    //         <div className="bg-neutral-100 p-5 rounded-xl ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Complete your booking
    //             </h2>
    //             <p className="mt-3 font-roboto text-md lg:text-lg mb-2">
    //                 By completing this transaction, you agree to our{" "}
    //                 <a
    //                     href={`https://f004.backblazeb2.com/file/npl-docs-public/${paymentDoc}`}
    //                     className="font-bold text-blue-500"
    //                     target="_blank"
    //                 >
    //                     Payment Terms and Conditions.
    //                 </a>
    //             </p>
    //             <Elements stripe={stripePromise}>
    //                 <PaymentForm
    //                     intent={payment.intentSecret || ""}
    //                     customerId={payment.customerId || ""}
    //                     errorCb={setError}
    //                     onSuccess={() => {
    //                         window.location.pathname = `${UserRoutes.TournamentPaymentSuccess}/${tournamentId}`;
    //                     }}
    //                 />
    //             </Elements>
    //         </div>
    //     </BaseContent>
    // );

    return (
        <div className="w-full max-w-[1200px] mx-auto py-10">
            <div className="w-[90%] mx-auto lg:w-[960px] py-10 px-14 bg-neutral-300">
                <h1 className="font-bold">
                    Perfect! We have hold your reservation. Please complete your
                    payment within the next 24 hour to hold this reservation and
                    finalize your spot
                </h1>
                <div className="w-[75%] lg:w-[410px] mx-auto rounded-[10px] p-6 border border-black border-opacity-35 bg-[#D7D8D5] mt-10">
                    {payment.invoice?.map((item) => (
                        <div className="flex justify-between gap-3">
                            <p>{item.item}</p>
                            <p className="font-bold">
                                $
                                {CommonUtil.CurrencyHelper.convertCentsToDollars(
                                    item.amount
                                )}
                            </p>
                        </div>
                    ))}
                    <hr className="h-px mt-3 bg-black border-0" />
                    <div className="flex justify-between mt-2">
                        <p>Total</p>
                        <p className="font-bold">
                            $
                            {CommonUtil.CurrencyHelper.convertCentsToDollars(
                                payment.total || 0
                            )}
                        </p>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-lgTitle font-medium">Refund Policy</h2>
                    <p className="text-lgBody mt-3">
                        You are eligible for a full refund only if you cancel
                        your reservation before 2 weeks of starting date of the
                        tournament.
                    </p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lgTitle font-medium">Payment Method</h2>
                    <p className="text-lgBody mt-3">
                        By completing this transaction, you agree to our{" "}
                        <a
                            href={`https://f004.backblazeb2.com/file/npl-docs-public/${paymentDoc}`}
                            className="font-bold text-secondary-500"
                            target="_blank"
                        >
                            Payment Terms and Conditions.
                        </a>
                        <div className="mt-5">
                            {error && (
                                <p className="text-red-600 mb-5 text-sm">
                                    {error}
                                </p>
                            )}
                            <Elements stripe={stripePromise}>
                                <PaymentForm
                                    intent={payment.intentSecret || ""}
                                    customerId={payment.customerId || ""}
                                    errorCb={setError}
                                    // onSuccess={() => {
                                    //     window.location.pathname = `${UserRoutes.TournamentPaymentSuccess}/${tournamentId}`;
                                    // }}
                                    onSuccess={() =>
                                        (window.location.pathname = `${UserRoutes.TournamentPaymentError}`)
                                    }
                                />
                            </Elements>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TournamentPaymentPage;
