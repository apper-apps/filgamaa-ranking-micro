import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No results found", 
  message = "Try adjusting your search or filters to find what you're looking for.",
  icon = "Search",
  action,
  actionLabel = "Clear Filters",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center min-h-[400px] text-center px-4 ${className}`}
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full blur-xl opacity-60"></div>
        <div className="relative bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-full">
          <ApperIcon name={icon} size={64} className="text-primary-600" />
        </div>
      </div>
      
      <h3 className="text-3xl font-display font-semibold text-gradient mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {message}
      </p>
      
      {action && (
        <Button
          onClick={action}
          className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <ApperIcon name="Filter" size={20} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;