import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ECommerceHome } from "./pages/ECommerceHome";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Cozy Threads</h1>
            <nav>
              <Link to="/" className="text-lg font-semibold mx-2">Home</Link>
              <Link to="/cart" className="text-lg font-semibold mx-2">Cart ({cart.length})</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<ECommerceHome cart={cart} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        </Routes>

        <footer className="fixed bottom-0 w-full bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 Cozy Threads. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
