import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StatsOverview = ({ stats, className = "" }) => {
  const statItems = [
    {
      icon: "GraduationCap",
      label: "Universities",
      value: stats?.universities || 0,
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: "BookOpen",
      label: "Faculties",
      value: stats?.faculties || 0,
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: "MessageSquare",
      label: "Reviews",
      value: stats?.reviews || 0,
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: "Users",
      label: "Students Helped",
      value: stats?.studentsHelped || 0,
      color: "from-purple-500 to-purple-600"
    }
  ];
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  {item.label}
                </p>
                <p className="text-3xl font-bold text-gradient">
                  {formatNumber(item.value)}
                </p>
              </div>
              
              <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                <ApperIcon name={item.icon} size={24} className="text-white" />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;