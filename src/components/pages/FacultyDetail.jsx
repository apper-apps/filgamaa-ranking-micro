import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ReviewCard from "@/components/molecules/ReviewCard";
import ReviewForm from "@/components/organisms/ReviewForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { facultyService } from "@/services/api/facultyService";
import { universityService } from "@/services/api/universityService";
import { reviewService } from "@/services/api/reviewService";

const FacultyDetail = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [university, setUniversity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  useEffect(() => {
    loadFacultyData();
  }, [id]);
  
  const loadFacultyData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
const facultyData = await facultyService.getById(parseInt(id));
      const universityData = await universityService.getById(facultyData.university_id);
      const reviewsData = await reviewService.getByTarget(parseInt(id), "faculty");
      
      setFaculty(facultyData);
      setUniversity(universityData);
      setReviews(reviewsData);
    } catch (err) {
      setError("Failed to load faculty details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReviewSubmit = async (reviewData) => {
    await reviewService.create(reviewData);
    // Reload reviews
    const updatedReviews = await reviewService.getByTarget(parseInt(id), "faculty");
    setReviews(updatedReviews);
    setShowReviewForm(false);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadFacultyData} />;
  }
  
  if (!faculty) {
    return <Error message="Faculty not found" />;
  }
  
  const tabs = [
    { id: "overview", label: "Overview", icon: "Info" },
    { id: "programs", label: "Programs", icon: "BookOpen" },
    { id: "admissions", label: "Admissions", icon: "GraduationCap" },
    { id: "reviews", label: "Reviews", icon: "MessageSquare" }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-4">
                  <Link 
                    to={`/universities/${university?.Id}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-2"
                  >
                    <ApperIcon name="ArrowLeft" size={16} />
                    <span className="text-sm font-semibold">{university?.name}</span>
                  </Link>
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-display font-bold text-gradient mb-2">
                      {faculty.name}
                    </h1>
                    {faculty.nameAr && (
                      <p className="text-xl text-gray-600 mb-4">{faculty.nameAr}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
{faculty.naqaaee_accreditation && (
                      <Badge variant="success">
                        <ApperIcon name="Award" size={16} className="mr-1" />
                        NAQAAEE
                      </Badge>
                    )}
                    {faculty.has_postgraduate && (
                      <Badge variant="primary">
                        <ApperIcon name="GraduationCap" size={16} className="mr-1" />
                        Postgraduate
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
<StarRating
                      rating={faculty.overall_rating}
                      readonly
                      size="lg"
                      showValue={false}
                    />
                    <span className="text-3xl font-bold text-gradient">
                      {faculty.overall_rating?.toFixed(1) || "N/A"}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Based on {faculty.total_reviews || 0} reviews
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="DollarSign" size={20} className="text-white" />
                    </div>
                    <div>
<p className="text-sm text-gray-600">Annual Fees</p>
                      <p className="font-semibold">{formatCurrency(faculty.annual_fees_egp)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="TrendingUp" size={20} className="text-white" />
                    </div>
                    <div>
<p className="text-sm text-gray-600">Min Grade</p>
                      <p className="font-semibold">{faculty.acceptance_grades?.thanaweya}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Calendar" size={20} className="text-white" />
                    </div>
                    <div>
<p className="text-sm text-gray-600">Since</p>
                      <p className="font-semibold">{faculty.year_commenced}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80">
                <div className="aspect-video bg-gradient-to-r from-accent-100 to-primary-100 rounded-xl overflow-hidden mb-4">
                  {faculty.images && faculty.images.length > 0 ? (
                    <img
                      src={faculty.images[0]}
                      alt={faculty.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ApperIcon name="BookOpen" size={64} className="text-accent-600" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full"
                  >
                    <ApperIcon name="Edit" size={20} className="mr-2" />
                    Write a Review
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="w-full">
                      <ApperIcon name="Heart" size={16} className="mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <ApperIcon name="Share" size={16} className="mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <ApperIcon name={tab.icon} size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === "overview" && (
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                About {faculty.name}
              </h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {faculty.description || "No description available for this faculty."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">University</span>
                      <Link 
                        to={`/universities/${university?.Id}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        {university?.name}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
<span className="text-gray-600">Year Commenced</span>
                      <span className="font-semibold">{faculty.year_commenced}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
<span className="text-gray-600">Annual Fees</span>
                      <span className="font-semibold">{formatCurrency(faculty.annual_fees_egp)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
<span className="text-gray-600">NAQAAEE Accreditation</span>
                      <span className={`font-semibold ${faculty.naqaaee_accreditation ? "text-success" : "text-gray-500"}`}>
                        {faculty.naqaaee_accreditation ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
<span className="text-gray-600">Postgraduate Programs</span>
                      <span className={`font-semibold ${faculty.has_postgraduate ? "text-success" : "text-gray-500"}`}>
                        {faculty.has_postgraduate ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg border-2 border-dashed border-primary-200 flex items-center justify-center">
                      <div className="text-center">
                        <ApperIcon name="MapPin" size={32} className="text-primary-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Map location</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      {faculty.location?.address || university?.location?.address || "Location not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {activeTab === "programs" && (
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Programs Offered
              </h2>
              
              {faculty.programs && faculty.programs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faculty.programs.map((program, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <ApperIcon name="BookOpen" size={16} className="text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">{program}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty
                  title="No programs listed"
                  message="Program information is not available for this faculty."
                  icon="BookOpen"
                />
              )}
              
{faculty.has_postgraduate && (
                <div className="mt-8 p-6 bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200">
                  <div className="flex items-center gap-3 mb-3">
                    <ApperIcon name="GraduationCap" size={24} className="text-accent-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Postgraduate Programs Available
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    This faculty offers postgraduate programs including Master's and PhD degrees. 
                    Contact the faculty directly for specific program details and admission requirements.
                  </p>
                </div>
              )}
            </Card>
          )}
          
          {activeTab === "admissions" && (
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Admission Requirements
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimum Acceptance Grades</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200">
                      <div className="text-center">
                        <ApperIcon name="FileText" size={32} className="text-primary-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Thanaweya Amma</h4>
<p className="text-3xl font-bold text-primary-600">
                          {faculty.acceptance_grades?.thanaweya || "N/A"}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg border border-secondary-200">
                      <div className="text-center">
                        <ApperIcon name="Award" size={32} className="text-secondary-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Equivalent Certificates</h4>
<p className="text-3xl font-bold text-secondary-600">
                          {faculty.acceptance_grades?.equivalent || "N/A"}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border border-accent-200">
                      <div className="text-center">
                        <ApperIcon name="Globe" size={32} className="text-accent-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">Foreign Students</h4>
<p className="text-3xl font-bold text-accent-600">
                          {faculty.acceptance_grades?.foreign || "N/A"}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Structure</h3>
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="text-center">
                      <ApperIcon name="DollarSign" size={48} className="text-gray-600 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Annual Tuition Fees</h4>
<p className="text-4xl font-bold text-gradient">
                        {formatCurrency(faculty.annual_fees_egp)}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Per academic year
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <ApperIcon name="Info" size={20} className="text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">
                          Admission requirements may vary by program and academic year. 
                          Please contact the faculty directly for the most current information.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <ApperIcon name="AlertTriangle" size={20} className="text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-900">
                          Additional requirements such as entrance exams, interviews, or portfolio submissions may apply.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <ApperIcon name="CheckCircle" size={20} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-green-900">
                          Scholarships and financial aid may be available. Contact the university's financial aid office for details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  Reviews ({reviews.length})
                </h2>
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="Edit" size={16} />
                  Write Review
                </Button>
              </div>
              
              {showReviewForm && (
                <div className="mb-8">
                  <ReviewForm
                    targetId={parseInt(id)}
                    targetType="faculty"
                    onSubmit={handleReviewSubmit}
                  />
                </div>
              )}
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.Id} review={review} />
                  ))}
                </div>
              ) : (
                <Empty
                  title="No reviews yet"
                  message="Be the first to share your experience with this faculty!"
                  icon="MessageSquare"
                  action={() => setShowReviewForm(true)}
                  actionLabel="Write First Review"
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyDetail;