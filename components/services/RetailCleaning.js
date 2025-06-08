import { motion } from "framer-motion";
import { FaStore, FaWindowMaximize, FaUsers, FaTrash, FaExclamationTriangle } from "react-icons/fa";

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
      retailType: type
    });
  };

  const handleFloorTypeChange = (type) => {
    setFormData({
      ...formData,
      floorType: type
    });
  };

  const handleFrequencyChange = (frequency) => {
    setFormData({
      ...formData,
      frequency: frequency
    });
  };

  return (
    <div className="space-y-6">
      {/* Store Size */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaStore className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Store Size (Square Footage)</h3>
        </div>
        <input
          type="number"
          value={formData.squareFootage || ''}
          onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter store size in square feet"
        />
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
                formData.retailType === type.id
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
          value={formData.highTrafficAreas || ''}
          onChange={(e) => setFormData({ ...formData, highTrafficAreas: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Describe high traffic areas that need special attention"
          rows="3"
        />
      </div>

      {/* Glass/Window Cleaning */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaWindowMaximize className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Glass/Window Cleaning</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsWindowCleaning || false}
              onChange={(e) => setFormData({ ...formData, needsWindowCleaning: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Storefront Windows</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsDisplayCaseCleaning || false}
              onChange={(e) => setFormData({ ...formData, needsDisplayCaseCleaning: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Display Cases</span>
          </label>
        </div>
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
                formData.floorType === type.id
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
        <h3 className="font-semibold mb-4 text-gray-800">Frequency</h3>
        <div className="grid grid-cols-3 gap-3">
          {frequencies.map((frequency) => (
            <motion.button
              key={frequency.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFrequencyChange(frequency.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.frequency === frequency.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {frequency.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Trash Removal */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaTrash className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Trash Removal</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsTrashRemoval || false}
              onChange={(e) => setFormData({ ...formData, needsTrashRemoval: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Regular Trash Removal Required</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsRecyclingRemoval || false}
              onChange={(e) => setFormData({ ...formData, needsRecyclingRemoval: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Recycling Removal Required</span>
          </label>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Special Requirements</h3>
        </div>
        <textarea
          value={formData.specialRequirements || ''}
          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Any special requirements or considerations?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default RetailCleaning; 