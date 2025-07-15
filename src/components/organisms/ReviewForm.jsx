import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StarRating from "@/components/molecules/StarRating";

const ReviewForm = ({ targetId, targetType, onSubmit, className = "" }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    content: "",
    authorType: "anonymous"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const authorTypeOptions = [
    { value: "anonymous", label: "Submit Anonymously" },
    { value: "registered", label: "Submit as Registered User" },
    { value: "verified", label: "Submit as Verified Student" }
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error("Please write a review");
      return;
    }
    
    if (formData.content.length > 500) {
      toast.error("Review must be 500 characters or less");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const reviewData = {
        ...formData,
        targetId,
        targetType,
        createdAt: new Date().toISOString(),
        status: "pending",
        helpfulCount: 0
      };
      
      await onSubmit(reviewData);
      
      // Reset form
      setFormData({
        rating: 0,
        content: "",
        authorType: "anonymous"
      });
      
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Write a Review
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => handleInputChange("rating", rating)}
                  size="lg"
                  showValue={false}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Review Type
                </label>
                <Select
                  value={formData.authorType}
                  onChange={(e) => handleInputChange("authorType", e.target.value)}
                  options={authorTypeOptions}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Share your experience with other students..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={5}
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {formData.content.length}/500 characters
                  </span>
                  {formData.content.length > 400 && (
                    <span className="text-sm text-warning">
                      {500 - formData.content.length} characters remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Shield" size={16} />
              <span>Your review will be moderated before publishing</span>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting || formData.rating === 0}
              className="px-8"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <ApperIcon name="Send" size={16} className="mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ReviewForm;