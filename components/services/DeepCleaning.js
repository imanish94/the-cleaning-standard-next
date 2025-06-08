import { motion } from "framer-motion";
import { FaBroom, FaWindowMaximize, FaFire, FaSnowflake, FaExclamationTriangle, FaPlus } from "react-icons/fa";

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

  const handleFocusAreaToggle = (areaId) => {
    const currentAreas = formData.focusAreas || [];
    const newAreas = currentAreas.includes(areaId)
      ? currentAreas.filter(id => id !== areaId)
      : [...currentAreas, areaId];
    
    setFormData({
      ...formData,
      focusAreas: newAreas
    });
  };

  const handleClutterLevelChange = (level) => {
    setFormData({
      ...formData,
      clutterLevel: level
    });
  };

  return (
    <div className="space-y-6">
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
                  checked={(formData.focusAreas || []).includes(area.id)}
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
                formData.clutterLevel === level.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {level.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mold/Mildew Concerns */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Mold/Mildew Concerns</h3>
        </div>
        <textarea
          value={formData.moldConcerns || ''}
          onChange={(e) => setFormData({ ...formData, moldConcerns: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Please describe any mold or mildew concerns..."
          rows="3"
        />
      </div>

      {/* Post-Construction Cleaning */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Post-Construction Cleaning Needed</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFormData({ 
              ...formData, 
              postConstruction: !formData.postConstruction 
            })}
            className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${
              formData.postConstruction 
                ? 'bg-SecondaryColor-0 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaPlus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="block mb-2 font-medium text-gray-700">Additional Notes</label>
        <textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Any other specific requirements or concerns?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default DeepCleaning; 