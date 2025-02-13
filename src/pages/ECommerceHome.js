import { Card, CardContent, CardHeader } from "../components/Card";
import { Button } from "../components/Button";
import greenShirt from "../assets/green-shirt.png";
import jeanJacket from "../assets/jean-jacket.jpg";
import sunhat from "../assets/sunhat.jpg";

export function ECommerceHome({ cart, addToCart }) {
    const products = [
      { id: 1, name: "Green T-Shirt", price: 40, description: "A short sleeve shirt made with ethically sourced materials", image: greenShirt },
      { id: 2, name: "Bedazzled Jean Jacket", price: 90, description: "An ethically sourced jean jacket with fun bedazzles.", image: jeanJacket },
      { id: 3, name: "Sun Hat", price: 30, description: "A high quality sun hat made of ethically sourced straw.", image: sunhat },
    ];

    return (
      <div className="container mx-auto py-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg">
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg font-semibold mt-2">${product.price}</p>
                <Button
                  variant="primary"
                  className="mt-4 w-50 flex align-center"
                  onClick={() => addToCart(product)}
                >
                  <span className="flex flex-row items-center justify-around"> 
                    Add to Cart
                    <img width="24" height="24" src="https://img.icons8.com/sf-regular/48/shopping-cart.png" alt="shopping-cart"/>
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }