import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { AuthContext } from "../../App";

const Header = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Universities", href: "/universities" },
    { name: "Faculties", href: "/faculties" },
    { name: "Compare", href: "/compare" },
    { name: "About", href: "/about" }
  ];
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-secondary-500 p-2 rounded-lg">
                <ApperIcon name="GraduationCap" size={24} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gradient">
                Filgamaa
              </h1>
              <p className="text-xs text-gray-500">Ranking</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors duration-200 relative",
                  isActive(item.href)
                    ? "text-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500"
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block w-80">
              <SearchBar 
                placeholder="Quick search..." 
                onSearch={onSearch}
              />
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm text-gray-700">
                  Welcome, {user?.firstName || user?.name || "User"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:flex"
                >
                  <ApperIcon name="LogOut" size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <ApperIcon name="User" size={16} className="mr-2" />
                Admin
              </Button>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <SearchBar 
            placeholder="Search universities and faculties..." 
            onSearch={onSearch}
          />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <ApperIcon name="LogOut" size={16} className="mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <ApperIcon name="User" size={16} className="mr-2" />
                  Admin Dashboard
                </Button>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;