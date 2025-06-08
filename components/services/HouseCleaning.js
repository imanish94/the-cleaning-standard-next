import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaHome, FaBath, FaUtensils, FaCouch, FaDog } from "react-icons/fa";

const HouseCleaning = ({ formData, setFormData, errors }) => {
  const handlePropertySizeChange = (area, value) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        [area]: value
      }
    });
  };

  return (
    <div className="space-y-6">
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
              onClick={() => handlePropertySizeChange('bedrooms', Math.max(0, formData.propertySize.bedrooms - 1))}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </motion.button>
            <span className="w-12 text-center font-semibold text-gray-800">{formData.propertySize.bedrooms}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('bedrooms', formData.propertySize.bedrooms + 1)}
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
              onClick={() => handlePropertySizeChange('bathrooms', Math.max(0, formData.propertySize.bathrooms - 1))}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </motion.button>
            <span className="w-12 text-center font-semibold text-gray-800">{formData.propertySize.bathrooms}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('bathrooms', formData.propertySize.bathrooms + 1)}
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
              onClick={() => handlePropertySizeChange('kitchen', formData.propertySize.kitchen === 1 ? 0 : 1)}
              className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
                formData.propertySize.kitchen === 1 
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
              onClick={() => handlePropertySizeChange('livingRoom', formData.propertySize.livingRoom === 1 ? 0 : 1)}
              className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
                formData.propertySize.livingRoom === 1 
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
              onClick={() => handlePropertySizeChange('otherAreas', Math.max(0, formData.propertySize.otherAreas - 1))}
              className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FaMinus className="w-4 h-4" />
            </motion.button>
            <span className="w-12 text-center font-semibold text-gray-800">{formData.propertySize.otherAreas}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePropertySizeChange('otherAreas', formData.propertySize.otherAreas + 1)}
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
              onClick={() => handlePropertySizeChange('pets', formData.propertySize.pets === 1 ? 0 : 1)}
              className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
                formData.propertySize.pets === 1 
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
          value={formData.specificRequests || ''}
          onChange={(e) => setFormData({ ...formData, specificRequests: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Any specific areas you'd like us to focus on?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default HouseCleaning; 