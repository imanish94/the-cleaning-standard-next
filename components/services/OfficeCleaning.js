import { motion } from "framer-motion";
import { FaBuilding, FaDesktop, FaRestroom, FaCoffee, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

const OfficeCleaning = ({ formData, setFormData, errors }) => {
  const frequencies = [
    { id: 'one-time', name: 'One-time' },
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' }
  ];

  const commonAreas = [
    { id: 'kitchen', name: 'Kitchen/Break Room' },
    { id: 'meeting', name: 'Meeting Rooms' },
    { id: 'reception', name: 'Reception Area' }
  ];

  const handleFrequencyChange = (frequency) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        frequency: frequency
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

  const handleCommonAreaChange = (areaName) => {
    const currentAreas = formData.propertySize?.commonAreas || [];
    const newAreas = currentAreas.includes(areaName)
      ? currentAreas.filter(area => area !== areaName)
      : [...currentAreas, areaName];

    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        commonAreas: newAreas
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Property Size */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Office Size (sq ft) <span className="text-red-500">*</span></h3>
        <div className="relative">
          <input
            type="number"
            value={formData.propertySize?.propertySize || ''}
            onChange={handlePropertySizeChange}
            className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter office size in square feet"
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

      {/* Workstations */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaDesktop className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Number of Workstations/Desks <span className="text-red-500">*</span></h3>
        </div>
        <input
          type="number"
          value={formData.propertySize?.workstations || ''}
          onChange={(e) => setFormData({
            ...formData,
            propertySize: {
              ...formData.propertySize,
              workstations: parseInt(e.target.value) || 0
            }
          })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
            errors.workstations ? 'border-red-500' : 'border-gray-200'
          }`}
          placeholder="Enter number of workstations"
          min="0"
        />
        {errors.workstations && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <FaExclamationCircle />
            <span>{errors.workstations}</span>
          </div>
        )}
      </div>

      {/* Restrooms */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaRestroom className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Number of Restrooms <span className="text-red-500">*</span></h3>
        </div>
        <input
          type="number"
          value={formData.propertySize?.restrooms || ''}
          onChange={(e) => setFormData({
            ...formData,
            propertySize: {
              ...formData.propertySize,
              restrooms: parseInt(e.target.value) || 0
            }
          })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
            errors.restrooms ? 'border-red-500' : 'border-gray-200'
          }`}
          placeholder="Enter number of restrooms"
          min="0"
        />
        {errors.restrooms && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <FaExclamationCircle />
            <span>{errors.restrooms}</span>
          </div>
        )}
      </div>

      {/* Common Areas */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaCoffee className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Common Areas</h3>
        </div>
        <div className="space-y-3">
          {commonAreas.map((area) => (
            <label key={area.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.propertySize?.commonAreas?.includes(area.name) || false}
                onChange={() => handleCommonAreaChange(area.name)}
                className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
              />
              <span className="text-gray-700">{area.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Frequency Needed <span className="text-red-500">*</span></h3>
        <div className="grid grid-cols-3 gap-3">
          {frequencies.map((frequency) => (
            <motion.button
              key={frequency.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFrequencyChange(frequency.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.propertySize?.frequency === frequency.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {frequency.name}
            </motion.button>
          ))}
        </div>
        {errors.frequency && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <FaExclamationCircle />
            <span>{errors.frequency}</span>
          </div>
        )}
      </div>

      {/* Special Requirements */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Special Requirements</h3>
        </div>
        <textarea
          value={formData.propertySize?.specialRequirements || ''}
          onChange={(e) => setFormData({
            ...formData,
            propertySize: {
              ...formData.propertySize,
              specialRequirements: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Any special requirements or sensitive equipment to be aware of?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default OfficeCleaning; 