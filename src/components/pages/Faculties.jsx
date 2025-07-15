import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import FilterPanel from "@/components/molecules/FilterPanel";
import FacultyCard from "@/components/organisms/FacultyCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { facultyService } from "@/services/api/facultyService";
import { universityService } from "@/services/api/universityService";

const Faculties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [faculties, setFaculties] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    loadFaculties();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [faculties, searchQuery, filters]);
  
  const loadFaculties = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const [facultiesData, universitiesData] = await Promise.all([
        facultyService.getAll(),
        universityService.getAll()
      ]);
      
      setFaculties(facultiesData);
      setUniversities(universitiesData);
    } catch (err) {
      setError("Failed to load faculties. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...faculties];
    
    // Search filter
if (searchQuery) {
      filtered = filtered.filter(faculty =>
        faculty.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.programs?.some(program => 
          program.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Rating filter
if (filters.minRating) {
      filtered = filtered.filter(faculty =>
        faculty.overall_rating >= parseFloat(filters.minRating)
      );
    }
    
    // Fees filter
if (filters.maxFees) {
      filtered = filtered.filter(faculty =>
        faculty.annual_fees_egp <= parseFloat(filters.maxFees)
      );
    }
    
    // Grade filters
if (filters.minGrade) {
      filtered = filtered.filter(faculty =>
        faculty.acceptance_grades?.thanaweya >= parseFloat(filters.minGrade)
      );
    }
    
if (filters.maxGrade) {
      filtered = filtered.filter(faculty =>
        faculty.acceptance_grades?.thanaweya <= parseFloat(filters.maxGrade)
      );
    }
    
    // Postgraduate filter
if (filters.hasPostgraduate) {
      filtered = filtered.filter(faculty => faculty.has_postgraduate);
    }
    
    // Accreditation filter
if (filters.accredited) {
      filtered = filtered.filter(faculty => faculty.naqaaee_accreditation);
    }
    
    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
case "rating":
          filtered.sort((a, b) => b.overall_rating - a.overall_rating);
          break;
        case "fees":
filtered.sort((a, b) => a.annual_fees_egp - b.annual_fees_egp);
          break;
        case "grades":
filtered.sort((a, b) => (a.acceptance_grades?.thanaweya || 0) - (b.acceptance_grades?.thanaweya || 0));
          break;
        case "name":
filtered.sort((a, b) => a.Name.localeCompare(b.Name));
          break;
        default:
          break;
      }
    }
    
    setFilteredFaculties(filtered);
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
  
const getFacultyUniversity = (facultyId) => {
    const faculty = faculties.find(f => f.Id === facultyId);
    return universities.find(u => u.Id === faculty?.university_id);
  };
  
  if (isLoading) {
    return <Loading type="cards" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadFaculties} />;
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
            Egyptian Faculties
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore faculties and programs across Egypt. Compare fees, requirements, and ratings to find your perfect match.
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
            placeholder="Search faculties by name, program, or field..."
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
            <span className="text-sm text-gray-600">
              {filteredFaculties.length} of {faculties.length} faculties
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
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClear={handleClearFilters}
              />
            </div>
          </motion.div>
          
          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {filteredFaculties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFaculties.map((faculty, index) => (
                  <motion.div
                    key={faculty.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <FacultyCard
                      faculty={faculty}
                      university={getFacultyUniversity(faculty.Id)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <Empty
                title="No faculties found"
                message="Try adjusting your search terms or filters to find faculties that match your criteria."
                icon="BookOpen"
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

export default Faculties;