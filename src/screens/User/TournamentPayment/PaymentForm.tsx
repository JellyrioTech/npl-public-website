import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { TournamentPaymentVM } from "./TournamentPaymentVM";
import { UserRoutes } from "../../../util/routes";
import { useLoader } from "../../../components/LoaderProvider";
import NSPLButtonSquare from "../../../components/NPLButtonSquare";

const PaymentForm: React.FC<{
    intent: string;
    customerId: string;
    errorCb: (msg: string) => void;
    onSuccess: () => void;
}> = ({ intent, errorCb, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { showLoader, hideLoader } = useLoader();

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
            complete: {
                color: "#4CAF50", // Green for completed input
            },
        },
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        errorCb("");

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet.
            errorCb("Payment Method is not intialized");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            showLoader();
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                intent,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );
            hideLoader();

            if (error) {
                errorCb(`Payment Failed: ${error.message}`);
                return;
            } else if (paymentIntent?.status === "succeeded") {
                TournamentPaymentVM.finalizeTournamentPosition(intent, {
                    loaderCallback: (loader) => {
                        loader ? showLoader() : hideLoader();
                    },
                    errorCallBack: () => {
                        window.location.pathname = `${UserRoutes.TournamentPaymentError}`;
                        return;
                    },
                    success: () => {
                        onSuccess();
                        return;
                    },
                });
            }
            errorCb(`Something went wrong with processing the payment`);
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-3 flex flex-col gap-7">
            <div className="bg-neutral-100 p-3 rounded-lg border border-neutral-500">
                <CardElement options={cardStyle} />
            </div>

            <NSPLButtonSquare
                text={"Continue and Complete Payment"}
                type="submit"
            />
        </form>
    );
};

export default PaymentForm;
