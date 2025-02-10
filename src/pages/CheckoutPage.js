import Elements from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your Stripe publishable key

export function CheckoutPage({ cart }) {
    const totalAmount = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  
    return (
      <div className="container mx-auto py-6 px-6">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <p className="mb-4">Total Amount: ${totalAmount}</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} />
        </Elements>
      </div>
    );
  }