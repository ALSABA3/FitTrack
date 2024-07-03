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
  type: string[];
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
    type: [],
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
        <CollapsibleTrigger className="w-full">Type</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {typeList.map((type) => (
              <div className="flex items-center content-between" key={type}>
                <label>
                  <input
                    type="checkbox"
                    className="mx-4"
                    checked={filters.type.includes(type)}
                    onChange={() => handleCheckboxChange("type", type)}
                  />
                  {type}
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
