import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function CartPage({ cart }) {
    return (
      <div className="container mx-auto py-6 px-6">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item, index) => (
              <div key={index} className="p-4 border rounded bg-white shadow">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-semibold mt-2">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <Link to="/checkout">
            <Button variant="primary" className="w-full">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    );
  }
