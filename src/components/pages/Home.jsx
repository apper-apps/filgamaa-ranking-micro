import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import UniversityCard from "@/components/organisms/UniversityCard";
import FacultyCard from "@/components/organisms/FacultyCard";
import ReviewCard from "@/components/molecules/ReviewCard";
import StatsOverview from "@/components/organisms/StatsOverview";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { universityService } from "@/services/api/universityService";
import { facultyService } from "@/services/api/facultyService";
import { reviewService } from "@/services/api/reviewService";

const Home = () => {
  const [featuredUniversities, setFeaturedUniversities] = useState([]);
  const [featuredFaculties, setFeaturedFaculties] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    loadHomeData();
  }, []);
  
  const loadHomeData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const [universities, faculties, reviews] = await Promise.all([
        universityService.getAll(),
        facultyService.getAll(),
        reviewService.getAll()
      ]);
      
      // Get top rated universities
const topUniversities = universities
        .sort((a, b) => b.overall_rating - a.overall_rating)
        .slice(0, 6);
      
      // Get top rated faculties
const topFaculties = faculties
        .sort((a, b) => b.overall_rating - a.overall_rating)
        .slice(0, 6);
      
      // Get recent reviews
const recentReviews = reviews
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);
      
      setFeaturedUniversities(topUniversities);
      setFeaturedFaculties(topFaculties);
      setRecentReviews(recentReviews);
      setStats({
        universities: universities.length,
        faculties: faculties.length,
        reviews: reviews.length,
        studentsHelped: Math.floor(reviews.length * 4.2)
      });
    } catch (err) {
      setError("Failed to load home data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (query) => {
    if (query.trim()) {
      window.location.href = `/universities?search=${encodeURIComponent(query)}`;
    }
  };
  
  if (isLoading) {
    return <Loading type="cards" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadHomeData} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
              Find Your Perfect University
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Navigate Egypt's higher education landscape with confidence. 
              Discover universities, read authentic reviews, and make informed decisions 
              about your academic future.
            </p>
            
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar
                placeholder="Search universities, faculties, or programs..."
                onSearch={handleSearch}
                className="shadow-xl"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-8 py-4">
                <ApperIcon name="GraduationCap" size={20} className="mr-2" />
                Browse Universities
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                <ApperIcon name="BookOpen" size={20} className="mr-2" />
                Explore Faculties
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsOverview stats={stats} />
        </div>
      </section>
      
      {/* Featured Universities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-4">
              Top Rated Universities
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Discover the highest-rated universities in Egypt based on student reviews and academic excellence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredUniversities.map((university, index) => (
              <motion.div
                key={university.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <UniversityCard university={university} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/universities">
              <Button variant="outline" size="lg">
                View All Universities
                <ApperIcon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Faculties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-4">
              Popular Faculties
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Explore the most sought-after faculties with excellent ratings and comprehensive programs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredFaculties.map((faculty, index) => (
              <motion.div
                key={faculty.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FacultyCard faculty={faculty} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/faculties">
              <Button variant="outline" size="lg">
                View All Faculties
                <ApperIcon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Recent Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-4">
              Recent Student Reviews
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Read authentic experiences from students who've been there.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {recentReviews.map((review, index) => (
              <motion.div
                key={review.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
          
          {recentReviews.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="MessageSquare" size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who have found their perfect university through Filgamaa Ranking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/universities">
                <Button variant="white" size="lg">
                  <ApperIcon name="Search" size={20} className="mr-2" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  <ApperIcon name="Info" size={20} className="mr-2" />
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;