import { motion } from "framer-motion";
import { FaBuilding, FaDesktop, FaRestroom, FaCoffee, FaExclamationTriangle } from "react-icons/fa";

const OfficeCleaning = ({ formData, setFormData, errors }) => {
  const frequencies = [
    { id: 'one-time', name: 'One-time' },
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' }
  ];

  const handleFrequencyChange = (frequency) => {
    setFormData({
      ...formData,
      frequency: frequency
    });
  };

  return (
    <div className="space-y-6">
      {/* Square Footage */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaBuilding className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Total Square Footage</h3>
        </div>
        <input
          type="number"
          value={formData.squareFootage || ''}
          onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter approximate square footage"
        />
      </div>

      {/* Workstations */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaDesktop className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Number of Workstations/Desks</h3>
        </div>
        <input
          type="number"
          value={formData.workstations || ''}
          onChange={(e) => setFormData({ ...formData, workstations: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter number of workstations"
        />
      </div>

      {/* Restrooms */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaRestroom className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Number of Restrooms</h3>
        </div>
        <input
          type="number"
          value={formData.restrooms || ''}
          onChange={(e) => setFormData({ ...formData, restrooms: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter number of restrooms"
        />
      </div>

      {/* Common Areas */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaCoffee className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Common Areas</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.hasKitchen || false}
              onChange={(e) => setFormData({ ...formData, hasKitchen: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Kitchen/Break Room</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.hasMeetingRooms || false}
              onChange={(e) => setFormData({ ...formData, hasMeetingRooms: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Meeting Rooms</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.hasReception || false}
              onChange={(e) => setFormData({ ...formData, hasReception: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Reception Area</span>
          </label>
        </div>
      </div>

      {/* Frequency */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-800">Frequency Needed</h3>
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
          placeholder="Any special requirements or sensitive equipment to be aware of?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default OfficeCleaning; 