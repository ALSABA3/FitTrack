import products from "@/dummy-products.json";
import SidebarFilter from "@/components/ui/SidebarFilter";
import { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button.js";
import { CartContext } from "@/components/shopping-cart";

export default function Shop() {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 100],
    brands: [],
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  const { addItemToCart } = useContext(CartContext);

  return (
    <section id="shop" className="flex flex-col mt-20">
      <h2 className="text-5xl font-semibold mb-24 text-center">Shop</h2>
      <div className="flex">
        <SidebarFilter onFilterChange={handleFilterChange} />
        <ul id="products" className="ml-96">
          {products.map((product) => (
            <Card key={product.id} className="">
              <CardHeader>
                <img src={product.image} />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{product.title}</CardTitle>
                <CardDescription className="mt-2">
                  {product.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p className="mr-4">{product.price} $</p>
                <Button onClick={() => addItemToCart(product.id)}>
                  add to cart
                </Button>
              </CardFooter>
            </Card>
            // <Product {...product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
