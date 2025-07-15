import { motion } from "framer-motion";

const Loading = ({ type = "cards" }) => {
  const shimmer = {
    hidden: { opacity: 0.4 },
    visible: { opacity: 1 }
  };

  const shimmerTransition = {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  };

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate="visible"
            variants={shimmer}
            transition={{ ...shimmerTransition, delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="space-y-4">
              <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
              </div>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                ))}
              </div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate="visible"
            variants={shimmer}
            transition={{ ...shimmerTransition, delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-3 w-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  ))}
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={shimmer}
        transition={shimmerTransition}
        className="text-center"
      >
        <div className="h-16 w-16 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mx-auto"></div>
      </motion.div>
    </div>
  );
};

export default Loading;