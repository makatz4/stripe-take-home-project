import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function CartPage({ cart }) {
  const isCartEmpty = cart.length === 0;

  return (
    <div className="container mx-auto py-6 px-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {isCartEmpty ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cart.map((item, index) => (
            <div key={index} className="p-4 border rounded bg-white shadow">
              <span className="flex flex-row items-center">
                <img src={item.image} alt={item.name} className="w-auto h-40"/>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-lg font-semibold mt-2">${item.price}</p>
                </div>
              </span>
            </div>  
          ))}
        </div>
      )}
      <div className="mt-6">
        <Link to={isCartEmpty ? "#" : "/checkout"}>
          <Button variant="primary" className={`w-full`} disabled={isCartEmpty}>
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
