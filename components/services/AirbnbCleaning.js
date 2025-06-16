import { motion } from "framer-motion";
import { FaHome, FaKey, FaBed, FaBath, FaTshirt, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

const AirbnbCleaning = ({ formData, setFormData, errors }) => {
  const propertySizes = [
    { id: 'small', name: 'Small (1-2 bedrooms)' },
    { id: 'medium', name: 'Medium (3-4 bedrooms)' },
    { id: 'large', name: 'Large (5+ bedrooms)' }
  ];

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
        <h3 className="font-semibold mb-4 text-gray-800">Property Size (sq ft) <span className="text-red-500">*</span></h3>
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

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bedrooms */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaBed className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Number of Bedrooms <span className="text-red-500">*</span></h3>
          </div>
          <input
            type="number"
            value={formData.bedrooms || ''}
            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter number of bedrooms"
            min="0"
          />
        </div>

        {/* Bathrooms */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaBath className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Number of Bathrooms <span className="text-red-500">*</span></h3>
          </div>
          <input
            type="number"
            value={formData.bathrooms || ''}
            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter number of bathrooms"
            min="0"
          />
        </div>
      </div>

      {/* Check-in/Check-out Times */}
      <div className="grid grid-cols-2 gap-4">
        {/* Check-in Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaKey className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Check-in Time <span className="text-red-500">*</span></h3>
          </div>
          <input
            type="time"
            value={formData.propertySize?.checkInTime || ''}
            onChange={(e) => setFormData({
              ...formData,
              propertySize: {
                ...formData.propertySize,
                checkInTime: e.target.value
              }
            })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>

        {/* Check-out Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaKey className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Check-out Time <span className="text-red-500">*</span></h3>
          </div>
          <input
            type="time"
            value={formData.propertySize?.checkOutTime || ''}
            onChange={(e) => setFormData({
              ...formData,
              propertySize: {
                ...formData.propertySize,
                checkOutTime: e.target.value
              }
            })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors.propertySize ? 'border-red-500' : 'border-gray-200'
            }`}
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
              checked={formData.propertySize?.needsLinenChange || false}
              onChange={(e) => setFormData({
                ...formData,
                propertySize: {
                  ...formData.propertySize,
                  needsLinenChange: e.target.checked
                }
              })}
              className="w-5 h-5 text-SecondaryColor-0 rounded border-gray-300 focus:ring-SecondaryColor-0"
            />
            <span className="text-gray-700">Bed Linen & Towel Change Required</span>
          </label>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-6">
        {/* Key Exchange Instructions */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaKey className="w-5 h-5 text-SecondaryColor-0" />
            <h3 className="font-semibold text-gray-800">Key Exchange Instructions</h3>
          </div>
          <textarea
            value={formData.propertySize?.keyExchangeInstructions || ''}
            onChange={(e) => setFormData({
              ...formData,
              propertySize: {
                ...formData.propertySize,
                keyExchangeInstructions: e.target.value
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
            placeholder="Enter key exchange instructions"
            rows="3"
          />
        </div>
      </div>
    </div>
  );
};

export default AirbnbCleaning; 