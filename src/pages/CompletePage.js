import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

const SuccessIcon = <img width="100" height="100" src="https://img.icons8.com/bubbles/100/ok.png" alt="ok"/>;

const ErrorIcon = <img width="100" height="100" src="https://img.icons8.com/bubbles/100/error.png" alt="error"/>;

const InfoIcon = <img width="100" height="100" src="https://img.icons8.com/bubbles/100/synchronize.png" alt="synchronize"/>;

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment succeeded. Thank you for your purchase!",
    icon: SuccessIcon,
  },
  processing: {
    text: "Your payment is processing.",
    icon: InfoIcon,
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    icon: ErrorIcon,
  },
  default: {
    text: "Your payment is processing.",
    icon: InfoIcon,
  }
};

export default function CompletePage() {
  const stripe = useStripe();

  const [status, setStatus] = useState("default");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      console.log(paymentIntent.status);
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
    });
  }, [stripe]);

  return (
    <div id="payment-status" className="flex flex-col items-center justify-center h-full">
      <div id="status-icon">
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <h2 id="status-text">{STATUS_CONTENT_MAP[status].text}</h2>
      <Link to="/" className="text-md font-semibold mx-2 my-8">Return to Home</Link>
    </div>
  );
}