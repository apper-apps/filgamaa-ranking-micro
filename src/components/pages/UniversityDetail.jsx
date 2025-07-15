import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FacultyCard from "@/components/organisms/FacultyCard";
import ReviewCard from "@/components/molecules/ReviewCard";
import ReviewForm from "@/components/organisms/ReviewForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { universityService } from "@/services/api/universityService";
import { facultyService } from "@/services/api/facultyService";
import { reviewService } from "@/services/api/reviewService";

const UniversityDetail = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  useEffect(() => {
    loadUniversityData();
  }, [id]);
  
  const loadUniversityData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const [universityData, facultiesData, reviewsData] = await Promise.all([
        universityService.getById(parseInt(id)),
        facultyService.getByUniversityId(parseInt(id)),
        reviewService.getByTarget(parseInt(id), "university")
      ]);
      
      setUniversity(universityData);
      setFaculties(facultiesData);
      setReviews(reviewsData);
    } catch (err) {
      setError("Failed to load university details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReviewSubmit = async (reviewData) => {
    await reviewService.create(reviewData);
    // Reload reviews
    const updatedReviews = await reviewService.getByTarget(parseInt(id), "university");
    setReviews(updatedReviews);
    setShowReviewForm(false);
  };
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadUniversityData} />;
  }
  
  if (!university) {
    return <Error message="University not found" />;
  }
  
  const tabs = [
    { id: "overview", label: "Overview", icon: "Info" },
    { id: "faculties", label: "Faculties", icon: "BookOpen" },
    { id: "reviews", label: "Reviews", icon: "MessageSquare" },
    { id: "location", label: "Location", icon: "MapPin" }
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
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-display font-bold text-gradient mb-2">
                      {university.name}
                    </h1>
                    {university.nameAr && (
                      <p className="text-xl text-gray-600 mb-4">{university.nameAr}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {university.verificationStatus && (
                      <Badge variant="success">
                        <ApperIcon name="ShieldCheck" size={16} className="mr-1" />
                        Verified
                      </Badge>
                    )}
                    {university.accreditationStatus && (
                      <Badge variant="primary">
                        <ApperIcon name="Award" size={16} className="mr-1" />
                        Accredited
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <StarRating
                      rating={university.overallRating}
                      readonly
                      size="lg"
                      showValue={false}
                    />
                    <span className="text-3xl font-bold text-gradient">
                      {university.overallRating?.toFixed(1) || "N/A"}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Based on {university.totalReviews || 0} reviews
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Calendar" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Established</p>
                      <p className="font-semibold">{university.yearEstablished}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="BookOpen" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Faculties</p>
                      <p className="font-semibold">{faculties.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="MapPin" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{university.location?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80">
                <div className="aspect-video bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl overflow-hidden mb-4">
                  {university.images && university.images.length > 0 ? (
                    <img
                      src={university.images[0]}
                      alt={university.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ApperIcon name="GraduationCap" size={64} className="text-primary-600" />
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
                About {university.name}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {university.description || "No description available for this university."}
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {university.contactInfo?.phone && (
                      <div className="flex items-center gap-3">
                        <ApperIcon name="Phone" size={20} className="text-gray-600" />
                        <span>{university.contactInfo.phone}</span>
                      </div>
                    )}
                    {university.contactInfo?.email && (
                      <div className="flex items-center gap-3">
                        <ApperIcon name="Mail" size={20} className="text-gray-600" />
                        <span>{university.contactInfo.email}</span>
                      </div>
                    )}
                    {university.contactInfo?.website && (
                      <div className="flex items-center gap-3">
                        <ApperIcon name="Globe" size={20} className="text-gray-600" />
                        <a 
                          href={university.contactInfo.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
                  <div className="flex items-center gap-4">
                    {university.socialMedia?.facebook && (
                      <a
                        href={university.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ApperIcon name="Facebook" size={24} />
                      </a>
                    )}
                    {university.socialMedia?.twitter && (
                      <a
                        href={university.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <ApperIcon name="Twitter" size={24} />
                      </a>
                    )}
                    {university.socialMedia?.linkedin && (
                      <a
                        href={university.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800 hover:text-blue-900"
                      >
                        <ApperIcon name="Linkedin" size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {activeTab === "faculties" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  Faculties ({faculties.length})
                </h2>
                <Link to="/faculties">
                  <Button variant="outline">
                    View All Faculties
                    <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
              
              {faculties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {faculties.map((faculty) => (
                    <FacultyCard
                      key={faculty.Id}
                      faculty={faculty}
                      university={university}
                    />
                  ))}
                </div>
              ) : (
                <Empty
                  title="No faculties found"
                  message="This university doesn't have any faculties listed yet."
                  icon="BookOpen"
                />
              )}
            </div>
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
                    targetType="university"
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
                  message="Be the first to share your experience with this university!"
                  icon="MessageSquare"
                  action={() => setShowReviewForm(true)}
                  actionLabel="Write First Review"
                />
              )}
            </div>
          )}
          
          {activeTab === "location" && (
            <Card>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Location & Directions
              </h2>
              
              <div className="space-y-6">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg border-2 border-dashed border-primary-200 flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="MapPin" size={48} className="text-primary-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map will be displayed here</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {university.location?.address}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Address</h3>
                    <p className="text-gray-700">{university.location?.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Directions</h3>
                    <Button variant="outline" className="w-full">
                      <ApperIcon name="Navigation" size={16} className="mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UniversityDetail;