import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  gender: string[];
  categories: string[];
  brands: string[];
}

const gendersList = ["Male", "Female"];
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
    gender: [],
    categories: [],
    brands: [],
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (
    filterType: keyof FilterState,
    value: string
  ) => {
    setFilters((prevFilters) => {
      const updatedFilters = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedFilters };
    });
  };

  return (
    <aside className="sidebar-filter w-60 fixed">
      <Collapsible className="my-4">
        <CollapsibleTrigger className="w-full">Gender</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {gendersList.map((gender) => (
              <div className="flex items-center content-between" key={gender}>
                <label>
                  <input
                    type="checkbox"
                    className="mx-4"
                    checked={filters.gender.includes(gender)}
                    onChange={() => handleCheckboxChange("gender", gender)}
                  />
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="my-4">
        <CollapsibleTrigger className="w-full">Categories</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {categoriesList.map((category) => (
              <div key={category} className="flex items-center content-between">
                <label>
                  <input
                    type="checkbox"
                    className="mx-4"
                    checked={filters.categories.includes(category)}
                    onChange={() =>
                      handleCheckboxChange("categories", category)
                    }
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
                    onChange={() => handleCheckboxChange("brands", brand)}
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
