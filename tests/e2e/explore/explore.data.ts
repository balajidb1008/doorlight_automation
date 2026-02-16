export const exploreData = {
  login: {
    email: 'balaji@db1008.in',
    password: 'Baljai@#1998',
  },
  priceRanges: {
    tc002: { min: 100000, max: 500000 },
    tc011: { min: 200000, max: 400000 },
  },
  bedsBaths: {
    tc006: { beds: 3, baths: null },
    tc007: { beds: null, baths: '2+' },
  },
  homeTypes: {
    house: {
      filterName: 'House',
      urlPattern: '/home-for-sale/',
      expectedPropertyTypes: ['Single-Family-Residence'],
    },
    condo: {
      filterName: 'Condo',
      urlPattern: '/condo-for-sale/',
      expectedPropertyTypes: ['Condo'],
    },
    townhouse: {
      filterName: 'Town House',
      urlPattern: '/townhouse-for-sale/',
      expectedPropertyTypes: ['Townhouse'],
    },
    land: {
      filterName: 'Land',
      urlPattern: '/home-for-sale/',
      expectedPropertyTypes: ['Residential-Lot'],
    },
    multiFamily: {
      filterName: 'Multi-Family',
      urlPattern: '/home-for-sale/',
      expectedPropertyTypes: ['Fourplex'],
    },
    mobile: {
      filterName: 'Mobile',
      urlPattern: '/home-for-sale/',
      expectedPropertyTypes: ['Double-Wide-Mobile-Home'],
    },
    commercial: {
      filterName: 'Commercial',
      urlPattern: '/home-for-sale/',
      expectedPropertyTypes: ['Commercial-Property'],
    },
    other: {
      filterName: 'Other',
      urlPattern: '/home-for-sale/',
      expectedPropertyTypes: ['Other'],
    },
  },
  status: {
    active: 'Active',
    sold: 'Sold',
    pending: 'Pending',
    contingent: 'Contingent',
  },
  sortOptions: {
    newest: 'Newest',
    priceLowToHigh: 'Price (low to high)',
    priceHighToLow: 'Price (high to low)',
    squareFeet: 'Square Feet',
    lotSize: 'Lot size',
  },
  viewModes: {
    list: 'List View',
    map: 'Map View',
    combined: 'Combined View',
  },
};

export const urls = {
  explore: '/explore',
  propertyDetail: '/home-for-sale/',
};

export const propertyTypeMapping = {
  'Single-Family-Residence': 'House',
  'Townhouse': 'Townhouse',
  'Condo': 'Condo',
  'Residential-Lot': 'Land',
  'Fourplex': 'Multi-Family',
  'Double-Wide-Mobile-Home': 'Mobile',
  'Commercial-Property': 'Commercial',
  'Other': 'Other',
};
