import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { universityService } from "@/services/api/universityService";
import { facultyService } from "@/services/api/facultyService";

const Compare = () => {
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareType, setCompareType] = useState("universities");
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    handleSearch();
  }, [searchQuery, compareType, universities, faculties]);
  
  const loadData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const [universitiesData, facultiesData] = await Promise.all([
        universityService.getAll(),
        facultyService.getAll()
      ]);
      
      setUniversities(universitiesData);
      setFaculties(facultiesData);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const dataSource = compareType === "universities" ? universities : faculties;
    const filtered = dataSource.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered.slice(0, 10)); // Limit to 10 results
  };
  
  const addToComparison = (item) => {
    if (selectedItems.find(selected => selected.Id === item.Id)) {
      return; // Already in comparison
    }
    
    if (selectedItems.length >= 3) {
      alert("You can compare up to 3 items at a time");
      return;
    }
    
    setSelectedItems([...selectedItems, { ...item, type: compareType }]);
    setSearchQuery("");
    setSearchResults([]);
  };
  
  const removeFromComparison = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.Id !== itemId));
  };
  
  const clearComparison = () => {
    setSelectedItems([]);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getComparisonData = () => {
    if (compareType === "universities") {
      return [
        { key: "name", label: "University Name", type: "text" },
        { key: "overallRating", label: "Overall Rating", type: "rating" },
        { key: "totalReviews", label: "Total Reviews", type: "number" },
        { key: "yearEstablished", label: "Year Established", type: "number" },
        { key: "location.address", label: "Location", type: "text" },
        { key: "accreditationStatus", label: "Accredited", type: "boolean" },
        { key: "verificationStatus", label: "Verified", type: "boolean" }
      ];
    } else {
      return [
        { key: "name", label: "Faculty Name", type: "text" },
        { key: "overallRating", label: "Overall Rating", type: "rating" },
        { key: "totalReviews", label: "Total Reviews", type: "number" },
        { key: "annualFeesEGP", label: "Annual Fees", type: "currency" },
        { key: "acceptanceGrades.thanaweya", label: "Min Grade (Thanaweya)", type: "percentage" },
        { key: "yearCommenced", label: "Year Commenced", type: "number" },
        { key: "naqaaeeAccreditation", label: "NAQAAEE Accredited", type: "boolean" },
        { key: "hasPostgraduate", label: "Postgraduate Programs", type: "boolean" }
      ];
    }
  };
  
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };
  
  const renderComparisonValue = (item, field) => {
    const value = getNestedValue(item, field.key);
    
    switch (field.type) {
      case "rating":
        return (
          <div className="flex items-center gap-2">
            <StarRating rating={value || 0} readonly size="sm" showValue={false} />
            <span className="font-semibold">{value?.toFixed(1) || "N/A"}</span>
          </div>
        );
      case "currency":
        return <span className="font-semibold">{value ? formatCurrency(value) : "N/A"}</span>;
      case "percentage":
        return <span className="font-semibold">{value ? `${value}%` : "N/A"}</span>;
      case "boolean":
        return (
          <Badge variant={value ? "success" : "gray"} size="sm">
            {value ? "Yes" : "No"}
          </Badge>
        );
      case "number":
        return <span className="font-semibold">{value || "N/A"}</span>;
      default:
        return <span className="font-semibold">{value || "N/A"}</span>;
    }
  };
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-gradient mb-4">
            Compare Universities & Faculties
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Make informed decisions by comparing key features, ratings, and requirements side by side.
          </p>
        </motion.div>
        
        {/* Search and Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Select
                  value={compareType}
                  onChange={(e) => setCompareType(e.target.value)}
                  options={[
                    { value: "universities", label: "Universities" },
                    { value: "faculties", label: "Faculties" }
                  ]}
                  className="mb-4 lg:mb-0"
                />
              </div>
              <div className="flex-[2]">
                <div className="relative">
                  <SearchBar
                    placeholder={`Search ${compareType}...`}
                    onSearch={setSearchQuery}
                    className="w-full"
                  />
                  
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
                      {searchResults.map((item) => (
                        <button
                          key={item.Id}
                          onClick={() => addToComparison(item)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <StarRating rating={item.overallRating} readonly size="sm" showValue={false} />
                                <span className="text-sm text-gray-600">
                                  {item.overallRating?.toFixed(1) || "N/A"}
                                </span>
                              </div>
                            </div>
                            <ApperIcon name="Plus" size={20} className="text-primary-600" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-gray-900">
                  Selected for Comparison ({selectedItems.length}/3)
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearComparison}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="X" size={16} />
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.Id}
                    className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200 relative"
                  >
                    <button
                      onClick={() => removeFromComparison(item.Id)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <ApperIcon name="X" size={16} className="text-gray-500" />
                    </button>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 pr-8">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={item.overallRating} readonly size="sm" showValue={false} />
                      <span className="text-sm text-gray-600">
                        {item.overallRating?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Comparison Table */}
        {selectedItems.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Comparison Results
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                      {selectedItems.map((item) => (
                        <th key={item.Id} className="text-left py-4 px-4 font-semibold text-gray-900">
                          {item.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getComparisonData().map((field) => (
                      <tr key={field.key} className="border-b border-gray-100">
                        <td className="py-4 px-4 font-medium text-gray-700">
                          {field.label}
                        </td>
                        {selectedItems.map((item) => (
                          <td key={item.Id} className="py-4 px-4">
                            {renderComparisonValue(item, field)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Empty State */}
        {selectedItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Empty
              title="Start Your Comparison"
              message="Search and select universities or faculties to compare them side by side."
              icon="BarChart3"
            />
          </motion.div>
        )}
        
        {selectedItems.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Empty
              title="Add More Items to Compare"
              message="Select at least 2 items to see the comparison table."
              icon="Plus"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Compare;