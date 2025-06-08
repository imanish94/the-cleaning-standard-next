import { motion } from "framer-motion";
import { FaGlassCheers, FaUsers, FaTrash, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";

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
      eventType: type
    });
  };

  const handleCleaningTypeChange = (type) => {
    setFormData({
      ...formData,
      cleaningType: type
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
                formData.eventType === type.id
                  ? 'bg-SecondaryColor-0 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Venue Size */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaGlassCheers className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Venue Size (Square Footage)</h3>
        </div>
        <input
          type="number"
          value={formData.squareFootage || ''}
          onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter venue size in square feet"
        />
      </div>

      {/* Guest Count */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaUsers className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Expected Guest Count</h3>
        </div>
        <input
          type="number"
          value={formData.guestCount || ''}
          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
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
                formData.cleaningType === type.id
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
          placeholder="Any special requirements or considerations? (e.g., confetti cleanup, specific areas to focus on)"
          rows="3"
        />
      </div>
    </div>
  );
};

export default EventCleaning; 