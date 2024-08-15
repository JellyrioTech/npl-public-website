import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button from "../../../components/Button";

const PaymentForm: React.FC<{ intent: string; customerId: string }> = ({
    intent,
}) => {
    const stripe = useStripe();
    const elements = useElements();

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

    const cardElementWrapperStyle = {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#f8f9fa",
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                intent,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            if (error) {
                console.error("Payment failed:", error);
            } else if (paymentIntent?.status === "succeeded") {
                console.log("Payment succeeded:", paymentIntent);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-3">
            <div style={cardElementWrapperStyle}>
                <CardElement options={cardStyle} />
            </div>

            <Button
                text="Continue and Complete Payment"
                type="submit"
                classes="mt-3"
            />
        </form>
    );
};

export default PaymentForm;
