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
  category: string[];
}

const typeList = [
  "FITNESS",
  "NUTRITION",
  "RECIPES",
  "SUCCESS STORIES",
  "WELLNESS",
];

const BlogSideFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
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
        <CollapsibleTrigger className="w-full text-xl mb-4">
          category
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {typeList.map((category) => (
              <div className="flex items-center content-between" key={category}>
                <label>
                  <input
                    type="checkbox"
                    className="mx-4"
                    checked={filters.category.includes(category)}
                    onChange={() => handleCheckboxChange("category", category)}
                  />
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
};

export default BlogSideFilter;
