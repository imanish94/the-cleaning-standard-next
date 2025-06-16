import { motion } from "framer-motion";
import { FaStore, FaUsers, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

const RetailCleaning = ({ formData, setFormData, errors }) => {
  const retailTypes = [
    { id: 'clothing', name: 'Clothing' },
    { id: 'grocery', name: 'Grocery' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'other', name: 'Other' }
  ];

  const floorTypes = [
    { id: 'tile', name: 'Tile' },
    { id: 'carpet', name: 'Carpet' },
    { id: 'hardwood', name: 'Hardwood' },
    { id: 'concrete', name: 'Concrete' },
    { id: 'other', name: 'Other' }
  ];

  const frequencies = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'one-time', name: 'One-time' }
  ];

  const handleRetailTypeChange = (type) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        retailType: type
      }
    });
  };

  const handleFloorTypeChange = (type) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        floorType: type
      }
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Property Size */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Store Size (sq ft) <span className="text-red-500">*</span></h3>
        <div className="relative">
          <input
            type="number"
            value={formData.propertySize?.propertySize || ''}
            onChange={handlePropertySizeChange}
            className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter store size in square feet"
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

      {/* Retail Type */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Type of Retail</h3>
        <div className="grid grid-cols-2 gap-3">
          {retailTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRetailTypeChange(type.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.propertySize?.retailType === type.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* High Traffic Areas */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaUsers className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">High Traffic Areas</h3>
        </div>
        <textarea
          value={formData.propertySize?.highTrafficAreas || ''}
          onChange={(e) => setFormData({
            ...formData,
            propertySize: {
              ...formData.propertySize,
              highTrafficAreas: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Describe high traffic areas that need special attention"
          rows="3"
        />
      </div>

      {/* Floor Type */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Floor Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {floorTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFloorTypeChange(type.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.propertySize?.floorType === type.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Frequency <span className="text-red-500">*</span></h3>
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
          placeholder="Any special requirements or considerations?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default RetailCleaning; 