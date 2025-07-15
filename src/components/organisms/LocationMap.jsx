import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const LocationMap = ({ locations = [], onLocationSelect, className = "" }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  
  const getUserLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setIsLocating(false);
    }
  };
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };
  
  const getLocationDistance = (location) => {
    if (!userLocation || !location.lat || !location.lng) return null;
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      location.lat,
      location.lng
    );
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };
  
  return (
    <Card className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-gray-900">
            Location Map
          </h3>
          
          <Button
            onClick={getUserLocation}
            disabled={isLocating}
            variant="outline"
            size="sm"
          >
            {isLocating ? (
              <>
                <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                Locating...
              </>
            ) : (
              <>
                <ApperIcon name="MapPin" size={16} className="mr-2" />
                Find Me
              </>
            )}
          </Button>
        </div>
        
        {/* Map Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border-2 border-dashed border-primary-200 flex items-center justify-center">
          <div className="text-center">
            <ApperIcon name="Map" size={48} className="text-primary-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive map will be displayed here</p>
            <p className="text-sm text-gray-500 mt-1">
              Showing {locations.length} locations
            </p>
          </div>
        </div>
        
        {/* Location List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedLocation(location);
                onLocationSelect?.(location);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="GraduationCap" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>
              </div>
              
              <div className="text-right">
                {getLocationDistance(location) && (
                  <p className="text-sm font-semibold text-primary-600">
                    {getLocationDistance(location)}
                  </p>
                )}
                <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {locations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="MapPin" size={32} className="mx-auto mb-2 text-gray-400" />
            <p>No locations to display</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LocationMap;