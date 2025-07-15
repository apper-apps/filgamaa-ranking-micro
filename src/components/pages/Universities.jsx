import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import FilterPanel from "@/components/molecules/FilterPanel";
import UniversityCard from "@/components/organisms/UniversityCard";
import LocationMap from "@/components/organisms/LocationMap";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { universityService } from "@/services/api/universityService";

const Universities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    loadUniversities();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [universities, searchQuery, filters]);
  
  const loadUniversities = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const data = await universityService.getAll();
      setUniversities(data);
    } catch (err) {
      setError("Failed to load universities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...universities];
    
    // Search filter
    if (searchQuery) {
filtered = filtered.filter(uni =>
        uni.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Location filter
    if (filters.location) {
      filtered = filtered.filter(uni =>
        uni.location?.address?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Rating filter
if (filters.minRating) {
      filtered = filtered.filter(uni =>
        uni.overall_rating >= parseFloat(filters.minRating)
      );
    }
    
    // Accreditation filter
if (filters.accredited) {
      filtered = filtered.filter(uni => uni.accreditation_status);
    }
    
    // Verification filter
if (filters.verified) {
      filtered = filtered.filter(uni => uni.verification_status);
    }
    
    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
case "rating":
          filtered.sort((a, b) => b.overall_rating - a.overall_rating);
          break;
        case "name":
          filtered.sort((a, b) => a.Name.localeCompare(b.Name));
          break;
        case "year":
          filtered.sort((a, b) => b.year_established - a.year_established);
          break;
        default:
          break;
      }
    }
    
    setFilteredUniversities(filtered);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams(query ? { search: query } : {});
  };
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setSearchParams({});
  };
  
  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
  };
  
  if (isLoading) {
    return <Loading type="cards" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadUniversities} />;
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
            Egyptian Universities
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover and compare universities across Egypt. Find the perfect institution for your academic journey.
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchBar
            placeholder="Search universities by name, location, or program..."
            onSearch={handleSearch}
            showFilters={true}
            onFiltersToggle={() => setShowFilters(!showFilters)}
            className="shadow-lg"
          />
        </motion.div>
        
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant={showMap ? "primary" : "outline"}
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Map" size={20} />
              {showMap ? "Hide Map" : "Show Map"}
            </Button>
            
            <span className="text-sm text-gray-600">
              {filteredUniversities.length} of {universities.length} universities
            </span>
          </div>
          
          {(searchQuery || Object.keys(filters).length > 0) && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="flex items-center gap-2"
            >
              <ApperIcon name="X" size={16} />
              Clear All
            </Button>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="sticky top-24 space-y-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClear={handleClearFilters}
              />
              
{showMap && (
                <LocationMap
                  locations={filteredUniversities.map(uni => ({
                    ...uni.location,
                    name: uni.Name,
                    id: uni.Id
                  }))}
                  onLocationSelect={handleLocationSelect}
                />
              )}
            </div>
          </motion.div>
          
          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {filteredUniversities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUniversities.map((university, index) => (
                  <motion.div
                    key={university.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <UniversityCard university={university} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <Empty
                title="No universities found"
                message="Try adjusting your search terms or filters to find universities that match your criteria."
                icon="GraduationCap"
                action={handleClearFilters}
                actionLabel="Clear Filters"
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Universities;