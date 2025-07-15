import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StatsOverview from "@/components/organisms/StatsOverview";

const About = () => {
  const features = [
    {
      icon: "Database",
      title: "Comprehensive Directory",
      description: "Complete and up-to-date directory of all universities and faculties across Egypt with detailed information."
    },
    {
      icon: "Star",
      title: "Authentic Reviews",
      description: "1-10 star ratings with detailed reviews from anonymous, registered, and verified students."
    },
    {
      icon: "Search",
      title: "Advanced Search",
      description: "Find universities and faculties by location, fees, ratings, acceptance grades, and more."
    },
    {
      icon: "MapPin",
      title: "Location-Based",
      description: "Discover nearby universities with distance calculations and interactive maps."
    },
    {
      icon: "Shield",
      title: "Verified Information",
      description: "All institutions are verified by our administration team for accuracy and authenticity."
    },
    {
      icon: "BarChart3",
      title: "Smart Comparison",
      description: "Compare universities and faculties side by side to make informed decisions."
    }
  ];
  
  const team = [
    {
      name: "Dr. Ahmed Hassan",
      role: "Educational Advisor",
      image: "/api/placeholder/150/150",
      description: "Former Dean with 20+ years in Egyptian higher education"
    },
    {
      name: "Sarah Mohamed",
      role: "Student Success Manager",
      image: "/api/placeholder/150/150",
      description: "Helping students navigate their academic journey"
    },
    {
      name: "Omar Mahmoud",
      role: "Data Analyst",
      image: "/api/placeholder/150/150",
      description: "Ensuring accuracy of university and faculty data"
    }
  ];
  
  const stats = {
    universities: 45,
    faculties: 380,
    reviews: 12450,
    studentsHelped: 52000
  };
  
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
              About Filgamaa Ranking
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Empowering Egyptian students and parents with the information they need 
              to make informed decisions about higher education.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              To democratize access to higher education information in Egypt by providing 
              a comprehensive, trustworthy platform that helps students and families navigate 
              the complex landscape of universities and faculties.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <div className="aspect-video bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg mb-6 flex items-center justify-center">
                  <ApperIcon name="GraduationCap" size={64} className="text-primary-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Why We Started
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Choosing the right university and faculty is one of the most important decisions 
                  in a student's life. We recognized that Egyptian students and parents needed 
                  a reliable, comprehensive resource to make these crucial decisions with confidence.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <div className="aspect-video bg-gradient-to-r from-accent-100 to-primary-100 rounded-lg mb-6 flex items-center justify-center">
                  <ApperIcon name="Target" size={64} className="text-accent-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the most trusted and comprehensive resource for higher education 
                  information in Egypt, helping every student find their perfect academic path 
                  through data-driven insights and authentic community reviews.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our platform combines comprehensive data with authentic student experiences 
              to provide the most complete picture of Egyptian higher education.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name={feature.icon} size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Numbers that reflect our commitment to helping Egyptian students succeed.
            </p>
          </motion.div>
          
          <StatsOverview stats={stats} />
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Dedicated professionals committed to improving educational outcomes in Egypt.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="User" size={48} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-700">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Simple steps to find your perfect university or faculty.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Search & Filter",
                description: "Use our advanced search to find universities and faculties that match your criteria."
              },
              {
                step: "2",
                title: "Read Reviews",
                description: "Explore authentic reviews from verified students and graduates."
              },
              {
                step: "3",
                title: "Compare Options",
                description: "Compare multiple institutions side by side to make informed decisions."
              },
              {
                step: "4",
                title: "Apply Confidently",
                description: "Make your choice with confidence backed by comprehensive data."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
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
              <Button variant="white" size="lg">
                <ApperIcon name="Search" size={20} className="mr-2" />
                Explore Universities
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                <ApperIcon name="MessageSquare" size={20} className="mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;