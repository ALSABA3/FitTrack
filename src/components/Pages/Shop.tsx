import products from "@/dummy-products.json";
import SidebarFilter from "@/components/ui/SidebarFilter";
import { useState } from "react";
import Product from "@/components/Product";

export default function Shop() {
  const [filters, setFilters] = useState({
    gender: [],
    categories: [],
    brands: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProducts = products.filter((product) => {
    const genderMatch = filters.gender.length
      ? filters.gender.some((gender) => product.filters.includes(gender))
      : true;

    const categoryMatch = filters.categories.length
      ? filters.categories.some((category) =>
          product.filters.includes(category)
        )
      : true;

    const brandMatch = filters.brands.length
      ? filters.brands.some((brand) => product.filters.includes(brand))
      : true;

    return genderMatch && categoryMatch && brandMatch;
  });

  return (
    <section id="shop" className="flex flex-col mt-20">
      <h2 className="text-5xl font-semibold mb-24 text-center">Shop</h2>
      <div className="flex">
        <SidebarFilter onFilterChange={handleFilterChange} />
        <ul id="products" className="ml-96 mr-4">
          {filteredProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
