// Pricing configuration for the questionnaire
export interface PricingConfig {
  basePrices: { [key: string]: number };
  areaMultiplier: number;
  currency: string;
  currencyFormat: string;
}

export interface PriceBreakdown {
  materials: number;
  labor: number;
  total: number;
}

export const PRICING_CONFIG: PricingConfig = {
  basePrices: {
    totalrenovering: 2500,  // kr per m² for total renovation
    delrenovering: 1800,     // kr per m² for partial renovation
    nybygg: 3500,           // kr per m² for new construction
    påbygg: 2800,           // kr per m² for extension
    loft: 2000,             // kr per m² for attic/basement
    bad: 1500,              // kr per m² for bathroom
    garasje: 2200,          // kr per m² for garage
    annet: 2000             // kr per m² for other projects
  },
  areaMultiplier: 1,        // multiplier for area calculation
  currency: 'kr',
  currencyFormat: 'no-NO'
};

// Calculate detailed price breakdown
export const calculatePriceBreakdown = (projectType: string, area: number): PriceBreakdown => {
  const basePrice = PRICING_CONFIG.basePrices[projectType] || PRICING_CONFIG.basePrices.annet;
  const areaMultiplier = Math.max(area, 1);
  const totalPrice = basePrice * areaMultiplier * PRICING_CONFIG.areaMultiplier;
  
  // Split into materials (60%) and labor (40%)
  const materials = Math.round(totalPrice * 0.6);
  const labor = Math.round(totalPrice * 0.4);
  
  return {
    materials,
    labor,
    total: totalPrice
  };
};

// Calculate price based on project type and area
export const calculatePrice = (projectType: string, area: number): string => {
  const breakdown = calculatePriceBreakdown(projectType, area);
  return breakdown.total.toLocaleString(PRICING_CONFIG.currencyFormat);
};

// Get project type name by ID
export const getProjectTypeName = (projectTypeId: string): string => {
  const projectTypeNames: { [key: string]: string } = {
    totalrenovering: 'Totalrenovering',
    delrenovering: 'Delrenovering',
    nybygg: 'Nybygg',
    påbygg: 'Påbygg/Tilbygg',
    loft: 'Loft eller kjeller',
    bad: 'Pusse opp bad',
    garasje: 'Bygge garasje',
    annet: 'Annet'
  };
  
  return projectTypeNames[projectTypeId] || 'Annet';
}; 