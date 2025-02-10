import { Card, CardContent, CardHeader } from "../components/Card";
import { Button } from "../components/Button";

export function ECommerceHome({ cart, addToCart }) {
    const products = [
      { id: 1, name: "Product 1", price: 19.99, description: "This is a great product.", image: "https://via.placeholder.com/300?text=Product+1" },
      { id: 2, name: "Product 2", price: 29.99, description: "This is another great product.", image: "https://via.placeholder.com/300?text=Product+2" },
      { id: 3, name: "Product 3", price: 39.99, description: "This is the best product.", image: "https://via.placeholder.com/300?text=Product+3" },
    ];
  
    return (
      <div className="container mx-auto py-6 px-6">
        <h2 className="text-xl font-semibold mb-4">Cozy Threads sells high-quality, ethically-sourced apparel and accessories.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg">
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
                <Button
                  variant="primary"
                  className="mt-4 w-full"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }