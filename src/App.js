import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { ECommerceHome } from "./pages/ECommerceHome";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import CompletePage from "./pages/CompletePage";
import { loadStripe } from "@stripe/stripe-js"; 

const stripePromise = loadStripe("pk_test_51QpGGfRqHKFe5Q3yPPTOVXN5DP4l3unN8WcSmz0f1zerUfDs3hN6W4EFg1F0kRQalXXkc7E8fKael8ToQIbO29vL00YxMz1UPB");

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Elements stripe={stripePromise}>
      <Router basename="/stripe-take-home-project">
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                <span className="flex flex-row items-center">
                <img width="32" height="32" src="https://img.icons8.com/cotton/128/needle--v1.png" alt="needle--v1"/>
                  Cozy Threads
                </span>
              </h1>
              <nav className="flex flex-row items-center">
                <Link to="/" className="text-lg font-semibold mx-2">Home</Link>
                <Link to="/cart" className="text-lg font-semibold mx-2">
                  <span className="flex flex-row items-center"> 
                    <img width="30" height="30" src="https://img.icons8.com/sf-regular/48/shopping-cart.png" alt="shopping-cart"/>
                    ({cart.length})
                  </span>
                 </Link>
              </nav>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<ECommerceHome cart={cart} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes>

          <footer className="fixed bottom-0 w-full bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Cozy Threads. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </Elements>
  );
}
