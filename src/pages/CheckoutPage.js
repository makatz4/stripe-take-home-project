import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export function CheckoutPage({ cart }) {
  const [clientSecret, setClientSecret] = useState('');
  const totalAmount = (cart.reduce((total, item) => total + item.price, 0));
  
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://stripe-take-home-project-vzyt.vercel.app/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }), //FIXME
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