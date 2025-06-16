export const validateProfile = (formData) => {
  const errors = {};

  // Name validation (required)
  if (!formData.name) {
    errors.name = 'Name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (formData.name.length > 50) {
    errors.name = 'Name cannot exceed 50 characters';
  }

  // Phone number validation (required)
  if (!formData.phoneno) {
    errors.phoneno = 'Phone number is required';
  } else {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(formData.phoneno)) {
      errors.phoneno = 'Please enter a valid phone number';
    }
  }

  // Postcode validation (optional)
  if (formData.postcode && formData.postcode.trim() !== '') {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(formData.postcode)) {
      errors.postcode = 'Please enter a valid UK postcode';
    }
  }

  // Town validation (optional)
  if (formData.town && formData.town.trim() !== '') {
    if (formData.town.length < 2) {
      errors.town = 'Town name must be at least 2 characters long';
    } else if (formData.town.length > 50) {
      errors.town = 'Town name cannot exceed 50 characters';
    }
  }

  // County validation (optional)
  if (formData.county && formData.county.trim() !== '') {
    if (formData.county.length < 2) {
      errors.county = 'County name must be at least 2 characters long';
    } else if (formData.county.length > 50) {
      errors.county = 'County name cannot exceed 50 characters';
    }
  }

  // Street validation (optional)
  if (formData.street && formData.street.trim() !== '') {
    if (formData.street.length < 2) {
      errors.street = 'Street name must be at least 2 characters long';
    } else if (formData.street.length > 100) {
      errors.street = 'Street name cannot exceed 100 characters';
    }
  }

  // House/Flat number validation (optional)
  if (formData.house_flat_no && formData.house_flat_no.trim() !== '') {
    if (formData.house_flat_no.length > 20) {
      errors.house_flat_no = 'House/Flat number cannot exceed 20 characters';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 