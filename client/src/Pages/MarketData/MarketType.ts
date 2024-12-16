// Sales Data

type SalesData = {
  lastUpdatedDate: string;
  averagePrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  averagePricePerSquareFoot: number;
  medianPricePerSquareFoot: number;
  minPricePerSquareFoot: number;
  maxPricePerSquareFoot: number;
  averageSquareFootage: number;
  medianSquareFootage: number;
  minSquareFootage: number;
  maxSquareFootage: number;
  averageDaysOnMarket: number;
  medianDaysOnMarket: number;
  minDaysOnMarket: number;
  maxDaysOnMarket: number;
  newListings: number;
  totalListings: number;
  dataByPropertyType: DataByPropertyType[];
  history: SalesHistoryData;
};

type DataByPropertyType = {
  propertyType: string;
  averagePrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  averagePricePerSquareFoot: number;
  medianPricePerSquareFoot: number;
  minPricePerSquareFoot: number;
  maxPricePerSquareFoot: number;
  averageSquareFootage: number;
  medianSquareFootage: number;
  minSquareFootage: number;
  maxSquareFootage: number;
  averageDaysOnMarket: number;
  medianDaysOnMarket: number;
  minDaysOnMarket: number;
  maxDaysOnMarket: number;
  newListings: number;
  totalListings: number;
};

// Rental Data

type RentalData = {
  lastUpdatedDate: string;
  averageRent: number;
  medianRent: number;
  minRent: number;
  maxRent: number;
  averageRentPerSquareFoot: number;
  medianRentPerSquareFoot: number;
  minRentPerSquareFoot: number;
  maxRentPerSquareFoot: number;
  averageSquareFootage: number;
  medianSquareFootage: number;
  minSquareFootage: number;
  maxSquareFootage: number;
  averageDaysOnMarket: number;
  medianDaysOnMarket: number;
  minDaysOnMarket: number;
  maxDaysOnMarket: number;
  newListings: number;
  totalListings: number;
  dataByPropertyType: RentalDataByPropertyType[];
  history: RentalHistoryData;
};

type RentalDataByPropertyType = {
  propertyType: string;
  averageRent: number;
  medianRent: number;
  minRent: number;
  maxRent: number;
  averageRentPerSquareFoot: number;
  medianRentPerSquareFoot: number;
  minRentPerSquareFoot: number;
  maxRentPerSquareFoot: number;
  averageSquareFootage: number;
  medianSquareFootage: number;
  minSquareFootage: number;
  maxSquareFootage: number;
  averageDaysOnMarket: number;
  medianDaysOnMarket: number;
  minDaysOnMarket: number;
  maxDaysOnMarket: number;
  newListings: number;
  totalListings: number;
};

type SalesHistoryData = {
  [month: string]: {
    date: string;
    averagePrice: number;
    medianPrice: number;
    minPrice: number;
    maxPrice: number;
    averagePricePerSquareFoot: number;
    medianPricePerSquareFoot: number;
    minPricePerSquareFoot: number;
    maxPricePerSquareFoot: number;
    averageSquareFootage: number;
    medianSquareFootage: number;
    minSquareFootage: number;
    maxSquareFootage: number;
    averageDaysOnMarket: number;
    medianDaysOnMarket: number;
    minDaysOnMarket: number;
    maxDaysOnMarket: number;
    newListings: number;
    totalListings: number;
    dataByPropertyType: DataByPropertyType[];
  };
};

type RentalHistoryData = {
  [month: string]: {
    date: string;
    averageRent: number;
    medianRent: number;
    minRent: number;
    maxRent: number;
    averageRentPerSquareFoot: number;
    medianRentPerSquareFoot: number;
    minRentPerSquareFoot: number;
    maxRentPerSquareFoot: number;
    averageSquareFootage: number;
    medianSquareFootage: number;
    minSquareFootage: number;
    maxSquareFootage: number;
    averageDaysOnMarket: number;
    medianDaysOnMarket: number;
    minDaysOnMarket: number;
    maxDaysOnMarket: number;
    newListings: number;
    totalListings: number;
    dataByPropertyType: RentalDataByPropertyType[];
  };
};

export type Market = {
  id: string;
  zipCode: string;
  saleData: SalesData;
};
