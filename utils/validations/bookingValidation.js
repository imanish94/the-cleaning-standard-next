import { FaMapMarkerAlt } from "react-icons/fa";

export const validateStep = (step, formData) => {
  const newErrors = {};
  
  switch (step) {
    case 1:
      if (!formData.postcode || formData.postcode.trim() === '') {
        newErrors.postcode = 'Please enter a UK postcode';
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
        newErrors.fullName = 'Please enter your full name';
      }
      if (!formData.email) {
        newErrors.email = 'Please enter your email address';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone) {
        newErrors.phone = 'Please enter your phone number';
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
        newErrors.address = 'Please enter your address';
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
          if (!formData.propertySize.focusAreas || formData.propertySize.focusAreas.length === 0) {
            newErrors.propertySize = 'Please select at least one area to focus on';
          }
          if (!formData.propertySize.clutterLevel) {
            newErrors.propertySize = 'Please select clutter level';
          }
          break;
        case 'office':
          if (!formData.propertySize?.propertySize) {
            newErrors.propertySize = 'Please enter square footage';
          }
          if (!formData.propertySize?.workstations) {
            newErrors.workstations = 'Please enter number of workstations';
          }
          if (!formData.propertySize?.frequency) {
            newErrors.frequency = 'Please select cleaning frequency';
          }
          break;
        case 'retail':
          if (!formData.propertySize?.propertySize) {
            newErrors.propertySize = 'Please enter store size';
          }
          if (!formData.propertySize?.retailType) {
            newErrors.propertySize = 'Please select retail type';
          }
          if (!formData.propertySize?.floorType) {
            newErrors.propertySize = 'Please select floor type';
          }
          if (!formData.propertySize?.frequency) {
            newErrors.frequency = 'Please select cleaning frequency';
          }
          break;
        case 'event':
          if (!formData.propertySize?.eventType) {
            newErrors.propertySize = 'Please select event type';
          }
          if (!formData.propertySize?.propertySize) {
            newErrors.propertySize = 'Please enter venue size';
          }
          if (!formData.propertySize?.guestCount) {
            newErrors.propertySize = 'Please enter guest count';
          }
          if (!formData.propertySize?.cleaningType) {
            newErrors.propertySize = 'Please select cleaning type';
          }
          break;
        case 'airbnb':
          if (!formData.propertySize?.propertySize) {
            newErrors.propertySize = 'Please enter property size';
          }
          if (!formData.bedrooms && !formData.bathrooms) {
            newErrors.propertySize = 'Please select at least one room';
          }
          if (!formData.propertySize?.checkInTime) {
            newErrors.propertySize = 'Please select check-in time';
          }
          if (!formData.propertySize?.checkOutTime) {
            newErrors.propertySize = 'Please select check-out time';
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
  
  return newErrors;
}; 