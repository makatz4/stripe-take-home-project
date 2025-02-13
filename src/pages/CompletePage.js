import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

const CompletePage = () => {
  const stripe = useStripe();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Get query parameters from URL
    const paymentIntentId = urlParams.get("payment_intent");
    const clientSecret = urlParams.get("payment_intent_client_secret");
    const redirectStatus = urlParams.get("redirect_status");

    // Log to check if parameters are being fetched correctly
    console.log("URL Params:", paymentIntentId, clientSecret, redirectStatus);

    // If Stripe and necessary params are available, check payment status
    if (stripe && paymentIntentId && clientSecret) {
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          // If the payment succeeded, show success message
          if (paymentIntent.status === "succeeded") {
            setPaymentStatus("Payment successful!");
          } else {
            setPaymentStatus("Payment failed.");
          }
          setLoading(false);
        })
        .catch((error) => {
          setPaymentStatus("Error occurred: " + error.message);
          setLoading(false);
        });
    } else {
      setPaymentStatus("Invalid payment details.");
      setLoading(false);
    }
  }, [stripe]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while processing
  }

  return (
    <div>
      <h1>{paymentStatus}</h1>
      {/* Optionally, provide a link or button to go back to home or cart */}
      <button onClick={() => window.location.href = "/"}>Go to Home</button>
    </div>
  );
};

export default CompletePage;
