import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center min-h-[400px] text-center px-4 ${className}`}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-error/20 to-warning/20 rounded-full blur-lg"></div>
        <div className="relative bg-white p-6 rounded-full shadow-card">
          <ApperIcon name="AlertCircle" size={48} className="text-error" />
        </div>
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <ApperIcon name="RefreshCw" size={20} className="mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;