import { motion } from "framer-motion";
import { FaBroom, FaWindowMaximize, FaFire, FaSnowflake, FaExclamationTriangle, FaPlus, FaExclamationCircle } from "react-icons/fa";

const DeepCleaning = ({ formData, setFormData, errors }) => {
  const focusAreas = [
    { id: 'kitchen', name: 'Kitchen', icon: FaFire },
    { id: 'bathrooms', name: 'Bathrooms', icon: FaBroom },
    { id: 'carpets', name: 'Carpets', icon: FaBroom },
    { id: 'windows', name: 'Windows', icon: FaWindowMaximize },
    { id: 'appliances', name: 'Appliances', icon: FaSnowflake }
  ];

  const clutterLevels = [
    { id: 'light', name: 'Light' },
    { id: 'moderate', name: 'Moderate' },
    { id: 'heavy', name: 'Heavy' }
  ];

  const propertySizes = [
    { id: 'small', name: 'Small (1-2 bedrooms)' },
    { id: 'medium', name: 'Medium (3-4 bedrooms)' },
    { id: 'large', name: 'Large (5+ bedrooms)' }
  ];

  const handleFocusAreaToggle = (areaId) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        focusAreas: formData.propertySize?.focusAreas?.includes(areaId)
          ? formData.propertySize.focusAreas.filter(id => id !== areaId)
          : [...(formData.propertySize?.focusAreas || []), areaId]
      }
    });
  };

  const handleClutterLevelChange = (level) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        clutterLevel: level
      }
    });
  };

  const handlePropertySizeChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        propertySize: value
      }
    });
  };

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

      {/* Focus Areas */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Areas to Focus On</h3>
        <div className="grid gap-3">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <motion.label
                key={area.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={(formData.propertySize?.focusAreas || []).includes(area.id)}
                  onChange={() => handleFocusAreaToggle(area.id)}
                  className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
                />
                <div className="flex items-center gap-3 ml-3">
                  <Icon className="w-5 h-5 text-SecondaryColor-0" />
                  <span className="text-gray-700">{area.name}</span>
                </div>
              </motion.label>
            );
          })}
        </div>
      </div>

      {/* Clutter Level */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Level of Clutter</h3>
        <div className="grid grid-cols-3 gap-3">
          {clutterLevels.map((level) => (
            <motion.button
              key={level.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClutterLevelChange(level.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.propertySize?.clutterLevel === level.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {level.name}
            </motion.button>
          ))}
        </div>
        {errors.propertySize && (
          <div className="mt-2 text-red-500 text-sm">
            {errors.propertySize}
          </div>
        )}
      </div>

      {/* Mold/Mildew Concerns */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Mold/Mildew Concerns</h3>
        </div>
        <textarea
          value={formData.propertySize?.moldConcerns || ''}
          onChange={(e) => setFormData({
            ...formData,
            propertySize: {
              ...formData.propertySize,
              moldConcerns: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Please describe any mold or mildew concerns..."
          rows="3"
        />
      </div>

      {/* Post-Construction Cleaning */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Post-Construction Cleaning Needed</h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({
                ...formData,
                propertySize: {
                  ...formData.propertySize,
                  postConstruction: 'yes'
                }
              })}
              className={`px-4 py-2 rounded-lg text-center transition-colors ${
                formData.propertySize?.postConstruction === 'yes'
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Yes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({
                ...formData,
                propertySize: {
                  ...formData.propertySize,
                  postConstruction: 'no'
                }
              })}
              className={`px-4 py-2 rounded-lg text-center transition-colors ${
                formData.propertySize?.postConstruction === 'no'
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              No
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepCleaning; 