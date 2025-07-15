import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  placeholder = "Search universities and faculties...", 
  onSearch,
  className = "",
  showFilters = false,
  onFiltersToggle
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-primary-400"
        />
      </div>
      
      <Button 
        type="submit"
        size="lg"
        className="px-8 py-4 rounded-xl"
      >
        <ApperIcon name="Search" size={20} />
      </Button>
      
      {showFilters && (
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onFiltersToggle}
          className="px-6 py-4 rounded-xl"
        >
          <ApperIcon name="Filter" size={20} className="mr-2" />
          Filters
        </Button>
      )}
    </form>
  );
};

export default SearchBar;