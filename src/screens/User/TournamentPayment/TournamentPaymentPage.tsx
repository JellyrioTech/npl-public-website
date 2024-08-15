import { useParams } from "react-router-dom";
import BaseContent from "../../../components/BaseContent";
import { useEffect, useState } from "react";
import { TournamentPaymentVM } from "./TournamentPaymentVM";
import { PaymentResponse } from "npl-service-module/dist/services/Response/PaymentService.response";
import { CommonUtil } from "../../../util/CommonUtil";
import Button from "../../../components/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { UserRoutes } from "../../../util/routes";

const stripePromise = loadStripe(
    "pk_test_51PMrIMRsr5aJLfHYA5IPYVFMXN7wALfhePegD4WTh7SNqoUkixGRiIFuq8lKnRPfz4ZSyS1j7jWnjT0cMS7fOH1C004w6uxnbO"
);

const TournamentPaymentPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [payment, setPayment] = useState<Partial<PaymentResponse>>({});
    const [paymentDoc, setPaymentDoc] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        TournamentPaymentVM.getPaymentIntent(Number(tournamentId), {
            loaderCallback: () => {},
            errorCallBack: (code, error) => {},
            success: (obj) => {
                setPayment(obj);
            },
        });
        TournamentPaymentVM.getPaymentDoc({
            loaderCallback: () => {},
            errorCallBack: (code, error) => {},
            success: (obj) => {
                setPaymentDoc(obj.link);
            },
        });
    }, []);

    return (
        <BaseContent innerStyle="flex flex-col gap-4">
            <div className="bg-neutral-100 p-5 rounded-xl ">
                <h2 className="font-oswald font-bold text-xl md:text-2xl ">
                    Payment
                </h2>
                <p className="mt-3 font-roboto text-md md:text-lg">
                    Perfect! We have hold your reservation. Please complete your
                    payment within the next 24 hour to hold this reservation and
                    finalize your spot
                </p>
            </div>
            <div className="bg-neutral-100 p-5 rounded-xl flex flex-col gap-0 ">
                <h2 className="font-oswald font-bold text-xl md:text-2xl ">
                    Invoice
                </h2>
                <span className="flex pt-5 mb-3 text-lg">
                    <p className="flex-1 font-bold font-roboto">Item</p>
                    <p className="font-bold font-roboto">Price/$</p>
                </span>
                {payment.invoice?.map((invoice) => (
                    <span className="flex pb-2 text-lg">
                        <p className="flex-1 font-roboto text-sm">
                            {invoice.item}
                        </p>
                        <p className="font-roboto text-sm">
                            {CommonUtil.CurrencyHelper.convertCentsToDollars(
                                invoice.amount
                            )}
                        </p>
                    </span>
                ))}

                <span className="flex pt-2 mt-3 pb-2 text-lg border-t-2">
                    <p className="flex-1 font-roboto text-sm font-bold">
                        Total
                    </p>
                    <p className="font-roboto text-sm font-bold">
                        {CommonUtil.CurrencyHelper.convertCentsToDollars(
                            payment.total || 0
                        )}
                    </p>
                </span>
            </div>
            <div className="bg-neutral-100 p-5 rounded-xl ">
                <h2 className="font-oswald font-bold text-xl md:text-2xl ">
                    Refund Policy
                </h2>
                <p className="mt-3 font-roboto text-md md:text-lg">
                    You are eligible for a full refund only if you cancel your
                    reservation before 2 weeks of starting date of the
                    tournament
                </p>
            </div>
            <div className="bg-neutral-100 p-5 rounded-xl ">
                <h2 className="font-oswald font-bold text-xl md:text-2xl ">
                    Complete your booking
                </h2>
                <p className="mt-3 font-roboto text-md md:text-lg mb-2">
                    By completing this transaction, you agree to our{" "}
                    <a
                        href={`https://f004.backblazeb2.com/file/npl-docs-public/${paymentDoc}`}
                        className="font-bold text-blue-500"
                        target="_blank"
                    >
                        Payment Terms and Conditions.
                    </a>
                </p>
                <Elements stripe={stripePromise}>
                    <PaymentForm
                        intent={payment.intentSecret || ""}
                        customerId={payment.customerId || ""}
                        errorCb={setError}
                        onSuccess={() => {
                            window.location.pathname = `${UserRoutes.TournamentRules}/${tournamentId}`;
                        }}
                    />
                </Elements>
            </div>
        </BaseContent>
    );
};

export default TournamentPaymentPage;
