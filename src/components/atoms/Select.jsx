import React, { useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className, 
  label,
  error,
  helperText,
  options = [],
  placeholder = "Select option...",
  value,
  onChange,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none";
  
  const errorClasses = error ? "border-error focus:ring-error" : "";
  
  // Defensive programming: Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  // Safe change handler with null checks
  const handleChange = useCallback((e) => {
    try {
      if (e && e.target && typeof e.target.value !== 'undefined') {
        if (onChange && typeof onChange === 'function') {
          onChange(e);
        }
      }
    } catch (error) {
      console.warn('Select onChange error:', error);
    }
  }, [onChange]);
  
  // Ensure ref is properly handled
  const safeRef = useCallback((node) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object') {
        ref.current = node;
      }
    }
  }, [ref]);
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={safeRef}
          className={cn(baseClasses, errorClasses, className)}
          value={value || ""}
          onChange={handleChange}
          {...props}
        >
          <option value="">{placeholder || "Select option..."}</option>
          {safeOptions.map((option, index) => {
            // Defensive programming: Handle various option formats
            const optionValue = option?.value ?? option ?? "";
            const optionLabel = option?.label ?? option?.name ?? option?.text ?? optionValue;
            const optionKey = option?.key ?? option?.id ?? optionValue ?? index;
            
            return (
              <option key={optionKey} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={20} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;