import { motion } from "framer-motion";
import { FaHome, FaKey, FaBed, FaBath, FaTshirt, FaExclamationTriangle } from "react-icons/fa";

const AirbnbCleaning = ({ formData, setFormData, errors }) => {
  return (
    <div className="space-y-6">
      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bedrooms */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaBed className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Number of Bedrooms</h3>
          </div>
          <input
            type="number"
            value={formData.bedrooms || ''}
            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
            placeholder="Enter number of bedrooms"
          />
        </div>

        {/* Bathrooms */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaBath className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Number of Bathrooms</h3>
          </div>
          <input
            type="number"
            value={formData.bathrooms || ''}
            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
            placeholder="Enter number of bathrooms"
          />
        </div>
      </div>

      {/* Check-in/Check-out Times */}
      <div className="grid grid-cols-2 gap-4">
        {/* Check-in Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaKey className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Check-in Time</h3>
          </div>
          <input
            type="time"
            value={formData.checkInTime || ''}
            onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          />
        </div>

        {/* Check-out Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaKey className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Check-out Time</h3>
          </div>
          <input
            type="time"
            value={formData.checkOutTime || ''}
            onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          />
        </div>
      </div>

      {/* Linen & Towel Change */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaTshirt className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Linen & Towel Change</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsLinenChange || false}
              onChange={(e) => setFormData({ ...formData, needsLinenChange: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Bed Linen Change Required</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsTowelChange || false}
              onChange={(e) => setFormData({ ...formData, needsTowelChange: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Towel Change Required</span>
          </label>
        </div>
      </div>

      {/* Key Exchange Instructions */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaKey className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Key Exchange Instructions</h3>
        </div>
        <textarea
          value={formData.keyExchangeInstructions || ''}
          onChange={(e) => setFormData({ ...formData, keyExchangeInstructions: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Enter key exchange instructions"
          rows="3"
        />
      </div>

      {/* Host Requirements */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="w-5 h-5 text-SecondaryColor-0" />
          <h3 className="font-semibold text-gray-800">Host Requirements</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsToiletriesRestock || false}
              onChange={(e) => setFormData({ ...formData, needsToiletriesRestock: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Restock Toiletries</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.needsWelcomePack || false}
              onChange={(e) => setFormData({ ...formData, needsWelcomePack: e.target.checked })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Prepare Welcome Pack</span>
          </label>
        </div>
        <textarea
          value={formData.additionalHostRequirements || ''}
          onChange={(e) => setFormData({ ...formData, additionalHostRequirements: e.target.value })}
          className="w-full p-3 mt-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
          placeholder="Any additional host requirements?"
          rows="3"
        />
      </div>
    </div>
  );
};

export default AirbnbCleaning; 