import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "./Button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Disable form submission until Stripe.js has loaded.
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://stripe-take-home-project.vercel.app/stripe-take-home-project/complete", //change to localhost:3000//stripe-take-home-project/complete for local testing
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        loading={isLoading}
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="my-4"
      >
        Pay now
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
