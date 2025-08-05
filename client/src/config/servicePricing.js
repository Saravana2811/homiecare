// Service pricing configuration
export const servicePricing = {
  // Plumbing Services
  plumbing: {
    "Emergency Plumbing Repair": "₹1,500 - ₹4,000",
    "Drain Cleaning & Unclogging": "₹1,200 - ₹3,000",
    "Water Heater Installation": "₹8,000 - ₹25,000",
    "Pipe Repair & Replacement": "₹2,000 - ₹12,000",
    "Toilet Repair & Installation": "₹1,800 - ₹6,000",
    "Faucet & Fixture Services": "₹1,000 - ₹4,500"
  },
  
  // Electrical Services
  electrical: {
    "Electrical Wiring": "₹2,500 - ₹8,000",
    "Panel Upgrades": "₹5,000 - ₹15,000",
    "Lighting Installation": "₹1,500 - ₹5,000",
    "Ceiling Fan Installation": "₹800 - ₹2,500",
    "Electrical Repairs": "₹1,000 - ₹4,000",
    "Safety Inspections": "₹500 - ₹2,000"
  },
  
  // Cleaning Services
  cleaning: {
    "Deep Home Cleaning": "₹3,000 - ₹8,000",
    "Office Cleaning": "₹5,000 - ₹15,000",
    "Carpet Cleaning": "₹1,500 - ₹4,000",
    "Kitchen Deep Clean": "₹2,000 - ₹5,000",
    "Bathroom Deep Clean": "₹1,500 - ₹4,000",
    "Window Cleaning": "₹800 - ₹2,500"
  },
  
  // AC Services
  ac: {
    "AC Installation": "₹8,000 - ₹25,000",
    "AC Repair": "₹1,500 - ₹6,000",
    "AC Maintenance": "₹1,200 - ₹3,000",
    "AC Gas Refilling": "₹800 - ₹2,500",
    "AC Cleaning": "₹1,000 - ₹3,000",
    "AC Replacement": "₹15,000 - ₹50,000"
  },
  
  // Bathroom Services
  bathroom: {
    "Bathroom Renovation": "₹25,000 - ₹1,00,000",
    "Shower Installation": "₹8,000 - ₹25,000",
    "Toilet Installation": "₹3,000 - ₹8,000",
    "Bathroom Repairs": "₹2,000 - ₹10,000",
    "Tiling Services": "₹5,000 - ₹20,000",
    "Bathroom Accessories": "₹1,500 - ₹8,000"
  },
  
  // Smart Home Services
  smartHome: {
    "Smart Home Setup": "₹15,000 - ₹50,000",
    "Security System": "₹8,000 - ₹25,000",
    "Smart Lighting": "₹5,000 - ₹15,000",
    "Home Automation": "₹20,000 - ₹75,000",
    "Smart Thermostat": "₹3,000 - ₹8,000",
    "Voice Control Setup": "₹2,000 - ₹6,000"
  }
};

// Helper function to get price for a service
export const getServicePrice = (serviceName) => {
  for (const category in servicePricing) {
    if (servicePricing[category][serviceName]) {
      return servicePricing[category][serviceName];
    }
  }
  return "₹2,000 - ₹5,000"; // Default price
};

// Helper function to get average price (for display purposes)
export const getAveragePrice = (priceRange) => {
  if (!priceRange) return "₹3,000";
  
  // Extract numbers from price range like "₹1,500 - ₹4,000"
  const numbers = priceRange.match(/₹([0-9,]+)/g);
  if (numbers && numbers.length >= 2) {
    const min = parseInt(numbers[0].replace(/[₹,]/g, ''));
    const max = parseInt(numbers[1].replace(/[₹,]/g, ''));
    const average = Math.round((min + max) / 2);
    return `₹${average.toLocaleString()}`;
  }
  
  return priceRange;
}; 