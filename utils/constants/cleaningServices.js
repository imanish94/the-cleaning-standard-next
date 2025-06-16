import { 
  FaHome, 
  FaBroom, 
  FaBuilding,
  FaStore,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt
} from "react-icons/fa";

export const INITIAL_FORM_DATA = {
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
};

export const SERVICE_ADDONS = {
  regular: [
    { id: 'window_cleaning', name: 'Window Cleaning', price: 5.00, description: 'Professional window cleaning service' },
    { id: 'ironing', name: 'Ironing', price: 15.00, description: 'Professional ironing service' },
    { id: 'oven_cleaning', name: 'Oven Cleaning', price: 25.00, description: 'Deep cleaning of oven and stovetop' },
    { id: 'fridge_cleaning', name: 'Fridge Cleaning', price: 20.00, description: 'Deep cleaning of refrigerator' },
    { id: 'cupboard_cleaning', name: 'Inside Cupboards', price: 15.00, description: 'Cleaning inside all cupboards' }
  ],
  deep: [
    { id: 'window_cleaning', name: 'Window Cleaning', price: 5.00, description: 'Professional window cleaning service' },
    { id: 'oven_cleaning', name: 'Oven Cleaning', price: 25.00, description: 'Deep cleaning of oven and stovetop' },
    { id: 'fridge_cleaning', name: 'Fridge Cleaning', price: 20.00, description: 'Deep cleaning of refrigerator' },
    { id: 'cupboard_cleaning', name: 'Inside Cupboards', price: 15.00, description: 'Cleaning inside all cupboards' },
    { id: 'carpet_cleaning', name: 'Carpet Cleaning', price: 30.00, description: 'Professional carpet cleaning' }
  ],
  airbnb: [
    { id: 'window_cleaning', name: 'Window Cleaning', price: 5.00, description: 'Professional window cleaning service' },
    { id: 'linen_change', name: 'Linen Change', price: 15.00, description: 'Fresh linen change service' },
    { id: 'oven_cleaning', name: 'Oven Cleaning', price: 25.00, description: 'Deep cleaning of oven and stovetop' },
    { id: 'fridge_cleaning', name: 'Fridge Cleaning', price: 20.00, description: 'Deep cleaning of refrigerator' }
  ],
  office: [
    { id: 'window_cleaning', name: 'Window Cleaning', price: 5.00, description: 'Professional window cleaning service' },
    { id: 'carpet_cleaning', name: 'Carpet Cleaning', price: 30.00, description: 'Professional carpet cleaning' },
    { id: 'kitchen_cleaning', name: 'Kitchen Cleaning', price: 25.00, description: 'Deep cleaning of office kitchen' },
    { id: 'bathroom_cleaning', name: 'Bathroom Cleaning', price: 20.00, description: 'Deep cleaning of office bathrooms' }
  ],
  retail: [
    { id: 'window_cleaning', name: 'Window Cleaning', price: 5.00, description: 'Professional window cleaning service' },
    { id: 'floor_cleaning', name: 'Floor Cleaning', price: 25.00, description: 'Professional floor cleaning' },
    { id: 'display_cleaning', name: 'Display Cleaning', price: 15.00, description: 'Cleaning of display areas' },
    { id: 'storage_cleaning', name: 'Storage Cleaning', price: 20.00, description: 'Cleaning of storage areas' }
  ],
  event: [
    { id: 'window_cleaning', name: 'Window Cleaning', price: 5.00, description: 'Professional window cleaning service' },
    { id: 'floor_cleaning', name: 'Floor Cleaning', price: 25.00, description: 'Professional floor cleaning' },
    { id: 'bathroom_cleaning', name: 'Bathroom Cleaning', price: 20.00, description: 'Deep cleaning of bathrooms' },
    { id: 'kitchen_cleaning', name: 'Kitchen Cleaning', price: 25.00, description: 'Deep cleaning of kitchen' }
  ]
};

export const FIXED_SERVICE_FEE = 2.00;

export const SERVICES = [
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

export const ADDONS = [
  { id: 'windows', name: 'Window Cleaning', price: 5 },
  { id: 'ironing', name: 'Ironing', price: 10 },
  { id: 'oven', name: 'Oven Cleaning', price: 15 },
  { id: 'fridge', name: 'Fridge Cleaning', price: 15 },
  { id: 'cupboards', name: 'Inside Cupboards', price: 10 }
];

export const STEPS = [
  { number: 1, title: 'Postcode', icon: FaMapMarkerAlt },
  { number: 2, title: 'Service', icon: FaBroom },
  { number: 3, title: 'User Info', icon: FaUser },
  { number: 4, title: 'Details', icon: FaHome },
  { number: 5, title: 'Schedule', icon: FaCalendarAlt }
]; 

export const serviceIdMap = {
  // API ID to internal service ID mapping
  '1': 'regular',    // House Cleaning
  '2': 'deep',       // Deep Cleaning
  '3': 'airbnb',     // Airbnb Cleaning
  '4': 'office',     // Office Cleaning
  '5': 'retail',     // Retail Space Cleaning
  '6': 'event',      // Event Cleaning
  
  // Service name to internal service ID mapping
  'House Cleaning': 'regular',
  'Deep Cleaning': 'deep',
  'Airbnb Cleaning': 'airbnb',
  'Office Cleaning': 'office',
  'Retail Space Cleaning': 'retail',
  'Event Cleaning': 'event',
  
  // URL slug to internal service ID mapping
  'house-cleaning': 'regular',
  'deep-cleaning': 'deep',
  'airbnb-cleaning': 'airbnb',
  'office-cleaning': 'office',
  'retail-space-cleaning': 'retail',
  'event-cleaning': 'event'
};