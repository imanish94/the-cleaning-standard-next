import { SERVICE_ADDONS } from './cleaningServices';

export const getPropertyDetails = (service, formData) => {
  const propertyDetailsMap = {
    regular: {
      bedrooms: formData.propertySize.bedrooms || 0,
      bathrooms: formData.propertySize.bathrooms || 0,
      kitchen_included: Boolean(formData.propertySize.kitchen),
      living_dining_areas: Boolean(formData.propertySize.livingRoom),
      additional_spaces: formData.propertySize.additionalSpaces || 0,
      pets: Boolean(formData.propertySize.pets),
      specific_requests: formData.propertySize.specificRequests || '',
      property_size: formData.propertySize?.propertySize || 0,
      addons: formData.addons.map(addonId => {
        const addon = SERVICE_ADDONS.regular.find(a => a.id === addonId);
        return addon ? addon.name : addonId;
      })
    },
    deep: {
      focus_areas: formData.propertySize.focusAreas || [],
      clutter_level: formData.propertySize.clutterLevel || 'light',
      mold_concerns: formData.propertySize.moldConcerns || '',
      post_construction: formData.propertySize.postConstruction || 'no',
      property_size: formData.propertySize?.propertySize || 0,
      addons: formData.addons.map(addonId => {
        const addon = SERVICE_ADDONS.deep.find(a => a.id === addonId);
        return addon ? addon.name : addonId;
      })
    },
    airbnb: {
      bedrooms: formData.bedrooms || 0,
      bathrooms: formData.bathrooms || 0,
      check_in_time: formData.propertySize?.checkInTime || '',
      check_out_time: formData.propertySize?.checkOutTime || '',
      linen_change: formData.propertySize?.needsLinenChange || false,
      key_exchange: formData.propertySize?.keyExchangeInstructions || '',
      property_size: formData.propertySize?.propertySize || 0,
      addons: formData.addons.map(addonId => {
        const addon = SERVICE_ADDONS.airbnb.find(a => a.id === addonId);
        return addon ? addon.name : addonId;
      })
    },
    office: {
      workstations: formData.propertySize.workstations || 0,
      restrooms: formData.propertySize.restrooms || 0,
      common_areas: formData.propertySize.commonAreas || [],
      frequency: formData.propertySize.frequency || '',
      special_requirements: formData.propertySize.specialRequirements || '',
      property_size: formData.propertySize?.propertySize || 0,
      addons: formData.addons.map(addonId => {
        const addon = SERVICE_ADDONS.office.find(a => a.id === addonId);
        return addon ? addon.name : addonId;
      })
    },
    retail: {
      retail_type: formData.propertySize.retailType || '',
      high_traffic_areas: formData.propertySize.highTrafficAreas || '',
      window_cleaning: formData.propertySize.windowCleaning || false,
      floor_type: formData.propertySize.floorType || '',
      frequency: formData.propertySize.frequency || '',
      property_size: formData.propertySize?.propertySize || 0,
      addons: formData.addons.map(addonId => {
        const addon = SERVICE_ADDONS.retail.find(a => a.id === addonId);
        return addon ? addon.name : addonId;
      })
    },
    event: {
      event_type: formData.propertySize.eventType || '',
      guest_count: formData.propertySize.guestCount || 0,
      cleaning_type: formData.propertySize.cleaningType || '',
      trash_removal: formData.propertySize.trashRemoval || false,
      special_requirements: formData.propertySize.specialRequirements || '',
      property_size: formData.propertySize?.propertySize || 0,
      addons: formData.addons.map(addonId => {
        const addon = SERVICE_ADDONS.event.find(a => a.id === addonId);
        return addon ? addon.name : addonId;
      })
    }
  };

  return propertyDetailsMap[service] || {};
}; 