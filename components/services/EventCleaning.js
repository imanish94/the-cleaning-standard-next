import { motion } from "framer-motion";
import { FaGlassCheers, FaUsers, FaTrash, FaCalendarAlt, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

const EventCleaning = ({ formData, setFormData, errors }) => {
  const eventTypes = [
    { id: 'wedding', name: 'Wedding' },
    { id: 'party', name: 'Party' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'conference', name: 'Conference' },
    { id: 'other', name: 'Other' }
  ];

  const cleaningTypes = [
    { id: 'pre', name: 'Pre-Event' },
    { id: 'post', name: 'Post-Event' },
    { id: 'both', name: 'Both' }
  ];

  const handleEventTypeChange = (type) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        eventType: type
      }
    });
  };

  const handleCleaningTypeChange = (type) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        cleaningType: type
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
      {/* Event Type */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaGlassCheers className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Type of Event</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {eventTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleEventTypeChange(type.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.propertySize?.eventType === type.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Property Size */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Venue Size (sq ft)</h3>
        <div className="relative">
          <input
            type="number"
            value={formData.propertySize?.propertySize || ''}
            onChange={handlePropertySizeChange}
            className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter venue size in square feet"
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

      {/* Guest Count */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaUsers className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Expected Guest Count</h3>
        </div>
        <input
          type="number"
          value={formData.propertySize?.guestCount || ''}
          onChange={(e) => setFormData({
            ...formData,
            propertySize: {
              ...formData.propertySize,
              guestCount: parseInt(e.target.value) || 0
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter expected number of guests"
        />
      </div>

      {/* Cleaning Type */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaCalendarAlt className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Cleaning Type</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {cleaningTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCleaningTypeChange(type.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                formData.propertySize?.cleaningType === type.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.name}
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
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFormData({
              ...formData,
              propertySize: {
                ...formData.propertySize,
                trashRemoval: true
              }
            })}
            className={`p-4 rounded-lg text-center transition-colors ${
              formData.propertySize?.trashRemoval === true
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
                trashRemoval: false
              }
            })}
            className={`p-4 rounded-lg text-center transition-colors ${
              formData.propertySize?.trashRemoval === false
                ? 'bg-SecondaryColor-0 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            No
          </motion.button>
        </div>
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
          placeholder="Any special requirements or considerations? (e.g., confetti cleanup, specific areas to focus on)"
          rows="3"
        />
      </div>
    </div>
  );
};

export default EventCleaning; 