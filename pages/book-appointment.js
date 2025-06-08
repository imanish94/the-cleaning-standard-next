import { useState, useEffect } from 'react';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaBroom, 
  FaHome, 
  FaCalendarAlt,
  FaCheckCircle,
  FaPlus,
  FaMinus,
  FaWindowMaximize,
  FaTshirt,
  FaFire,
  FaSnowflake,
  FaBoxOpen,
  FaClock,
  FaBuilding,
  FaStore,
  FaGlassCheers,
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

const BookCleaning = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const { selectedService } = useService();
  const [formData, setFormData] = useState({
    postcode: '',
    service: '',
    propertySize: {
      bedrooms: 0,
      bathrooms: 0,
      kitchen: 0,
      livingRoom: 0,
      otherAreas: 0
    },
    date: '',
    time: '',
    addons: [],
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Update formData when selectedService changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        service: selectedService
      }));
    }
  }, [selectedService]);

  const services = [
    { 
      id: 'regular', 
      name: 'House Cleaning', 
      price: 18,
      icon: FaHome,
      description: 'Standard residential cleaning service'
    },
    { 
      id: 'deep', 
      name: 'Deep Cleaning', 
      price: 25,
      icon: FaBroom,
      description: 'Thorough cleaning of all areas'
    },
    {
      id: 'airbnb',
      name: 'Airbnb Cleaning',
      price: 28,
      icon: FaHome,
      description: 'Professional cleaning for Airbnb properties'
    },
    { 
      id: 'office', 
      name: 'Office Cleaning', 
      price: 20,
      icon: FaBuilding,
      description: 'Professional cleaning for your workspace'
    },
    { 
      id: 'retail', 
      name: 'Retail Space Cleaning', 
      price: 22,
      icon: FaStore,
      description: 'Specialized cleaning for retail spaces'
    },
    { 
      id: 'event', 
      name: 'Event Cleaning', 
      price: 30,
      icon: FaGlassCheers,
      description: 'Pre and post-event cleaning services'
    }
  ];

  const addons = [
    { id: 'windows', name: 'Window Cleaning', price: 5 },
    { id: 'ironing', name: 'Ironing', price: 10 },
    { id: 'oven', name: 'Oven Cleaning', price: 15 },
    { id: 'fridge', name: 'Fridge Cleaning', price: 15 },
    { id: 'cupboards', name: 'Inside Cupboards', price: 10 }
  ];

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch (stepNumber) {
      case 1:
        if (!formData.postcode) {
          newErrors.postcode = 'Postcode is required';
        } else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(formData.postcode)) {
          newErrors.postcode = 'Please enter a valid UK postcode';
        }
        break;
      
      case 2:
        if (!formData.service) {
          newErrors.service = 'Please select a service';
        }
        break;

      case 3:
        if (!formData.fullName) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
        } else {
          const cleanPhone = formData.phone.replace(/[\s-]/g, '');
          if (cleanPhone.startsWith('+44')) {
            if (!/^\+44\d{9,10}$/.test(cleanPhone)) {
              newErrors.phone = 'Please enter a valid UK phone number';
            }
          } else if (cleanPhone.startsWith('0')) {
            if (!/^0\d{9,10}$/.test(cleanPhone)) {
              newErrors.phone = 'Please enter a valid UK phone number';
            }
          } else {
            newErrors.phone = 'Please enter a valid UK phone number starting with +44 or 0';
          }
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
        }
        break;
      
      case 4:
        switch (formData.service) {
          case 'regular':
            if (!formData.propertySize.bedrooms && !formData.propertySize.bathrooms) {
              newErrors.propertySize = 'Please select at least one room';
            }
            break;
          case 'deep':
            if (!formData.focusAreas || formData.focusAreas.length === 0) {
              newErrors.propertySize = 'Please select at least one area to focus on';
            }
            if (!formData.clutterLevel) {
              newErrors.propertySize = 'Please select clutter level';
            }
            break;
          case 'office':
            if (!formData.squareFootage) {
              newErrors.propertySize = 'Please enter square footage';
            }
            if (!formData.workstations) {
              newErrors.propertySize = 'Please enter number of workstations';
            }
            if (!formData.frequency) {
              newErrors.propertySize = 'Please select cleaning frequency';
            }
            break;
          case 'retail':
            if (!formData.squareFootage) {
              newErrors.propertySize = 'Please enter store size';
            }
            if (!formData.retailType) {
              newErrors.propertySize = 'Please select retail type';
            }
            if (!formData.floorType) {
              newErrors.propertySize = 'Please select floor type';
            }
            if (!formData.frequency) {
              newErrors.propertySize = 'Please select cleaning frequency';
            }
            break;
          case 'event':
            if (!formData.eventType) {
              newErrors.propertySize = 'Please select event type';
            }
            if (!formData.squareFootage) {
              newErrors.propertySize = 'Please enter venue size';
            }
            if (!formData.guestCount) {
              newErrors.propertySize = 'Please enter guest count';
            }
            if (!formData.cleaningType) {
              newErrors.propertySize = 'Please select cleaning type';
            }
            break;
          case 'airbnb':
            if (!formData.bedrooms && !formData.bathrooms) {
              newErrors.propertySize = 'Please enter number of bedrooms or bathrooms';
            }
            if (!formData.checkInTime || !formData.checkOutTime) {
              newErrors.propertySize = 'Please enter check-in and check-out times';
            }
            break;
          default:
            newErrors.propertySize = 'Please complete all required fields';
        }
        break;
      
      case 5:
        if (!formData.date) {
          newErrors.date = 'Please select a date';
        } else if (new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
          newErrors.date = 'Please select a future date';
        }
        if (!formData.time) {
          newErrors.time = 'Please select a time';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePostcodeSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(1)) {
      setStep(2);
    }
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service });
  };

  const handlePropertySizeChange = (area, value) => {
    setFormData({
      ...formData,
      propertySize: {
        ...formData.propertySize,
        [area]: value
      }
    });
  };

  const handleAddonToggle = (addon) => {
    const addons = formData.addons.includes(addon)
      ? formData.addons.filter(a => a !== addon)
      : [...formData.addons, addon];
    setFormData({ ...formData, addons });
  };

  const calculateTotal = () => {
    let total = 0;
    const service = services.find(s => s.id === formData.service);
    if (service) {
      const hours = Math.max(2, Object.values(formData.propertySize).reduce((a, b) => a + b, 0));
      total += service.price * hours;
    }
    formData.addons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const steps = [
    { number: 1, title: 'Postcode', icon: FaMapMarkerAlt },
    { number: 2, title: 'Service', icon: FaBroom },
    { number: 3, title: 'User Info', icon: FaUser },
    { number: 4, title: 'Details', icon: FaHome },
    { number: 5, title: 'Schedule', icon: FaCalendarAlt }
  ];

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

  const addonIcons = {
    windows: FaWindowMaximize,
    ironing: FaTshirt,
    oven: FaFire,
    fridge: FaSnowflake,
    cupboards: FaBoxOpen
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
              {steps.map((stepItem, index) => (
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
                    />
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    {errors.postcode && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.postcode}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="relative bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg overflow-hidden group transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Check Availability
                        <FaArrowRightLong />
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
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-6 border rounded-lg hover:border-SecondaryColor-0 hover:bg-SecondaryColor-0/5 transition-all text-left group relative overflow-hidden ${
                        formData.service === service.id ? 'border-SecondaryColor-0 bg-SecondaryColor-0/5' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-SecondaryColor-0/10 rounded-lg flex items-center justify-center group-hover:bg-SecondaryColor-0/20 transition-colors">
                          <service.icon className="w-6 h-6 text-SecondaryColor-0" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-SecondaryColor-0 transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 mt-1">{service.description}</p>
                          <p className="text-SecondaryColor-0 font-medium mt-2">£{service.price}/hour</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
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
                    className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg hover:bg-SecondaryColor-1 transition-colors font-medium flex items-center gap-2"
                  >
                    Continue
                    <FaArrowRightLong />
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
                          {hour}:00 AM
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
                    <p className="text-gray-700">
                      Service: <span className="font-medium">{services.find(s => s.id === formData.service)?.name}</span>
                    </p>
                    <p className="text-gray-700">
                      Property Size: <span className="font-medium">
                        {Object.entries(formData.propertySize)
                          .filter(([_, value]) => value > 0)
                          .map(([area, value]) => `${area}: ${value}`)
                          .join(', ')}
                      </span>
                    </p>
                    {formData.addons.length > 0 && (
                      <p className="text-gray-700">
                        Add-ons: <span className="font-medium">
                          {formData.addons.map(id => addons.find(a => a.id === id)?.name).join(', ')}
                        </span>
                      </p>
                    )}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-lg font-bold text-SecondaryColor-0">
                        Total: £{calculateTotal()}
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
                    onClick={handleNext}
                    className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg hover:bg-SecondaryColor-1 transition-colors font-medium flex items-center gap-2"
                  >
                    Proceed to Payment
                    <FaArrowRightLong />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookCleaning; 