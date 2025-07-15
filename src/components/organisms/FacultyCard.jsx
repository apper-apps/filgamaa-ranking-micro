import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

const FacultyCard = ({ faculty, university, className = "" }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card hover className="overflow-hidden">
        <Link to={`/faculties/${faculty.Id}`}>
          <div className="aspect-video bg-gradient-to-r from-accent-100 to-primary-100 rounded-lg mb-4 overflow-hidden">
            {faculty.images && faculty.images.length > 0 ? (
              <img 
                src={faculty.images[0]} 
                alt={faculty.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ApperIcon name="BookOpen" size={48} className="text-accent-600" />
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-display font-semibold text-gray-900 line-clamp-2">
                {faculty.name}
              </h3>
              {faculty.naqaaeeAccreditation && (
                <Badge variant="success" size="sm">
                  <ApperIcon name="Award" size={12} className="mr-1" />
                  NAQAAEE
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <StarRating 
                rating={faculty.overallRating} 
                readonly 
                size="sm" 
                showValue={false}
              />
              <span className="text-sm text-gray-600">
                ({faculty.totalReviews} reviews)
              </span>
            </div>
            
            {university && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="GraduationCap" size={16} />
                <span>{university.name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="DollarSign" size={16} />
              <span>{formatCurrency(faculty.annualFeesEGP)}/year</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="TrendingUp" size={16} />
              <span>Min grade: {faculty.acceptanceGrades?.thanaweya}%</span>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <ApperIcon name="BookOpen" size={16} />
                  <span>{faculty.programs?.length || 0} Programs</span>
                </div>
                
                {faculty.hasPostgraduate && (
                  <Badge variant="primary" size="sm">
                    Postgrad
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-gradient">
                  {faculty.overallRating?.toFixed(1) || "N/A"}
                </span>
                <span className="text-sm text-gray-500">/10</span>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default FacultyCard;