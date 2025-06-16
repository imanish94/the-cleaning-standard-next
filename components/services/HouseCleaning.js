import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaHome, FaBath, FaUtensils, FaCouch, FaDog, FaExclamationCircle } from "react-icons/fa";
import React from "react";

const HouseCleaning = ({ formData, setFormData, errors }) => {

  const handlePropertySizeChange = (fieldOrEvent, value) => {
    // If first argument is an event object (from input field)
    if (fieldOrEvent?.target) {
      value = fieldOrEvent.target.value;
      fieldOrEvent = 'propertySize';
    }

    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        [fieldOrEvent]: value
      }
    });
  };

  // Initialize additionalSpaces if it doesn't exist
  React.useEffect(() => {
    if (formData.propertySize?.additionalSpaces === undefined) {
      handlePropertySizeChange('additionalSpaces', 0);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Property Size */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Property Size (sq ft)</h3>
        <div className="relative">
          <input
            type="number"
            value={formData.propertySize?.propertySize || ''}
            onChange={handlePropertySizeChange}
            className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter property size in square feet"
            min="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">sq ft</span>
        </div>
        {errors.propertySize && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <FaExclamationCircle />
            <span>{errors.propertySize}</span>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {/* Bedrooms */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaHome className="w-5 h-5 text-SecondaryColor-0" />
            <span className="font-medium text-gray-700">Bedrooms</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('bedrooms', Math.max(0, (formData.propertySize?.bedrooms || 0) - 1))}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </motion.button>
            <span className="w-12 text-center font-semibold text-gray-800">{formData.propertySize?.bedrooms || 0}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('bedrooms', (formData.propertySize?.bedrooms || 0) + 1)}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaBath className="w-5 h-5 text-SecondaryColor-0" />
            <span className="font-medium text-gray-700">Bathrooms</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('bathrooms', Math.max(0, (formData.propertySize?.bathrooms || 0) - 1))}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </motion.button>
            <span className="w-12 text-center font-semibold text-gray-800">{formData.propertySize?.bathrooms || 0}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('bathrooms', (formData.propertySize?.bathrooms || 0) + 1)}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Kitchen */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaUtensils className="w-5 h-5 text-SecondaryColor-0" />
            <span className="font-medium text-gray-700">Kitchen Included</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('kitchen', !formData.propertySize?.kitchen)}
              className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
                formData.propertySize?.kitchen 
                  ? 'bg-SecondaryColor-0 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Living/Dining Areas */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaCouch className="w-5 h-5 text-SecondaryColor-0" />
            <span className="font-medium text-gray-700">Living/Dining Areas</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('livingRoom', !formData.propertySize?.livingRoom)}
              className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
                formData.propertySize?.livingRoom 
                  ? 'bg-SecondaryColor-0 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Additional Spaces */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaHome className="w-5 h-5 text-SecondaryColor-0" />
            <span className="font-medium text-gray-700">Additional Spaces</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('additionalSpaces', Math.max(0, (formData.propertySize?.additionalSpaces || 0) - 1))}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </motion.button>
            <span className="w-12 text-center font-semibold text-gray-800">{formData.propertySize?.additionalSpaces || 0}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('additionalSpaces', (formData.propertySize?.additionalSpaces || 0) + 1)}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Pets */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaDog className="w-5 h-5 text-SecondaryColor-0" />
            <span className="font-medium text-gray-700">Pets in the Home</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('pets', !formData.propertySize?.pets)}
              className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
                formData.propertySize?.pets 
                  ? 'bg-SecondaryColor-0 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Specific Requests */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="block mb-2 font-medium text-gray-700">Specific Requests</label>
        <textarea
          value={formData.propertySize?.specificRequests || ''}
          onChange={(e) => handlePropertySizeChange('specificRequests', e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Any specific areas you'd like us to focus on?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default HouseCleaning; 