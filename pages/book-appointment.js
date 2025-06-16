import { useState, useEffect } from 'react';
import { FaArrowRightLong, FaArrowLeftLong, FaPlus, FaCheck, FaClipboardList } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { 
  FaMapMarkerAlt, 
  FaBroom, 
  FaHome, 
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaUser
} from "react-icons/fa";
import Breadcamp from "../components/Breadcamp";
import HouseCleaning from '../components/services/HouseCleaning';
import DeepCleaning from '../components/services/DeepCleaning';
import OfficeCleaning from '../components/services/OfficeCleaning';
import RetailCleaning from '../components/services/RetailCleaning';
import EventCleaning from '../components/services/EventCleaning';
import AirbnbCleaning from '../components/services/AirbnbCleaning';
import { useService } from '../context/ServiceContext';
import { STEPS, INITIAL_FORM_DATA, serviceIdMap, SERVICE_ADDONS, FIXED_SERVICE_FEE } from '../utils/constants/cleaningServices';
import { validateStep } from '../utils/validations/bookingValidation';
import { checkPostcode, getServices, createBooking } from '@/utils/api/common';
import { getPropertyDetails } from '../utils/constants/propertyDetails';

const BookCleaning = ({ services }) => {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const { selectedService } = useService();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update formData when session changes
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        postcode: session.user.postcode || prev.postcode,
        fullName: session.user.name || prev.fullName,
        email: session.user.email || prev.email,
        phone: session.user.phoneno || prev.phone,
        address: [
          session.user.house_flat_no,
          session.user.street,
          session.user.town,
          session.user.county,
          session.user.postcode
        ].filter(Boolean).join(', ') || prev.address
      }));
    }
  }, [session]);

  // Update service when selectedService changes
  useEffect(() => {
    if (selectedService) {
      const apiService = services.find(s => 
        serviceIdMap[s.id.toString()] === selectedService || 
        serviceIdMap[s.name] === selectedService
      );
      
      if (apiService) {
        setFormData(prev => ({
          ...prev,
          service: selectedService
        }));
      }
    }
  }, [selectedService, services]);

  // Handle service selection
  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      service: serviceId,
      // Reset property size and addons when changing service
      propertySize: INITIAL_FORM_DATA.propertySize,
      addons: []
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const newErrors = validateStep(5, formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Get property details based on service type
      const propertyDetails = getPropertyDetails(formData.service, formData);

      // Calculate total price using the same calculation as order summary
      const service = services.find(s => 
        serviceIdMap[s.id.toString()] === formData.service || 
        serviceIdMap[s.name] === formData.service
      );

      const totalPrice = (
        (parseFloat(service?.base_price || 0) * 2) +
        formData.addons.reduce((total, addonId) => {
          const addon = SERVICE_ADDONS[formData.service]?.find(a => a.id === addonId);
          return total + (addon ? addon.price : 0);
        }, 0) +
        FIXED_SERVICE_FEE
      ).toFixed(2);

      // Prepare the API request payload
      const bookingPayload = {
        service_id: services.find(s => serviceIdMap[s.id.toString()] === formData.service || serviceIdMap[s.name] === formData.service)?.id,
        customer_id: session?.user?.id,
        postcode: formData.postcode,
        booking_date: formData.date,
        booking_time: formData.time,
        property_details: propertyDetails,
        total_price: totalPrice,
        notes: formData.notes || '',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      };
    
      const response = await createBooking(bookingPayload);
      
      if (response.status === true) {
        setSuccessMessage(response.message);
        setBookingSuccess(true);
      } else {
        setErrors({
          submit: response.message || 'Failed to create booking. Please try again.'
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({
        submit: error.message || 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    setStep(step - 1);
  };

  // Handle next button
  const handleNext = () => {
    const newErrors = validateStep(step, formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const handlePostcodeSubmit = async (e) => {
    e.preventDefault();
    
    // Check validation first
    const newErrors = validateStep(1, formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed with API call
    setIsCheckingPostcode(true);
    try {
      const response = await checkPostcode(formData.postcode);
      console.log('Postcode check response:', response);
      
      if (response.status === true) {
        if (response.exists === false) {
          setErrors({
            postcode: "Sorry, we don't provide services in this area"
          });
        } else {
          setErrors({});
          handleNext();
        }
      } else {
        setErrors({
          postcode: 'Please enter a valid UK postcode'
        });
      }
    } catch (error) {
      console.error('Error checking postcode:', error);
      setErrors({
        postcode: 'Error checking postcode. Please try again.'
      });
    } finally {
      setIsCheckingPostcode(false);
    }
  };


  const stepVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      y: 20
    },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${((step - 1) / 4) * 100}%`,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcamp
        breadCampTitle="Book Cleaning"
        breadCampLink="Home"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="Book Cleaning"
        url="/"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stepper Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-[1.7rem] left-[2.5rem] right-[2.5rem] h-2 bg-gray-100 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-SecondaryColor-0"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            
            {/* Steps */}
            <div className="flex justify-between items-center relative z-10">
              {STEPS.map((stepItem, index) => (
                <motion.div
                  key={stepItem.number}
                  className="relative"
                  custom={index}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className={`flex flex-col items-center`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step >= stepItem.number
                          ? 'bg-SecondaryColor-0 text-white shadow-lg shadow-SecondaryColor-0/20'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stepItem.icon className="w-6 h-6" />
                      </motion.div>
                    </motion.div>
                    <motion.span
                      className={`mt-2 text-sm font-medium ${
                        step >= stepItem.number ? 'text-SecondaryColor-0' : 'text-gray-400'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {stepItem.title}
                    </motion.span>
                    
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {step === 1 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaMapMarkerAlt className="w-6 h-6 text-SecondaryColor-0" />
                  <h2 className="text-2xl font-bold text-gray-800">Enter Your Postcode</h2>
                </div>
                <form onSubmit={handlePostcodeSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => {
                          setFormData({ ...formData, postcode: e.target.value });
                          if (errors.postcode) {
                            setErrors({ ...errors, postcode: null });
                          }
                        }}
                        className={`w-full p-4 pl-12 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent transition-all ${
                          errors.postcode ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="Enter your postcode"
                        disabled={isCheckingPostcode}
                      />
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.postcode && (
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-2 text-red-500">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          <span>{errors.postcode}</span>
                        </div>
                        {errors.postcode === "Sorry, we don't provide services in this area" && (
                          <div className="flex items-center gap-2 text-gray-500 text-sm ml-6">
                            <span>Please contact us for more details</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isCheckingPostcode}
                      className="relative bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg overflow-hidden group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isCheckingPostcode ? 'Checking...' : 'Check Availability'}
                        {!isCheckingPostcode && <FaArrowRightLong />}
                      </span>
                      <div className="absolute inset-0 bg-PrimaryColor-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </motion.button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaBroom className="w-6 h-6 text-SecondaryColor-0" />
                  <h2 className="text-2xl font-bold text-gray-800">Select Service Type</h2>
                </div>
                {errors.service && (
                  <div className="flex items-center gap-2 mb-4 text-red-500 text-sm">
                    <FaExclamationCircle />
                    <span>{errors.service}</span>
                  </div>
                )}
                <div className="grid gap-4">
                  {services.map((service) => {
                    const mappedServiceId = serviceIdMap[service.id.toString()] || serviceIdMap[service.name];
                    return (
                      <motion.button
                        key={service.uuid}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleServiceSelect(mappedServiceId)}
                        className={`p-6 border rounded-lg hover:border-SecondaryColor-0 hover:bg-SecondaryColor-0/5 transition-all text-left group relative overflow-hidden ${
                          formData.service === mappedServiceId ? 'border-SecondaryColor-0 bg-SecondaryColor-0/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-SecondaryColor-0/10 rounded-lg flex items-center justify-center group-hover:bg-SecondaryColor-0/20 transition-colors">
                            <FaHome className="w-6 h-6 text-SecondaryColor-0" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
                            <p className="text-gray-600 mt-1">{service.description}</p>
                            <p className="text-SecondaryColor-0 font-medium mt-2">£{service.base_price}/hour</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaArrowLeftLong />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="relative bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg overflow-hidden group transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Continue
                      <FaArrowRightLong />
                    </span>
                    <div className="absolute inset-0 bg-PrimaryColor-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </motion.button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaUser className="w-6 h-6 text-SecondaryColor-0" />
                  <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
                </div>
                <div className="grid gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block mb-2 font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) {
                          setErrors({ ...errors, fullName: null });
                        }
                      }}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block mb-2 font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) {
                          setErrors({ ...errors, email: null });
                        }
                      }}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) {
                          setErrors({ ...errors, phone: null });
                        }
                      }}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your phone number (e.g., +44 20 7123 4567)"
                    />
                    <p className="mt-1 text-sm text-gray-500">Enter your number with +44 prefix or starting with 0</p>
                    {errors.phone && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block mb-2 font-medium text-gray-700">Service Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) {
                          setErrors({ ...errors, address: null });
                        }
                      }}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your full address"
                      rows="3"
                    />
                    {errors.address && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaArrowLeftLong />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg overflow-hidden group transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Continue
                      <FaArrowRightLong />
                    </span>
                    <div className="absolute inset-0 bg-PrimaryColor-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </motion.button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaHome className="w-6 h-6 text-SecondaryColor-0" />
                  <h2 className="text-2xl font-bold text-gray-800">Service Details</h2>
                </div>
                {errors.propertySize && (
                  <div className="flex items-center gap-2 mb-4 text-red-500 text-sm">
                    <FaExclamationCircle />
                    <span>{errors.propertySize}</span>
                  </div>
                )}
                
                {/* Service-specific form */}
                {formData.service === 'regular' && (
                  <HouseCleaning formData={formData} setFormData={setFormData} errors={errors} />
                )}
                {formData.service === 'deep' && (
                  <DeepCleaning formData={formData} setFormData={setFormData} errors={errors} />
                )}
                {formData.service === 'office' && (
                  <OfficeCleaning formData={formData} setFormData={setFormData} errors={errors} />
                )}
                {formData.service === 'retail' && (
                  <RetailCleaning formData={formData} setFormData={setFormData} errors={errors} />
                )}
                {formData.service === 'event' && (
                  <EventCleaning formData={formData} setFormData={setFormData} errors={errors} />
                )}
                {formData.service === 'airbnb' && (
                  <AirbnbCleaning formData={formData} setFormData={setFormData} errors={errors} />
                )}

                {/* Add-ons Section */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FaPlus className="w-5 h-5 text-SecondaryColor-0" />
                    <h3 className="font-semibold text-gray-800">Additional Services</h3>
                  </div>
                  <div className="grid gap-3">
                    {SERVICE_ADDONS[formData.service]?.map((addon) => (
                      <motion.div
                        key={addon.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.addons.includes(addon.id)
                            ? 'border-SecondaryColor-0 bg-SecondaryColor-0/5'
                            : 'border-gray-200 hover:border-SecondaryColor-0'
                        }`}
                        onClick={() => {
                          const newAddons = formData.addons.includes(addon.id)
                            ? formData.addons.filter(id => id !== addon.id)
                            : [...formData.addons, addon.id];
                          setFormData({ ...formData, addons: newAddons });
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{addon.name}</h4>
                            <p className="text-sm text-gray-600">{addon.description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-SecondaryColor-0 font-medium">£{addon.price.toFixed(2)}</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.addons.includes(addon.id)
                                ? 'border-SecondaryColor-0 bg-SecondaryColor-0'
                                : 'border-gray-300'
                            }`}>
                              {formData.addons.includes(addon.id) && (
                                <FaCheck className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Notes field for all services */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <FaExclamationTriangle className="w-5 h-5 text-SecondaryColor-0" />
                      <h3 className="font-semibold text-gray-800">Additional Notes</h3>
                    </div>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent border-gray-200"
                      placeholder="Please provide any additional information or special requirements..."
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaArrowLeftLong />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg hover:bg-SecondaryColor-1 transition-colors font-medium flex items-center gap-2"
                  >
                    Continue
                    <FaArrowRightLong />
                  </motion.button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="p-8">
                {bookingSuccess ? (
                  <div className="text-center py-8">
                    <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h2>
                    <p className="text-gray-600 mb-6">{successMessage}</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = '/'}
                      className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg hover:bg-SecondaryColor-1 transition-colors font-medium"
                    >
                      Return to Home
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <FaCalendarAlt className="w-6 h-6 text-SecondaryColor-0" />
                      <h2 className="text-2xl font-bold text-gray-800">Schedule Your Cleaning</h2>
                    </div>
                    <div className="grid gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                          <FaCalendarAlt className="w-4 h-4 text-SecondaryColor-0" />
                          Date
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={(e) => {
                            setFormData({ ...formData, date: e.target.value });
                            if (errors.date) {
                              setErrors({ ...errors, date: null });
                            }
                          }}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                            errors.date ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.date && (
                          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                            <FaExclamationCircle />
                            <span>{errors.date}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                          <FaClock className="w-4 h-4 text-SecondaryColor-0" />
                          Time
                        </label>
                        <select
                          value={formData.time}
                          onChange={(e) => {
                            setFormData({ ...formData, time: e.target.value });
                            if (errors.time) {
                              setErrors({ ...errors, time: null });
                            }
                          }}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                            errors.time ? 'border-red-500' : 'border-gray-200'
                          }`}
                        >
                          <option value="">Select a time</option>
                          {Array.from({ length: 11 }, (_, i) => i + 8).map((hour) => (
                            <option key={hour} value={`${hour}:00`}>
                              {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                            <FaExclamationCircle />
                            <span>{errors.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <FaCheckCircle className="w-5 h-5 text-SecondaryColor-0" />
                        Order Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="text-gray-700">
                          <p className="mb-2">Service: <span className="font-medium">{services.find(s => serviceIdMap[s.id.toString()] === formData.service || serviceIdMap[s.name] === formData.service)?.name}</span></p>
                        </div>
                        <div className="text-gray-700">
                          <p className="mb-2">Property Size: <span className="font-medium">{formData.propertySize?.propertySize} sq ft</span></p>
                        </div>
                        {formData.addons.length > 0 && (
                          <div className="text-gray-700">
                            <p className="mb-2">Add-ons:</p>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                              {formData.addons.map(addonId => {
                                const addon = SERVICE_ADDONS[formData.service]?.find(a => a.id === addonId);
                                return addon ? (
                                  <li key={addonId} className="flex justify-between">
                                    <span>{addon.name}</span>
                                    <span className="font-medium">£{addon.price.toFixed(2)}</span>
                                  </li>
                                ) : null;
                              })}
                            </ul>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200 space-y-2">
                          {/* Service Hours */}
                          <div className="text-gray-700">
                            <p className="mb-2">Service Hours:</p>
                            <div className="ml-2 space-y-1">
                              <div className="flex justify-between">
                                <span>Minimum Hours:</span>
                                <span>2 hours</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Price Breakdown */}
                          <div className="text-gray-700">
                            <p className="mb-2">Price Breakdown:</p>
                            <div className="ml-2 space-y-1">
                              <div className="flex justify-between">
                                <span>Base Rate:</span>
                                <span>£{services.find(s => serviceIdMap[s.id.toString()] === formData.service || serviceIdMap[s.name] === formData.service)?.base_price}/hour</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Hours:</span>
                                <span>2 hours</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Base Service Total:</span>
                                <span>£{(parseFloat(services.find(s => serviceIdMap[s.id.toString()] === formData.service || serviceIdMap[s.name] === formData.service)?.base_price) * 2).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {formData.addons.length > 0 && (
                            <div className="flex justify-between text-gray-700">
                              <span>Add-ons Total:</span>
                              <span>£{formData.addons.reduce((total, addonId) => {
                                const addon = SERVICE_ADDONS[formData.service]?.find(a => a.id === addonId);
                                return total + (addon ? addon.price : 0);
                              }, 0).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-gray-700">
                            <span>Service Fee:</span>
                            <span>£{FIXED_SERVICE_FEE.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-SecondaryColor-0 pt-2 border-t border-gray-200">
                            <span>Total:</span>
                            <span>£{(
                              (parseFloat(services.find(s => serviceIdMap[s.id.toString()] === formData.service || serviceIdMap[s.name] === formData.service)?.base_price) * 2) +
                              formData.addons.reduce((total, addonId) => {
                                const addon = SERVICE_ADDONS[formData.service]?.find(a => a.id === addonId);
                                return total + (addon ? addon.price : 0);
                              }, 0) +
                              FIXED_SERVICE_FEE
                            ).toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Additional Note */}
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <span className="font-medium">Note:</span> Minimum service duration is 2 hours. Additional charges may apply if the service takes longer than the estimated time. The final price will be adjusted based on the actual time taken.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                      >
                        <FaArrowLeftLong />
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg hover:bg-SecondaryColor-1 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Booking...' : 'Book Service'}
                        {!isSubmitting && <FaArrowRightLong />}
                      </motion.button>
                    </div>
                    {errors.submit && (
                      <div className="flex items-center gap-2 mt-4 text-red-500 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.submit}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const servicesData = await getServices();
    return {
      props: {
        services: servicesData.data || []
      }
    };
  } catch (error) {
    return {
      props: {
        services: []
      }
    };
  }
}

export default BookCleaning; 