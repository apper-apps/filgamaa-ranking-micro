import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

const UniversityCard = ({ university, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card hover className="overflow-hidden">
        <Link to={`/universities/${university.Id}`}>
          <div className="aspect-video bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg mb-4 overflow-hidden">
            {university.images && university.images.length > 0 ? (
              <img 
                src={university.images[0]} 
                alt={university.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ApperIcon name="GraduationCap" size={48} className="text-primary-600" />
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-display font-semibold text-gray-900 line-clamp-2">
                {university.name}
              </h3>
              {university.verificationStatus && (
                <Badge variant="success" size="sm">
                  <ApperIcon name="ShieldCheck" size={12} className="mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <StarRating 
                rating={university.overallRating} 
                readonly 
                size="sm" 
                showValue={false}
              />
              <span className="text-sm text-gray-600">
                ({university.totalReviews} reviews)
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="MapPin" size={16} />
              <span>{university.location?.address}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Calendar" size={16} />
              <span>Est. {university.yearEstablished}</span>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <ApperIcon name="Building" size={16} />
                  <span>{university.facultyCount || 0} Faculties</span>
                </div>
                
                {university.accreditationStatus && (
                  <Badge variant="primary" size="sm">
                    Accredited
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-gradient">
                  {university.overallRating?.toFixed(1) || "N/A"}
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

export default UniversityCard;