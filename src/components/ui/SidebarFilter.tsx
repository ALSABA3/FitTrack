import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
}

const categoriesList = [
  "T-Shirts",
  "Shorts",
  "Shoes",
  "Accessories",
  "Supplements",
];
const brandsList = ["Nike", "Adidas", "Under Armour", "Puma", "GymShark"];

const SidebarFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100],
    brands: [],
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setFilters((prevFilters) => {
      const categories = prevFilters.categories.includes(category)
        ? prevFilters.categories.filter((c) => c !== category)
        : [...prevFilters.categories, category];
      return { ...prevFilters, categories };
    });
  };

  const handleBrandChange = (brand: string) => {
    setFilters((prevFilters) => {
      const brands = prevFilters.brands.includes(brand)
        ? prevFilters.brands.filter((b) => b !== brand)
        : [...prevFilters.brands, brand];
      return { ...prevFilters, brands };
    });
  };

  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = Number(event.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: newPriceRange as [number, number],
    }));
  };

  return (
    <aside className="sidebar-filter w-60 fixed">
      <Collapsible className="my-4">
        <CollapsibleTrigger className="w-full">Gender</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            <div className="flexitems-center content-between">
              <label>
                <input type="checkbox" className="mx-4" />
                Male
              </label>
            </div>
            <div className="flex items-center content-center">
              <label>
                <input type="checkbox" className="mx-4" />
                Female
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="my-4">
        <CollapsibleTrigger className="w-full">Categories</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {categoriesList.map((category) => (
              <div key={category} className="flexitems-center content-between">
                <label>
                  <input
                    type="checkbox"
                    className="mx-4"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="my-4">
        <CollapsibleTrigger className="w-full">Brands</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {brandsList.map((brand) => (
              <div key={brand}>
                <label>
                  <input
                    type="checkbox"
                    className="mx-4"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
};

export default SidebarFilter;
