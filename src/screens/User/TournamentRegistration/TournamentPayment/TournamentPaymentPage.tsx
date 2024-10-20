import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TournamentPaymentVM } from "./TournamentPaymentVM";
import { PaymentResponse } from "npl-service-module/dist/services/Response/PaymentService.response";
import { CommonUtil } from "../../../../util/CommonUtil";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { UserRoutes } from "../../../../util/routes";
import { useLoader } from "../../../../components/LoaderProvider";
import TournamentRegistrationBaseContainer from "../TournamentRegistrationBaseContainer";
import { GetTournamentId } from "../../../../DefaultTournamentId";

const stripeKey = import.meta.env.VITE_STRIPE_PUB_KEY;
const stripePromise = loadStripe(stripeKey);

const TournamentPaymentPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId?: string }>();
    const [payment, setPayment] = useState<Partial<PaymentResponse>>({});
    const [paymentDoc, setPaymentDoc] = useState("");
    const [error, setError] = useState("");
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        TournamentPaymentVM.getPaymentIntent(GetTournamentId(tournamentId), {
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

    return (
        <TournamentRegistrationBaseContainer>
            <h1 className="font-bold">
                Perfect! We have hold your reservation. Please complete your
                payment within the next 24 hour to hold this reservation and
                finalize your spot
            </h1>
            <div className="w-[75%] lg:w-[410px] mx-auto rounded-[10px] p-6 border border-black border-opacity-35 bg-[#D7D8D5] mt-8 lg:mt-10">
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

            <div className="mt-10 lg:mt-12">
                <h2 className="text-regTitle lg:text-lgTitle font-medium">
                    Refund Policy
                </h2>
                <p className="text-regBody lg:text-lgBody mt-2 lg:mt-3">
                    You are eligible for a full refund only if you cancel your
                    reservation before 2 weeks of starting date of the
                    tournament.
                </p>
            </div>

            <div className="mt-4 lg:mt-6">
                <h2 className="text-regTitle lg:text-lgTitle font-medium">
                    Payment Method
                </h2>
                <p className="text-regBody lg:text-lgBody mt-2 lg:mt-3">
                    By completing this transaction, you agree to our{" "}
                    <a
                        href={`https://f004.backblazeb2.com/file/npl-docs-public/${paymentDoc}`}
                        className="font-bold text-secondary-500"
                        target="_blank"
                    >
                        Payment Terms and Conditions.
                    </a>
                    <div className="mt-3 lg:mt-5">
                        {error && (
                            <p className="text-red-600 mb-5 text-sm">{error}</p>
                        )}
                        <Elements stripe={stripePromise}>
                            <PaymentForm
                                intent={payment.intentSecret || ""}
                                customerId={payment.customerId || ""}
                                errorCb={setError}
                                onSuccess={() => {
                                    window.location.pathname = `${
                                        UserRoutes.TournamentPaymentSuccess
                                    }/${GetTournamentId(tournamentId)}`;
                                }}
                            />
                        </Elements>
                    </div>
                </p>
            </div>
        </TournamentRegistrationBaseContainer>
    );
};

export default TournamentPaymentPage;
