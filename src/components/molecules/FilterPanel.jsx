import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const FilterPanel = ({ 
  filters = {},
  onFiltersChange,
  onClear,
  className = ""
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  const locationOptions = [
    { value: "cairo", label: "Cairo" },
    { value: "alexandria", label: "Alexandria" },
    { value: "giza", label: "Giza" },
    { value: "aswan", label: "Aswan" },
    { value: "luxor", label: "Luxor" },
    { value: "mansoura", label: "Mansoura" },
    { value: "tanta", label: "Tanta" },
    { value: "zagazig", label: "Zagazig" },
    { value: "suez", label: "Suez" },
    { value: "ismailia", label: "Ismailia" }
  ];
  
  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Nearest to Me" },
    { value: "fees", label: "Lowest Fees" },
    { value: "grades", label: "Lowest Requirements" },
    { value: "name", label: "Alphabetical" }
  ];
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };
  
  const handleClear = () => {
    setLocalFilters({});
    onClear?.();
  };
  
  return (
    <Card className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          Filters
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleClear}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-4">
        <Select
          label="Location"
          value={localFilters.location || ""}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          options={locationOptions}
          placeholder="Select location"
        />
        
        <Select
          label="Sort By"
          value={localFilters.sortBy || ""}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          options={sortOptions}
          placeholder="Sort by"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Min Rating"
            type="number"
            min="1"
            max="10"
            step="0.1"
            placeholder="1.0"
            value={localFilters.minRating || ""}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
          />
          
          <Input
            label="Max Fees (EGP)"
            type="number"
            min="0"
            step="1000"
            placeholder="50000"
            value={localFilters.maxFees || ""}
            onChange={(e) => handleFilterChange("maxFees", e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Min Grade"
            type="number"
            min="50"
            max="100"
            step="0.1"
            placeholder="70.0"
            value={localFilters.minGrade || ""}
            onChange={(e) => handleFilterChange("minGrade", e.target.value)}
          />
          
          <Input
            label="Max Grade"
            type="number"
            min="50"
            max="100"
            step="0.1"
            placeholder="95.0"
            value={localFilters.maxGrade || ""}
            onChange={(e) => handleFilterChange("maxGrade", e.target.value)}
          />
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Features</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.hasPostgraduate || false}
                onChange={(e) => handleFilterChange("hasPostgraduate", e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Postgraduate Programs</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.accredited || false}
                onChange={(e) => handleFilterChange("accredited", e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">NAQAAEE Accredited</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.verified || false}
                onChange={(e) => handleFilterChange("verified", e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Verified by Filgamaa</span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;