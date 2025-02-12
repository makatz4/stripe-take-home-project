import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QpGGfRqHKFe5Q3yPPTOVXN5DP4l3unN8WcSmz0f1zerUfDs3hN6W4EFg1F0kRQalXXkc7E8fKael8ToQIbO29vL00YxMz1UPB");

export function CheckoutPage({ cart }) {
  const [clientSecret, setClientSecret] = useState('');
  const totalAmount = (cart.reduce((total, item) => total + item.price, 0) * 100).toFixed(0); // Convert to cents
  
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) {
    return <div>Loading payment details...</div>;
  } 
  
    return (
      <div className="container mx-auto py-6 px-6">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <p className="mb-4">Total Amount: ${totalAmount}</p>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm cart={cart} />
          </Elements>
        )}
      </div>
    );
}