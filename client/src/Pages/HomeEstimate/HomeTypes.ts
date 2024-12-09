type Comparable = {
  id: string;
  formattedAddress: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  price: number;
  listingType: string;
  listedDate: string; // ISO string
  removedDate: string | null;
  lastSeenDate: string; // ISO string
  daysOnMarket: number;
  distance: number;
  daysOld: number;
  correlation: number;
  
};

export type ApiResponse = {
  price: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  latitude: number;
  longitude: number;
  comparables: Comparable[];
};

