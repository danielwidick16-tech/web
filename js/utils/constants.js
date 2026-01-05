/**
 * Constants - Volcanic Heating and Air
 * Configuration values and service area data
 */

// Service area ZIP codes for Central Oregon
export const SERVICE_AREAS = {
  bend: {
    name: 'Bend',
    zips: ['97701', '97702', '97703', '97707', '97708', '97709']
  },
  redmond: {
    name: 'Redmond',
    zips: ['97756']
  },
  sisters: {
    name: 'Sisters',
    zips: ['97759']
  },
  sunriver: {
    name: 'Sunriver',
    zips: ['97707']
  },
  lapine: {
    name: 'La Pine',
    zips: ['97739']
  },
  prineville: {
    name: 'Prineville',
    zips: ['97754']
  },
  madras: {
    name: 'Madras',
    zips: ['97741']
  }
};

// All valid ZIP codes (flattened)
export const ALL_VALID_ZIPS = [
  '97701', '97702', '97703', '97707', '97708', '97709', // Bend
  '97756', // Redmond
  '97759', // Sisters
  '97739', // La Pine
  '97754', // Prineville
  '97741'  // Madras
];

// Get area name by ZIP code
export function getAreaByZip(zip) {
  for (const [key, area] of Object.entries(SERVICE_AREAS)) {
    if (area.zips.includes(zip)) {
      return area.name;
    }
  }
  return null;
}

// Breakpoints (matching CSS variables)
export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Business info
export const BUSINESS = {
  name: 'Volcanic Heating and Air',
  phone: '(541) 555-1234',
  phoneRaw: '+15415551234',
  email: 'info@volcanichvac.com',
  address: {
    street: '123 Main Street',
    city: 'Bend',
    state: 'OR',
    zip: '97701'
  },
  hours: {
    weekday: '7:00 AM - 6:00 PM',
    saturday: '8:00 AM - 4:00 PM',
    sunday: 'Closed'
  },
  ccb: '123456'
};
