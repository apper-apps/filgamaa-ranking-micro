import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";

const ReviewCard = ({ review, className = "" }) => {
  const getAuthorTypeBadge = (type) => {
    switch (type) {
      case "verified":
        return <Badge variant="success" size="sm">Verified Student</Badge>;
      case "registered":
        return <Badge variant="primary" size="sm">Registered User</Badge>;
      case "anonymous":
        return <Badge variant="gray" size="sm">Anonymous</Badge>;
      default:
        return <Badge variant="gray" size="sm">Unknown</Badge>;
    }
  };

  const getAuthorTypeIcon = (type) => {
    switch (type) {
      case "verified":
        return "ShieldCheck";
      case "registered":
        return "User";
      case "anonymous":
        return "UserX";
      default:
        return "User";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
              <ApperIcon 
                name={getAuthorTypeIcon(review.authorType)} 
                size={20} 
                className="text-primary-600" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getAuthorTypeBadge(review.authorType)}
                <span className="text-sm text-gray-500">
                  {format(new Date(review.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              <StarRating 
                rating={review.rating} 
                readonly 
                size="sm" 
                showValue={false}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ApperIcon name="ThumbsUp" size={16} />
            <span>{review.helpfulCount}</span>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">{review.content}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <ApperIcon name="ThumbsUp" size={16} />
              <span>Helpful</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <ApperIcon name="Flag" size={16} />
              <span>Report</span>
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gradient">
              {review.rating}
            </span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewCard;