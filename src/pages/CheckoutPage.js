import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QpGGfRqHKFe5Q3yPPTOVXN5DP4l3unN8WcSmz0f1zerUfDs3hN6W4EFg1F0kRQalXXkc7E8fKael8ToQIbO29vL00YxMz1UPB");

export function CheckoutPage({ cart }) {
  const [clientSecret, setClientSecret] = useState('');
  const totalAmount = (cart.reduce((total, item) => total + item.price, 0));
  
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://stripe-take-home-project.vercel.app/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }), //FIXME
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          Loading payment details...
        </div>
        <img width="100" height="100" src="https://img.icons8.com/bubbles/100/synchronize.png" alt="synchronize"/>
      </div>
    );
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